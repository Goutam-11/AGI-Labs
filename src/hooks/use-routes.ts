import { useTRPC } from "@/trpc/client"
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSuspenseAgents = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.getAllAgents.queryOptions())
}
export const useSuspenseAgent = (id:string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.getAgentById.queryOptions({id}))
}

export const useCount = () => {
  const trpc = useTRPC();
  return useQuery(trpc.getAllCount.queryOptions());
}

export const useSuspenseActivities = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.getAllActivities.queryOptions())
}

export const useSuspenseTasks = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.getAllTasks.queryOptions())
}
export const useSuspenseTaskbyAgentId = (agentId:string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.getTasksbyAgentId.queryOptions({agentId}))
}

export const useSuspenseDepartments = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.departments.getAll.queryOptions())
}

export const useCreateDepartment = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(trpc.departments.create.mutationOptions({
    onSuccess: () => {
      // Handle success
      queryClient.invalidateQueries(trpc.departments.getAll.queryOptions())
      router.push('/departments')
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
