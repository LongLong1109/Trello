//interface
import { ListTask, TaskListItem, Task } from '@/interfaces/Task'
import { TASK_PROPERTY_KEY, TaskPropertyValue } from '@/types/Task'

export const updateTaskProperty = (
  lists: ListTask[],
  listId: number,
  taskId: number,
  key: TASK_PROPERTY_KEY,
  value: TaskPropertyValue,
) => {
  return lists.map((list) => {
    const isTargetList = list.id === listId
    if (isTargetList) {
      return {
        ...list,
        tasks: list.tasks.map((task) => (task.id === taskId ? { ...task, [key]: value } : task)),
      }
    }
    return list
  })
}

export const removeTaskById = (lists: ListTask[], listId: number, taskId: number) => {
  return lists.map((list) => {
    const isTargetList = list.id === listId
    if (isTargetList) {
      return {
        ...list,
        tasks: list.tasks.filter((task) => task.id !== taskId),
      }
    }
    return list
  })
}

export const updateTaskTitle = (lists: ListTask[], selectedTask: TaskListItem, title: string) => {
  return lists.map((list) =>
    list.id === selectedTask.listId
      ? {
          ...list,
          tasks: list.tasks.map((task) =>
            task.id === selectedTask.id ? { ...task, title } : task,
          ),
        }
      : list,
  )
}

export const moveTask = (
  taskToMove: Task,
  updatedLists: ListTask[],
  targetListId: number,
  targetIndex: number,
) => {
  return updatedLists.map((list) => {
    if (list.id === targetListId) {
      const updatedTasks = [...list.tasks]
      updatedTasks.splice(targetIndex, 0, taskToMove)
      return { ...list, tasks: updatedTasks }
    }
    return list
  })
}
