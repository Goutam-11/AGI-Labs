import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { createErrorResponse, createSuccessResponse } from '@/lib/auth';

/**
 * GET /api/department
 * Get all departments
 * Public endpoint - no authentication required
 */
export async function GET(request: NextRequest) {
  try {
    const departments = await prisma.department.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return createSuccessResponse({
      total: departments.length,
      departments,
    });
  } catch (error) {
    console.error('Fetch departments error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to fetch departments',
      500
    );
  }
}

