import { createWithEqualityFn } from 'zustand/traditional'
import useListStore from '@/stores/useListStore'
import { shallow } from 'zustand/shallow'
import { DatesRangeValue } from '@mantine/dates'

// interface
import { TaskListItem, Task } from '@/interfaces/Task'
import { CheckboxItem } from '@/components/common'

import { TODAY, NEXT_DAY } from '@/constants/dateTime'

type TaskStoreState = {
  tasks: Task[]
  addingTaskStates: { [key: number]: boolean }
  taskNameStates: { [key: number]: string }
  dateRange: DatesRangeValue
  selectedTask: TaskListItem | null
  taskLabels: CheckboxItem[]
  taskDescription: string
  taskComment: string
  checked: boolean
}

type TaskStoreActions = {
  setTasks: (tasks: Task[]) => void
  addTask: (id: number, title: string) => void
  setAddingTaskStates: (listId: number, value: boolean) => void
  setTaskNameStates: (listId: number, name: string) => void
  setSelectedTask: (task: TaskListItem) => void
  setTaskLabels: (labels: CheckboxItem[]) => void
  setTaskDescription: (description: string) => void
  setTaskComment: (comment: string) => void
  setChecked: (value: boolean) => void
  setDateRange: (date: DatesRangeValue) => void
}

type TaskStoreType = TaskStoreState & { taskActions: TaskStoreActions }

const INITIAL_TASK_STORE: TaskStoreState = {
  tasks: [],
  addingTaskStates: {},
  taskNameStates: {},
  dateRange: [TODAY, NEXT_DAY],
  selectedTask: null,
  taskLabels: [],
  taskDescription: '',
  taskComment: '',
  checked: false,
}

const useTask = createWithEqualityFn<TaskStoreType>(
  (set) => ({
    ...INITIAL_TASK_STORE,
    taskActions: {
      setTasks: (tasks) => set({ tasks }),
      addTask: (listId, taskName) => {
        const listActions = useListStore.getState().listActions
        listActions.addTask(listId, taskName)
      },
      setAddingTaskStates: (listId, value) =>
        set((state) => ({
          addingTaskStates: { ...state.addingTaskStates, [listId]: value },
        })),
      setTaskNameStates: (listId, name) =>
        set((state) => ({
          taskNameStates: { ...state.taskNameStates, [listId]: name },
        })),
      setSelectedTask: (task) => set({ selectedTask: task }),
      setTaskLabels: (labels) => set({ taskLabels: labels }),
      setTaskDescription: (description) => set({ taskDescription: description }),
      setTaskComment: (comment) => set({ taskComment: comment }),
      setChecked: (value) => set({ checked: value }),
      setDateRange: (date) => set({ dateRange: date }),
    },
  }),
  shallow,
)

export default useTask
