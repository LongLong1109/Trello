import { useCallback } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { Box, Title, Card as MantineCard, Flex, Paper, CloseButton, Skeleton } from '@mantine/core'

// interfaces
import { Task, ListTask } from '@/interfaces/Task'

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
      onIsAddingTask(false)
    }
  }, [taskName, onAddTask, onTaskName, onIsAddingTask])

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
      event.preventDefault()
      const taskId = parseInt(event.dataTransfer.getData('taskId'), 10)
      const sourceListId = parseInt(event.dataTransfer.getData('sourceListId'), 10)
      onTaskDrop(taskId, sourceListId, id, targetIndex)
    },
    [id, onTaskDrop],
  )

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, taskId: number) => {
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
            <Card key={task.id} task={task} onDragStart={handleDragStart} onOpenCard={onOpenCard} />
          ))
        )}
        {isAddingTask ? (
          <Flex direction='column' gap='sm'>
            <Paper shadow='md' radius='md'>
              <Input
                variant='none-outline'
                placeholder='Enter a title for this card...'
                value={taskName || ''}
                onChange={({ currentTarget: { value } }) => onTaskName(value)}
              />
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
    </MantineCard>
  )
}

export default Column
