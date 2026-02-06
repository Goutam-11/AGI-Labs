import { useTRPC } from "@/trpc/client"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

export const useSuspenseAgents = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.getAllAgents.queryOptions())
}

export const useSuspenseActivities = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.getAllActivities.queryOptions())
}

export const useSuspenseTasks = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.getAllTasks.queryOptions())
}

export const useSuspenseDepartments = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.departments.getAll.queryOptions())
}

export const useCreateDepartment = () => {
  const trpc = useTRPC();
  return useMutation(trpc.departments.create.mutationOptions({
    onSuccess: () => {
      // Handle success
    },
    onError: () => {
      // Handle error
    }
  }))
}
export const useRemoveDepartment = () => {
  const trpc = useTRPC();
  return useMutation(trpc.departments.remove.mutationOptions({
    onSuccess: () => {
      // Handle success
    },
    onError: () => {
      // Handle error
    }
  }))
}

export const useSuspenseDepartment = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.departments.getById.queryOptions({ id }))
}
