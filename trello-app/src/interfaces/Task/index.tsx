import { DatesRangeValue } from '@mantine/dates'
import { CheckboxItem } from '@/components/common'

export interface Task {
  id: number
  title: string
  labels?: CheckboxItem[]
  description?: string
  dateRange?: DatesRangeValue
  comment?: string
  checked?: boolean
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
