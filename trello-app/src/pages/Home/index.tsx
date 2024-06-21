import { useState, useEffect, ChangeEvent, useOptimistic } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex } from '@mantine/core'
import { useListState, useNetwork } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { DatesRangeValue } from '@mantine/dates'

// interface
import { Task, ListTask } from '@/interfaces/Task'
import { ModalType } from '@/types/Modal'
import { TASK_PROPERTY_KEY } from '@/types/Task'

// store
import useList from '@/stores/useListStore'
import useTask from '@/stores/useCardStore'
import useAuth from '@/stores/useAuthStore'

// hocs
import withAuth from '@/hocs/withAuth'

// hook
import { useGetBoards, usePostTask, usePutTask, useRemoveTask } from '@/hooks/useBoardApi'

// constants
import { NOTIFICATION_DELETE_CARD } from '@/constants/notification'
import { INITIAL_CHECKBOX_VALUES } from '@/constants/checkbox'

// utils
import { removeTaskById, updateTaskTitle, moveTask, updateTaskProperty } from '@/utils/taskUtils'

// component
import Modal from '@/components/common/Modal'
import CardDetail from '@/components/Board/CardDetail'
import Column from '@/components/Board/Columns'
import { CheckboxItem } from '@/components/common'
import { PAGE_URLS } from '@/constants/pageUrls'

