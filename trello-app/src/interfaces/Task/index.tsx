export interface Task {
  id: number
  title: string
  labels?: string[]
  description?: string
  dueDate?: Date | null
  comment?: string
  orderId?: number
}

export interface ListTask {
  id: number
  name: string
  tasks: Task[]
}

export interface TaskListItem extends Task {
  listId: number
}

export interface TasksResponse {
  data: Task[] | undefined
}
