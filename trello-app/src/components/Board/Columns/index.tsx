import { useCallback, KeyboardEvent, DragEvent } from 'react'
import { IconPlus } from '@tabler/icons-react'
import {
  Box,
  Title,
  Card as MantineCard,
  Flex,
  Paper,
  CloseButton,
  Skeleton,
  FocusTrap,
} from '@mantine/core'

// interfaces
import { Task, ListTask } from '@/interfaces/Task'

// constants
import { KEYBOARD } from '@/constants/keyboard'

// components
import Card from '../Card'
import { Button, Input } from '@/components/common'

interface ColumnProps {
  list: ListTask
  isAddingTask: boolean
  taskName: string
  isLoading: boolean
  onAddTask: (taskName: string) => void
  onTaskDrop: (
    taskId: number,
    sourceListId: number,
    targetListId: number,
    targetIndex: number,
  ) => void
  onIsAddingTask: (value: boolean) => void
  onTaskName: (name: string) => void
  onOpenCard: (value: Task) => void
}

const Column = ({
  list,
  taskName,
  isAddingTask,
  isLoading,
  onIsAddingTask,
  onTaskName,
  onAddTask,
  onTaskDrop,
  onOpenCard,
}: ColumnProps) => {
  const { id, tasks, name } = list
  const handleAddTask = useCallback(() => {
    if (taskName.trim()) {
      onAddTask(taskName)
      onTaskName('')
    }
  }, [taskName, onAddTask, onTaskName])

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = useCallback(
    (event: DragEvent<HTMLDivElement>, targetIndex: number) => {
      event.preventDefault()
      const taskId = parseInt(event.dataTransfer.getData('taskId'), 10)
      const sourceListId = parseInt(event.dataTransfer.getData('sourceListId'), 10)
      onTaskDrop(taskId, sourceListId, id, targetIndex)
    },
    [id, onTaskDrop],
  )

  const handleDragStart = useCallback(
    (event: DragEvent<HTMLDivElement>, taskId: number) => {
      event.dataTransfer.setData('taskId', taskId.toString())
      event.dataTransfer.setData('sourceListId', id.toString())
    },
    [id],
  )

  const handleOpenAddTask = () => {
    onIsAddingTask(true)
  }

  const handleCloseAddTask = () => {
    onIsAddingTask(false)
    onTaskName('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEYBOARD.ENTER) {
      handleAddTask()
    } else if (event.key === KEYBOARD.ESC) {
      handleCloseAddTask()
    }
  }

  return (
    <MantineCard
      shadow='sm'
      padding='xs'
      radius='lg'
      bg='backgrounds.1'
      w='270'
      style={{ flexShrink: 0 }}
      onDragOver={handleDragOver}
      onDrop={(event) => handleDrop(event, tasks.length)}
    >
      {isLoading ? (
        <Skeleton height={24} />
      ) : (
        <Box>
          <Title fw='700' c='backgrounds.0' order={5} p='10'>
            {isLoading ? <Skeleton height={24} /> : name}
          </Title>
          {isLoading ? (
            <>
              <Skeleton height={50} mb='sm' />
            </>
          ) : (
            tasks.map((task) => (
              <Card
                key={task.id}
                task={task}
                onDragStart={handleDragStart}
                onOpenCard={onOpenCard}
              />
            ))
          )}
          {isAddingTask ? (
            <Flex direction='column' gap='sm' onKeyDown={handleKeyDown}>
              <Paper shadow='md' radius='md'>
                <FocusTrap active={isAddingTask}>
                  <Input
                    variant='none-outline'
                    placeholder='Enter a title for this card...'
                    value={taskName || ''}
                    onChange={({ currentTarget: { value } }) => onTaskName(value)}
                  />
                </FocusTrap>
              </Paper>
              <Flex direction='row' gap='sm' align='center'>
                <Button onClick={handleAddTask} name='Add Task' />
                <CloseButton onClick={handleCloseAddTask} />
              </Flex>
            </Flex>
          ) : (
            <Button
              w='100%'
              mt='10'
              justify='flex-start'
              variant='primary'
              leftSection={<IconPlus size='16' />}
              onClick={handleOpenAddTask}
              name='Add a Card'
            />
          )}
        </Box>
      )}
    </MantineCard>
  )
}

export default Column
