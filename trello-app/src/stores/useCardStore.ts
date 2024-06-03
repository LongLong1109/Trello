import { create } from 'zustand'
import useListStore from '@/stores/useListStore'

// interface
import { TaskListItem, Task } from '@/interfaces/Task'

type TaskStoreState = {
  tasks: Task[]
  addingTaskStates: { [key: number]: boolean }
  taskNameStates: { [key: number]: string }
  taskDueDate: Date | null
  selectedTask: TaskListItem | null
  taskLabels: string[]
  taskDescription: string
  taskComment: string
}

type TaskStoreActions = {
  setTasks: (tasks: Task[]) => void
  addTask: (id: number, title: string) => void
  setAddingTaskStates: (listId: number, value: boolean) => void
  setTaskNameStates: (listId: number, name: string) => void
  setTaskDueDate: (date: Date | null) => void
  setSelectedTask: (task: TaskListItem) => void
  setTaskLabels: (labels: string[]) => void
  setTaskDescription: (description: string) => void
  setTaskComment: (comment: string) => void
}

type TaskStoreType = TaskStoreState & { taskActions: TaskStoreActions }

const INITIAL_TASK_STORE = {
  tasks: [],
  addingTaskStates: {},
  taskNameStates: {},
  taskDueDate: null,
  selectedTask: null,
  taskLabels: [],
  taskDescription: '',
  taskComment: '',
}

const useTaskStore = create<TaskStoreType>((set) => ({
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
    setTaskDueDate: (date) => set({ taskDueDate: date }),
    setSelectedTask: (task) => set({ selectedTask: task }),
    setTaskLabels: (labels) => set({ taskLabels: labels }),
    setTaskDescription: (description) => set({ taskDescription: description }),
    setTaskComment: (comment) => set({ taskComment: comment }),
  },
}))

export default useTaskStore
