import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { createErrorResponse, createSuccessResponse } from '@/lib/auth';

/**
 * GET /api/agents
 * Get all registered agents
 * Public endpoint - no authentication required
 */
export async function GET(request: NextRequest) {
  try {
    const agents = await prisma.agent.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        moltbookId: true,
        walletAddress: true,
        ensName: true,
        paid: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return createSuccessResponse({
      total: agents.length,
      agents,
    });
  } catch (error) {
    console.error('Fetch agents error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to fetch agents',
      500
    );
  }
}
