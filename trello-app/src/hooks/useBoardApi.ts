import { useMutation, UseQueryOptions } from '@tanstack/react-query'

// interface
import { Task, TasksResponse } from '@/interfaces/Task'
import { ApiErrorResponse } from '@/interfaces/Error'
import { ColumnsResponse } from '@/interfaces/Board'
import { useQueries } from '@tanstack/react-query'

// services
import fetchApi from '@/services/fetchApis'

export type TaskPayload = Omit<Task, 'id'>

export const useGetTasks = (): UseQueryOptions<TasksResponse, ApiErrorResponse> => ({
  queryKey: ['tasks'],
  queryFn: async () => await fetchApi.get(`/tasks`),
})

export const useGetColumns = (
  columnId: string,
): UseQueryOptions<ColumnsResponse, ApiErrorResponse> => ({
  queryKey: ['lists', columnId],
  queryFn: async () => await fetchApi.get(`/boards?columnId=${columnId}`),
})

export const useGetBoards = (columnId: string) => {
  const queries = useQueries({
    queries: [useGetColumns(columnId), useGetTasks()],
  })

  const [
    { data: getListColumn, isLoading: isLoadingColumns },
    { data: getTasks, isLoading: isLoadingTasks },
  ] = queries

  return {
    getListColumn: getListColumn?.data[0],
    isLoadingColumns,
    getTasks: getTasks?.data,
    isLoadingTasks,
  }
}

export const usePostTask = () => {
  const { data, error, ...rest } = useMutation<TasksResponse, ApiErrorResponse, TaskPayload>({
    mutationFn: async (payload) => await fetchApi.post('/tasks', payload),
  })

  return {
    ...rest,
    data: data?.data,
    error: error?.message || '',
  }
}

export const usePutTask = () => {
  const { data, error, ...rest } = useMutation<TasksResponse, ApiErrorResponse, Task>({
    mutationFn: async ({ id, ...payload }) => await fetchApi.put(`/tasks/${id}`, payload),
  })

  return {
    ...rest,
    data: data?.data,
    error: error?.message || '',
  }
}

export const useRemoveTask = () => {
  const { data, error, ...rest } = useMutation({
    mutationFn: async (id: number) => await fetchApi.delete(`/tasks/${id}`),
  })
  return {
    ...rest,
    data: data?.data,
    error: error?.message || '',
  }
}
