import { useMutation, UseQueryOptions } from '@tanstack/react-query'
import { useQueries } from '@tanstack/react-query'

// interface
import { Task, TasksResponse } from '@/interfaces/Task'
import { ApiErrorResponse } from '@/interfaces/Error'
import { ColumnsResponse } from '@/interfaces/Board'

// type
import { TaskPayload } from '@/types/Task'

// services
import { getTasks, getColumns, postTask, putTask, deleteTask } from '@/services/boardApi'

export const useGetTasks = (): UseQueryOptions<TasksResponse, ApiErrorResponse> => ({
  queryKey: ['tasks'],
  queryFn: getTasks,
})

export const useGetColumns = (
  columnId: string,
): UseQueryOptions<ColumnsResponse, ApiErrorResponse> => ({
  queryKey: ['lists', columnId],
  queryFn: () => getColumns(columnId),
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
  const { data, error, mutate, ...rest } = useMutation<
    TasksResponse,
    ApiErrorResponse,
    TaskPayload
  >({
    mutationFn: postTask,
  })

  return {
    ...rest,
    task: data?.data,
    createTask: mutate,
    error: error?.message || '',
  }
}

export const usePutTask = () => {
  const { data, error, mutate, ...rest } = useMutation<TasksResponse, ApiErrorResponse, Task>({
    mutationFn: putTask,
  })

  return {
    ...rest,
    data: data?.data,
    updateTask: mutate,
    error: error?.message || '',
  }
}

export const useRemoveTask = () => {
  const { data, error, mutate, ...rest } = useMutation({
    mutationFn: deleteTask,
  })

  return {
    ...rest,
    data: data?.data,
    deleteTask: mutate,
    error: error?.message || '',
  }
}
