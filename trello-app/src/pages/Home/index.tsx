import { useState, useEffect } from 'react'
import { Flex, Card, Skeleton } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'

// interface
import { Task } from '@/interfaces/Task'

// store
import useListStore from '@/stores/useListStore'
import useTaskStore from '@/stores/useCardStore'
import useAuthStore from '@/stores/useAuthStore'

// hocs
import withAuth from '@/hocs/withAuth'

// hook
import { useGetBoards, usePostTask, usePutTask, useRemoveTask } from '@/hooks/useBoardApi'

// constants
import { NOTIFICATION_DELETE_CARD } from '@/constants/notification'
import { INITIAL_CHECKBOX_VALUES } from '@/constants/checkbox'

// component
import Modal from '@/components/common/Modal'
import CardDetail from '@/components/Board/CardDetail'
import Column from '@/components/Board/Columns'

const Home = () => {
  const userAuth = useAuthStore((state) => state.userAuth)
  const userId = userAuth?.user.id || ''
  const { getListColumn, isLoadingColumns, getTasks, isLoadingTasks } = useGetBoards(userId)
  const { mutate: postTask } = usePostTask()

  // list store
  const [lists, listActions] = useListStore((state) => [state.lists, state.listActions])
  const { setLists } = listActions

  const [
    addingTaskStates,
    taskNameStates,
    taskDueDate,
    selectedTask,
    taskLabels,
    taskDescription,
    taskComment,
    taskActions,
  ] = useTaskStore((state) => [
    state.addingTaskStates,
    state.taskNameStates,
    state.taskDueDate,
    state.selectedTask,
    state.taskLabels,
    state.taskDescription,
    state.taskComment,
    state.taskActions,
  ])

  const {
    addTask,
    setAddingTaskStates,
    setTaskNameStates,
    setTaskDueDate,
    setSelectedTask,
    setTaskLabels,
    setTaskDescription,
    setTaskComment,
  } = taskActions

  const { mutate: updateTask } = usePutTask()
  const { mutate: deleteTask } = useRemoveTask()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOpenLabel, setOpenLabel] = useState(false)
  const [isOpenDate, setOpenDate] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [isOpenRemoveCard, setOpenRemoveCard] = useState(false)
  const [isEditingComment, setIsEditingComment] = useState(false)
  const [checkList, handlers] = useListState(INITIAL_CHECKBOX_VALUES)

  const handleTaskClick = (task: Task, listId: number) => {
    setSelectedTask({ ...task, listId })
    setTaskLabels(task.labels || [])
    setTaskDescription(task.description || '')
    setTaskDueDate(task.dueDate || null)
    setTaskComment(task.comment || '')
    setIsModalOpen(true)
  }

  const resetCheckList = () => {
    INITIAL_CHECKBOX_VALUES.map((_, index) => {
      handlers.setItemProp(index, 'checked', false)
    })
  }

  const updateCheckList = (labels: string[]) => {
    INITIAL_CHECKBOX_VALUES.map((item, index) => {
      handlers.setItemProp(index, 'checked', labels.includes(item.label))
    })
  }

  useEffect(() => {
    if (getListColumn && getTasks) {
      setLists(
        getListColumn.columns.map((column) => ({
          id: column.id,
          name: column.name,
          tasks: getTasks.filter((task) => task.orderId === column.order),
        })),
      )
    }
  }, [getTasks, getListColumn, setLists])

  useEffect(() => {
    if (selectedTask) {
      resetCheckList()
      updateCheckList(selectedTask.labels || [])
    }
  }, [selectedTask])

  const handleAddTask = (listId: number, taskName: string) => {
    addTask(listId, taskName)
    postTask({ title: taskName, orderId: listId })
  }

  /**
   * Handles the change event of a checkbox in the task label selection.
   * @param index The index of the checkbox in the list of labels.
   * @param checked The new checked state of the checkbox.
   */
  const handleChangeCheckbox = (index: number, checked: boolean) => {
    if (!selectedTask) return

    // Get the label associated with the checkbox at the given index
    const label = checkList[index].label

    // Update the checked state of the checkbox in the local state
    handlers.setItemProp(index, 'checked', checked)

    // Update the task labels state based on the checkbox state
    checked
      ? setTaskLabels([...taskLabels, label])
      : setTaskLabels(taskLabels.filter((l) => l !== label))

    // Update the labels of the selected task
    const updatedLabels = checked
      ? [...(selectedTask.labels || []), label]
      : (selectedTask.labels || []).filter((l) => l !== label)

    // Update the selected task with the updated labels
    setSelectedTask({
      ...selectedTask,
      labels: updatedLabels,
    })
    updateTaskLabels(selectedTask.listId, selectedTask.id, updatedLabels)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const updateTaskDueDate = (listId: number, taskId: number, dueDate: Date | null) => {
    setLists(
      lists.map((list) => {
        const isTargetList = list.id === listId
        if (isTargetList) {
          return {
            ...list,
            tasks: list.tasks.map((task) => (task.id === taskId ? { ...task, dueDate } : task)),
          }
        }
        return list
      }),
    )
  }

  const updateTaskDescription = (listId: number, taskId: number, description: string) => {
    if (!selectedTask) return

    setSelectedTask({ ...selectedTask, description, orderId: listId })
    setLists(
      lists.map((list) => {
        const isTargetList = list.id === listId
        if (isTargetList) {
          return {
            ...list,
            tasks: list.tasks.map((task) => (task.id === taskId ? { ...task, description } : task)),
          }
        }
        return list
      }),
    )
    updateTask({ ...selectedTask, description, orderId: listId })
  }

  const handleSaveDate = () => {
    if (selectedTask) {
      setSelectedTask({ ...selectedTask, dueDate: taskDueDate })
      updateTaskDueDate(selectedTask.listId, selectedTask.id, taskDueDate)
      setOpenDate(false)
      updateTask({
        ...selectedTask,
        dueDate: taskDueDate,
        orderId: selectedTask.listId,
      })
    }
  }

  const handleRemoveDate = () => {
    if (selectedTask) {
      setSelectedTask({ ...selectedTask, dueDate: null })
      setTaskDueDate(null)
      updateTaskDueDate(selectedTask.listId, selectedTask.id, null)
      setOpenDate(false)
      updateTask({ ...selectedTask, dueDate: null, orderId: selectedTask.listId })
    }
  }

  const updateTaskComment = (listId: number, taskId: number, comment: string) => {
    if (!selectedTask) return

    setSelectedTask({ ...selectedTask, comment, orderId: listId })
    setLists(
      lists.map((list) => {
        const isTargetList = list.id === listId
        if (isTargetList) {
          return {
            ...list,
            tasks: list.tasks.map((task) => (task.id === taskId ? { ...task, comment } : task)),
          }
        }
        return list
      }),
    )
    updateTask({ ...selectedTask, comment, orderId: selectedTask.listId })
  }

  const handleTaskDrop = (
    taskId: number,
    sourceListId: number,
    targetListId: number,
    targetIndex: number,
  ) => {
    let taskToMove: Task = {
      id: 0,
      title: '',
    }
    const updatedLists = lists.map((list) => {
      if (list.id === sourceListId) {
        const updatedTasks = list.tasks.filter((task) => {
          if (task.id === taskId) {
            taskToMove = task
            updateTask({ ...task, orderId: targetListId })
            return false
          }
          return true
        })
        return { ...list, tasks: updatedTasks }
      }
      return list
    })

    if (taskToMove) {
      setLists(
        updatedLists.map((list) => {
          if (list.id === targetListId) {
            const updatedTasks = [...list.tasks]
            updatedTasks.splice(targetIndex, 0, taskToMove)
            return { ...list, tasks: updatedTasks }
          }
          return list
        }),
      )
    }
  }

  const updateTaskLabels = (listId: number, taskId: number, labels: string[]) => {
    if (!selectedTask) return

    setSelectedTask({ ...selectedTask, labels, orderId: listId })
    setLists(
      lists.map((list) => {
        const isTargetList = list.id === listId
        if (isTargetList) {
          return {
            ...list,
            tasks: list.tasks.map((task) =>
              task.id === taskId ? { ...task, labels: [...labels] } : task,
            ),
          }
        }
        return list
      }),
    )
    updateTask({ ...selectedTask, labels, orderId: selectedTask.listId })
  }

  const removeTask = (listId: number, taskId: number) => {
    setLists(
      lists.map((list) => {
        const isTargetList = list.id === listId
        if (isTargetList) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task.id !== taskId),
          }
        }
        return list
      }),
    )
    deleteTask(taskId)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedTask) {
      setSelectedTask({ ...selectedTask, title: e.target.value })
      setLists(
        lists.map((list) =>
          list.id === selectedTask.listId
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === selectedTask.id ? { ...task, title: e.target.value } : task,
                ),
              }
            : list,
        ),
      )
      updateTask({ ...selectedTask, title: e.target.value, orderId: selectedTask.listId })
    }
  }

  const handleDescriptionChange = (description: string) => {
    setTaskDescription(description)
    selectedTask && updateTaskDescription(selectedTask.listId, selectedTask.id, description)
  }

  const handleCommentChange = (comment: string) => {
    setTaskComment(comment)
    selectedTask && updateTaskComment(selectedTask.listId, selectedTask.id, comment)
  }

  const handleRemoveTask = () => {
    selectedTask && removeTask(selectedTask.listId, selectedTask.id)
    setOpenRemoveCard(false)
    handleCloseModal()
    notifications.show(NOTIFICATION_DELETE_CARD)
  }

  return (
    <Flex direction='column' gap='lg'>
      <Flex gap='lg' align='flex-start' style={{ overflowX: 'auto', padding: '1rem 0' }}>
        {isLoadingColumns && isLoadingTasks ? (
          <Card padding='xs' radius='lg' bg='backgrounds.1' w='270'>
            <Skeleton height={30} />
          </Card>
        ) : (
          lists.map((list) => (
            <Column
              key={list.id}
              list={list}
              isLoading={isLoadingColumns}
              isAddingTask={addingTaskStates[list.id]}
              taskName={taskNameStates[list.id]}
              onAddTask={(taskName) => handleAddTask(list.id, taskName)}
              onTaskDrop={handleTaskDrop}
              onIsAddingTask={(value) => setAddingTaskStates(list.id, value)}
              onTaskName={(name) => setTaskNameStates(list.id, name)}
              onOpenCard={(task) => handleTaskClick(task, list.id)}
            />
          ))
        )}
      </Flex>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        value={selectedTask?.title || ''}
        onChange={handleInputChange}
      >
        {selectedTask && (
          <CardDetail
            description={taskDescription}
            labels={taskLabels}
            checkList={checkList}
            dueDate={taskDueDate}
            isOpenLabel={isOpenLabel}
            isOpenDate={isOpenDate}
            isLoading={isLoadingTasks}
            formattedDate={taskDueDate ? new Date(taskDueDate).toLocaleDateString() : ''}
            onOpenLabel={setOpenLabel}
            onOpenDate={setOpenDate}
            onUpdateDescription={handleDescriptionChange}
            onUpdateLabels={handleChangeCheckbox}
            onUpdateDueDate={setTaskDueDate}
            onSaveDate={handleSaveDate}
            onRemoveDate={handleRemoveDate}
            isEditingDescription={isEditingDescription}
            onEditingDescription={setIsEditingDescription}
            comments={taskComment}
            isEditComment={isEditingComment}
            onEditComment={setIsEditingComment}
            onUpdateComment={handleCommentChange}
            isOpenRemoveCard={isOpenRemoveCard}
            onOpenRemoveCard={setOpenRemoveCard}
            onRemoveCard={handleRemoveTask}
          />
        )}
      </Modal>
    </Flex>
  )
}

export default withAuth(Home)
