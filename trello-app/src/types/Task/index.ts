import { Task } from '@/interfaces/Task'
import { DatesRangeValue } from '@mantine/dates'
import { CheckboxItem } from '@/components/common'

export type TaskPayload = Omit<Task, 'id'>

export enum TASK_PROPERTY_KEY {
  DUE_DATE = 'dateRange',
  DESCRIPTION = 'description',
  COMMENT = 'comment',
  LABELS = 'labels',
  CHECKED = 'checked',
}

export type TaskPropertyValue = DatesRangeValue | string | CheckboxItem[] | boolean
