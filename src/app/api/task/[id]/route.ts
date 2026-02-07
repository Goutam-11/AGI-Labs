import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { verifyAgentToken, createErrorResponse, createSuccessResponse } from '@/lib/auth';

/**
 * GET /api/task/[id]
 * Get a specific task by ID
 * Public endpoint - no authentication required
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return createErrorResponse('Task not found', 404);
    }

    return createSuccessResponse(task);
  } catch (error) {
    console.error('Fetch task error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to fetch task',
      500
    );
  }
}

/**
 * PATCH /api/task/[id]
 * Update a task (mark as completed or update department)
 * Requires authentication
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify agent token
    const authResult = await verifyAgentToken(request);
    if (!authResult.valid) {
      return createErrorResponse(authResult.error || 'Unauthorized', 401);
    }

    const { id } = await params;
    const body = await request.json();
    const { status, departmentId } = body;

    // Find the task
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return createErrorResponse('Task not found', 404);
    }

    // // Verify the agent owns the task
    // if (task.agentId !== authResult.agentId) {
    //   return createErrorResponse('You do not have permission to update this task', 403);
    // }

    // Validate status if provided
    if (status && !['PENDING', 'COMPLETED'].includes(status)) {
      return createErrorResponse('Invalid task status', 400);
    }

    // Verify department exists if provided
    if (departmentId) {
      const department = await prisma.department.findUnique({
        where: { id: departmentId },
      });
      if (!department) {
        return createErrorResponse('Department not found', 404);
      }
    }

    // Update the task
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(departmentId && { departmentId }),
      },
    });

    // Log activity if task was completed
    if (status === 'COMPLETED' && task.status !== 'COMPLETED') {
      await prisma.activity.create({
        data: {
          title: `Task completed: ${task.title}`,
          description: `Task marked as completed`,
          agentId: authResult.agentId,
          type: 'TASK',
          departmentId: updatedTask.departmentId || null,
        },
      });
    }

    return createSuccessResponse({
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status,
      agentId: updatedTask.agentId,
      departmentId: updatedTask.departmentId,
      createdAt: updatedTask.createdAt,
      updatedAt: updatedTask.updatedAt,
    });
  } catch (error) {
    console.error('Update task error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to update task',
      500
    );
  }
}

/**
 * DELETE /api/task/[id]
 * Delete a task
 * Requires authentication
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify agent token
    const authResult = await verifyAgentToken(request);
    if (!authResult.valid) {
      return createErrorResponse(authResult.error || 'Unauthorized', 401);
    }

    const { id } = await params;

    // Find the task
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return createErrorResponse('Task not found', 404);
    }

    // Verify the agent owns the task
    if (task.agentId !== authResult.agentId) {
      return createErrorResponse('You do not have permission to delete this task', 403);
    }

    // Delete the task
    await prisma.task.delete({
      where: { id },
    });

    return createSuccessResponse({
      message: 'Task deleted successfully',
      id,
    });
  } catch (error) {
    console.error('Delete task error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to delete task',
      500
    );
  }
}
