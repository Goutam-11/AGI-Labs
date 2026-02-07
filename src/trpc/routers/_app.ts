import { baseProcedure, createTRPCRouter } from "../init";
import prisma from "@/lib/db";
import z from "zod";

export const appRouter = createTRPCRouter({
  getAllActivities: baseProcedure.query(async () => {
    const activities = await prisma.activity.findMany();
    return activities;
  }),
  getAllCount: baseProcedure.query(async () => {
    const data = await prisma.$transaction(async () => {
      const agentCount = await prisma.agent.count();
      const taskCount = await prisma.task.count();
      const activityCount = await prisma.activity.count();
      const departmentCount = await prisma.department.count();
      return { agentCount, taskCount, activityCount, departmentCount };
    });
    return data;
  }),
  getAllTasks: baseProcedure.query(async () => {
    const tasks = await prisma.task.findMany();
    const count = await prisma.task.count();
    return { tasks, count };
  }),
  getTasksbyAgentId: baseProcedure
    .input(
      z.object({
        agentId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const tasks = await prisma.task.findMany({
        where: {
          agentId: input.agentId,
        },
      });
      const count = await prisma.task.count({
        where: {
          agentId: input.agentId,
        },
      });
      return { tasks, count };
    }),
  departments: createTRPCRouter({
    getAll: baseProcedure.query(async () => {
      const departments = await prisma.department.findMany();
      return departments;
    }),
    remove: baseProcedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        await prisma.department.delete({
          where: {
            id: input.id,
          },
        });
      }),
    create: baseProcedure
      .input(
        z.object({
          name: z.string(),
          description: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        await prisma.department.create({
          data: {
            name: input.name,
            description: input.description,
          },
        });
      }),
    getById: baseProcedure
      .input(
        z.object({
          id: z.string(),
        }),
      )
      .query(async ({ input }) => {
        const department = await prisma.department.findUnique({
          where: {
            id: input.id,
          },
        });
        return department;
      }),
  }),
  getAllAgents: baseProcedure
    .query(async () => {
      const agents = await prisma.agent.findMany();
      return agents;
    }),
  getAgentById: baseProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const agent = await prisma.agent.findUnique({
        where: {
          id: input.id,
        },
      });
      return agent;
    }),
   
});
// export type definition of API
export type AppRouter = typeof appRouter;
