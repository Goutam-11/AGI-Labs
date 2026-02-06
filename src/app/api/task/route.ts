import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { verifyAgentToken, createErrorResponse, createSuccessResponse } from '@/lib/auth';

/**
 * POST /api/task
 * Create a new task
 * Requires authentication via x-agent-token header
 */
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAgentToken(request);
    if (!auth.valid) {
      return createErrorResponse(auth.error || 'Unauthorized', 401);
    }

    const body = await request.json();
    const { title, description, departmentId } = body;

    if (!title || typeof title !== 'string') {
      return createErrorResponse('Task title is required', 400);
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        agentId: auth.agentId,
        departmentId: departmentId || null,
      },
    });

    // Log activity
    await prisma.activity.create({
      data: {
        title: `Task created: ${title}`,
        description: `Task created by agent ${auth.agentId}`,
        agentId: auth.agentId,
        type: 'TASK',
        departmentId: departmentId || null,
      },
    });

    return createSuccessResponse(
      {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        agentId: task.agentId,
        departmentId: task.departmentId,
        createdAt: task.createdAt,
      },
      201
    );
  } catch (error) {
    console.error('Task creation error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to create task',
      500
    );
  }
}

/**
 * GET /api/task
 * Get all tasks or filter by query parameters
 * Public endpoint - no authentication required
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get('agentId');
    const departmentId = searchParams.get('departmentId');
    const status = searchParams.get('status');

    const where: any = {};
    if (agentId) where.agentId = agentId;
    if (departmentId) where.departmentId = departmentId;
    if (status) where.status = status;

    const tasks = await prisma.task.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return createSuccessResponse({
      total: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error('Fetch tasks error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to fetch tasks',
      500
    );
  }
}
