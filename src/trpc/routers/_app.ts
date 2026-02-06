import { baseProcedure, createTRPCRouter } from '../init';
import prisma from '@/lib/db';
import z from 'zod';
export const appRouter = createTRPCRouter({
  getAllActivities: baseProcedure.query(async () => {
    const activities = await prisma.activity.findMany();
    return activities;
  }),
  getAllTasks: baseProcedure.query(async () => {
    const tasks = await prisma.task.findMany();
    return tasks;
  }),
  departments: createTRPCRouter({
    getAll: baseProcedure.query(async () => {
      const departments = await prisma.department.findMany();
      return departments;
    }),
    remove: baseProcedure
      .input(z.object({
        id : z.string()
      }))
      .mutation(async ({ input }) => {
        await prisma.department.delete({
          where: {
            id: input.id
          }
        });
      }),
    create: baseProcedure
      .input(z.object({
        name : z.string(),
        description : z.string()
      }))
      .mutation(async ({ input }) => {
        await prisma.department.create({
          data: {
            name: input.name,
            description: input.description
          }
        });
      }),
    getById: baseProcedure
      .input(z.object({
        id : z.string()
      }))
      .query(async ({ input }) => {
      const department = await prisma.department.findUnique({
        where: {
          id: input.id
        },
      });
      return department;
    }),
  }),
  getAllAgents: baseProcedure.query(async () => {
    const agents = await prisma.agent.findMany();
    return agents;
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;