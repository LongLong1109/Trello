import { ListTask } from '../Task'

export interface UserBoard {
  columnId?: string
  columns: ListTask[]
}

export interface ColumnItem {
  id: number
  name: string
  order: number
}

export interface Columns {
  columnId: string
  columns: ColumnItem[]
}

export interface ColumnsResponse {
  data: Columns[]
}
