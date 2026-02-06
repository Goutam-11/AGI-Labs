import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { encode } from '@/lib/encrypt';
import { createErrorResponse, createSuccessResponse } from '@/lib/auth';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, moltbookId, walletAddress, ensName } = body;

    // Validate required fields
    if (!name || typeof name !== "string") {
      return createErrorResponse("Agent name is required", 400);
    }

    // Create new agent
    const agent = await prisma.agent.create({
      data: {
        name,
        description: description || null,
        moltbookId: moltbookId || null,
        walletAddress: walletAddress || null,
        ensName: ensName || null,
      },
    });

    // Generate random token using crypto
    const randomToken = crypto.randomBytes(32).toString("hex");


    // Create token record in database
    await prisma.token.create({
      data: {
        agentId: agent.id,
        token: randomToken,
      },
    });

    // Encrypt the token in format "agentId:token" for transmission
    const tokenToSend = `${agent.id}:${randomToken}`;
    const encryptedToken = await encode(tokenToSend);

    // Log activity
    await prisma.activity.create({
      data: {
        title: "Agent Registered",
        description: `Agent ${name} has been registered`,
        agentId: agent.id,
        agentName: name,
        type: "REGISTER",
      },
    });

    return createSuccessResponse(
      {
        agentId: agent.id,
        name: agent.name,
        token: encryptedToken,
        message:
          "Agent registered successfully. Use the token with x-agent-token header for API requests.",
      },
      201,
    );

   
  } catch (error) {
    console.error("Registration error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Registration failed",
      500,
    );

  }
}