const Home = () => {
  const { online } = useNetwork()
  const navigate = useNavigate()
  const userAuth = useAuth((state) => state.userAuth)
  const userId = userAuth?.user.id || ''
  const { getListColumn, isLoadingColumns, getTasks, isLoadingTasks } = useGetBoards(userId)
  const { createTask } = usePostTask()

  // list store
  const [lists, listActions] = useList((state) => [state.lists, state.listActions])
  const { setLists } = listActions

  const [optimisticList, addOptimisticList] = useOptimistic(
    lists,
    (currentList: ListTask[], newList: ListTask[]) => {
      return [...currentList, ...newList]
    },
  )

  const [
    addingTaskStates,
    taskNameStates,
    dateRange,
    selectedTask,
    taskLabels,
    taskDescription,
    taskComment,
    checked,
    taskActions,
  ] = useTask((state) => [
    state.addingTaskStates,
    state.taskNameStates,
    state.dateRange,
    state.selectedTask,
    state.taskLabels,
    state.taskDescription,
    state.taskComment,
    state.checked,
    state.taskActions,
  ])

  const {
    addTask,
    setAddingTaskStates,
    setTaskNameStates,
    setDateRange,
    setSelectedTask,
    setTaskLabels,
    setTaskDescription,
    setTaskComment,
    setChecked,
  } = taskActions

  const { updateTask } = usePutTask()
  const { deleteTask } = useRemoveTask()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [modalState, setModalState] = useState<ModalType>(null)

  const [checkList, handlers] = useListState(INITIAL_CHECKBOX_VALUES)

  const handleTaskClick = (task: Task, listId: number) => {
    setSelectedTask({ ...task, listId })
    setTaskLabels(task.labels || [])
    setTaskDescription(task.description || '')
    setDateRange(task.dateRange || [null, null])
    setTaskComment(task.comment || '')
    setChecked(task.checked || false)
    setIsModalOpen(true)
  }

  const resetCheckList = () => {
    INITIAL_CHECKBOX_VALUES.map((_, index) => {
      handlers.setItemProp(index, 'checked', false)
    })
  }

  const updateCheckList = (labels: CheckboxItem[]) => {
    INITIAL_CHECKBOX_VALUES.map((item, index) => {
      const isChecked = labels.some((label) => label.label === item.label)
      handlers.setItemProp(index, 'checked', isChecked)
    })
  }

  useEffect(() => {
    if (!online) {
      navigate(PAGE_URLS.OFF_LINE)
    }
  }, [online])

  useEffect(() => {
    if (getListColumn && getTasks) {
      const newList = getListColumn.columns.map((column) => ({
        id: column.id,
        name: column.name,
        tasks: getTasks.filter((task) => task.orderId === column.order),
      }))

      addOptimisticList(newList)
      setLists(newList)
    }
  }, [getTasks, getListColumn, setLists, addOptimisticList])

  useEffect(() => {
    if (selectedTask) {
      resetCheckList()
      updateCheckList(selectedTask.labels || [])
    }
  }, [selectedTask])

  const handleAddTask = (listId: number, taskName: string) => {
    addTask(listId, taskName)
    createTask({ title: taskName, orderId: listId })
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
      ? setTaskLabels([...taskLabels, { ...checkList[index], checked }])
      : setTaskLabels(taskLabels.filter((l) => l.label !== label))

    // Update the labels of the selected task
    const updatedLabels = checked
      ? [...(selectedTask.labels || []), { ...checkList[index], checked }]
      : (selectedTask.labels || []).filter((l) => l.label !== label)

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

  const updateTaskDueDate = (listId: number, taskId: number, dateRange: DatesRangeValue) => {
    setLists(updateTaskProperty(lists, listId, taskId, TASK_PROPERTY_KEY.DUE_DATE, dateRange))
  }

  const updateTaskDescription = (listId: number, taskId: number, description: string) => {
    if (!selectedTask) return

    setSelectedTask({ ...selectedTask, description, orderId: listId })
    setLists(updateTaskProperty(lists, listId, taskId, TASK_PROPERTY_KEY.DESCRIPTION, description))
    updateTask({ ...selectedTask, description, orderId: listId })
  }

  const handleSaveDate = () => {
    if (selectedTask) {
      setSelectedTask({ ...selectedTask, dateRange })
      updateTaskDueDate(selectedTask.listId, selectedTask.id, dateRange)
      setModalState(null)
      updateTask({
        ...selectedTask,
        dateRange: dateRange,
        checked: false,
        orderId: selectedTask.listId,
      })
    }
  }

  const handleRemoveDate = () => {
    if (selectedTask) {
      setSelectedTask({ ...selectedTask, dateRange: [null, null] })
      setDateRange([null, null])
      updateTaskDueDate(selectedTask.listId, selectedTask.id, [null, null])
      setModalState(null)
      updateTask({
        ...selectedTask,
        dateRange: [null, null],
        orderId: selectedTask.listId,
        checked: false,
      })
    }
  }

  const updateTaskComment = (listId: number, taskId: number, comment: string) => {
    if (!selectedTask) return

    setSelectedTask({ ...selectedTask, comment, orderId: listId })
    setLists(updateTaskProperty(lists, listId, taskId, TASK_PROPERTY_KEY.COMMENT, comment))
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
      setLists(moveTask(taskToMove, updatedLists, targetListId, targetIndex))
    }
  }

  const updateTaskLabels = (listId: number, taskId: number, labels: CheckboxItem[]) => {
    if (!selectedTask) return

    setSelectedTask({ ...selectedTask, labels, orderId: listId })
    setLists(updateTaskProperty(lists, listId, taskId, TASK_PROPERTY_KEY.LABELS, labels))
    updateTask({ ...selectedTask, labels, orderId: selectedTask.listId })
  }

  const removeTask = (listId: number, taskId: number) => {
    setLists(removeTaskById(lists, listId, taskId))
    deleteTask(taskId)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedTask) {
      const title = e.target.value
      setSelectedTask({ ...selectedTask, title })
      setLists(updateTaskTitle(lists, selectedTask, title))
      updateTask({ ...selectedTask, title, orderId: selectedTask.listId })
    }
  }

  const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedTask) {
      const checked = e.target.checked
      setChecked(checked)
      setSelectedTask({ ...selectedTask, checked })
      setLists(
        updateTaskProperty(
          lists,
          selectedTask.listId,
          selectedTask.id,
          TASK_PROPERTY_KEY.CHECKED,
          checked,
        ),
      )
      updateTask({ ...selectedTask, checked, orderId: selectedTask.listId })
    }
  }

  const handleCheckboxClick = (e: React.MouseEvent<HTMLDivElement>, listId: number, task: Task) => {
    e.stopPropagation()
    if (task) {
      const selectedTask = { ...task, listId }
      setChecked(!checked)
      setSelectedTask({ ...selectedTask, checked })
      setLists(
        updateTaskProperty(
          lists,
          selectedTask.listId,
          selectedTask.id,
          TASK_PROPERTY_KEY.CHECKED,
          checked,
        ),
      )
      updateTask({ ...selectedTask, checked, orderId: selectedTask.listId })
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
    setModalState(null)
    handleCloseModal()
    notifications.show(NOTIFICATION_DELETE_CARD)
  }

  return (
    <Flex direction='column' gap='lg'>
      <Flex gap='lg' align='flex-start' style={{ overflowX: 'auto', padding: '1rem 0' }}>
        {optimisticList.map((list) => (
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
            onChecked={handleChangeChecked}
            onCheckboxClick={(e, task) => handleCheckboxClick(e, list.id, task)}
          />
        ))}
      </Flex>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        value={selectedTask?.title || ''}
        onChange={handleInputChange}
      >
        {selectedTask && (
          <CardDetail
            modalState={modalState}
            setModalStateByKey={setModalState}
            description={taskDescription}
            labels={taskLabels}
            checkList={checkList}
            dateRange={dateRange}
            isLoading={isLoadingTasks}
            onUpdateDescription={handleDescriptionChange}
            onUpdateLabels={handleChangeCheckbox}
            onUpdateDueDate={setDateRange}
            onSaveDate={handleSaveDate}
            onRemoveDate={handleRemoveDate}
            comments={taskComment}
            onUpdateComment={handleCommentChange}
            onRemoveCard={handleRemoveTask}
            checked={checked}
            onChecked={handleChangeChecked}
          />
        )}
      </Modal>
    </Flex>
  )
}

export default withAuth(Home)
