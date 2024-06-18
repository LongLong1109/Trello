import { Task } from '@/interfaces/Task'

//type
import { TaskPayload } from '@/types/Task'

// services
import fetchApi from '@/services/fetchApis'

export const getTasks = async () => await fetchApi.get('/tasks')

export const getColumns = async (columnId: string) =>
  await fetchApi.get(`/boards?columnId=${columnId}`)

export const postTask = async (task: TaskPayload) => await fetchApi.post('/tasks', task)

export const putTask = async ({ id, ...task }: Task) => await fetchApi.put(`/tasks/${id}`, task)

export const deleteTask = async (id: number) => await fetchApi.delete(`/tasks/${id}`)
