import { NextRequest } from 'next/server';
import prisma from './db';
import { decode } from './encrypt';

export interface AuthenticatedRequest extends NextRequest {
  agentId?: string;
}

export async function verifyAgentToken(
  request: NextRequest
): Promise<{ agentId: string; valid: boolean; error?: string }> {
  try {
    // const authHeader = request.headers.get('authorization');
    const encryptedToken = request.headers.get('x-agent-token');

    if (/*!authHeader || */!encryptedToken) {
      return {
        agentId: '',
        valid: false,
        error: 'Missing authorization headers',
      };
    }

    // Decrypt the token
    const decryptedToken = await decode(encryptedToken);

    // Verify token format (should be: agentId:token)
    const [agentId, token] = decryptedToken.split(':');

    if (!agentId || !token) {
      return {
        agentId: '',
        valid: false,
        error: 'Invalid token format',
      };
    }

    // Check if agent exists and token matches
    const tokenRecord = await prisma.token.findFirst({
      where: {
        agentId: agentId,
        token: token,
      },
    });

    if (!tokenRecord) {
      return {
        agentId: '',
        valid: false,
        error: 'Invalid or expired token',
      };
    }

    // Verify agent exists
    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
    });

    if (!agent) {
      return {
        agentId: '',
        valid: false,
        error: 'Agent not found',
      };
    }

    return {
      agentId: agentId,
      valid: true,
    };
  } catch (error) {
    return {
      agentId: '',
      valid: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    };
  }
}

export function createErrorResponse(message: string, status: number) {
  return new Response(
    JSON.stringify({
      success: false,
      error: message,
    }),
    { status, headers: { 'Content-Type': 'application/json' } }
  );
}

export function createSuccessResponse(data: unknown, status: number = 200) {
  return new Response(
    JSON.stringify({
      success: true,
      data,
    }),
    { status, headers: { 'Content-Type': 'application/json' } }
  );
}
