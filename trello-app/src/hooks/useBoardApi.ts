import { useMutation, useQuery } from '@tanstack/react-query'

// interface
import { Task, TasksResponse } from '@/interfaces/Task'
import { ApiErrorResponse } from '@/interfaces/Error'
import { ColumnsResponse } from '@/interfaces/Board'

// services
import fetchApi from '@/services/fetchApis'

export type TaskPayload = Omit<Task, 'id'>

export const useGetColumns = (columnId: string) => {
  const { data, error, ...rest } = useQuery<ColumnsResponse, ApiErrorResponse>({
    queryKey: ['lists'],
    queryFn: async () => await fetchApi.get(`/boards?columnId=${columnId}`),
  })
  return {
    ...rest,
    error: error?.message || '',
    data: data?.data[0],
  }
}

export const useGetTasks = () => {
  const { data, error, ...rest } = useQuery<TasksResponse>({
    queryKey: ['tasks'],
    queryFn: async () => await fetchApi.get(`/tasks`),
  })
  return {
    ...rest,
    error: error?.message || '',
    data: data?.data,
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

export const usePutTask = (id: number) => {
  const { data, error, ...rest } = useMutation<TasksResponse, ApiErrorResponse, TaskPayload>({
    mutationFn: async (payload) => await fetchApi.put(`/tasks/${id}`, payload),
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
