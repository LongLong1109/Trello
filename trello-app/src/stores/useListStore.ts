import { createWithEqualityFn } from 'zustand/traditional'
import { ListTask } from '@/interfaces/Task'
import { shallow } from 'zustand/shallow'

type ListStoreState = {
  lists: ListTask[]
  taskCounter: number
}

type ListStoreActions = {
  setLists: (lists: ListTask[]) => void
  addTask: (listId: number, taskName: string) => void
}

type ListStoreType = ListStoreState & { listActions: ListStoreActions }

const INITIAL_LIST_STORE = {
  lists: [],
  listCounter: 1,
  taskCounter: 1,
  listName: '',
  isAddingList: false,
}

const useList = createWithEqualityFn<ListStoreType>(
  (set) => ({
    ...INITIAL_LIST_STORE,
    listActions: {
      setLists: (lists) => set({ lists }),
      addTask: (listId, taskName) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? { ...list, tasks: [...list.tasks, { id: state.taskCounter, title: taskName }] }
              : list,
          ),
          taskCounter: state.taskCounter + 1,
        })),
    },
  }),
  shallow,
)

export default useList
