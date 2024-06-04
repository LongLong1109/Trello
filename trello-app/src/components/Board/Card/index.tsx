import React from 'react'
import { Card, Text, Paper, Flex, Badge } from '@mantine/core'
import { IconMessagePlus, IconFileDescription } from '@tabler/icons-react'
// interface
import { Task } from '@/interfaces/Task'

// utils
import { isDateOverdue } from '@/utils/validateDate'

interface TaskCardProps {
  task: Task
  onDragStart: (event: React.DragEvent<HTMLDivElement>, taskId: number) => void
  onOpenCard: (value: Task) => void
}

const TaskCard = ({ task, onDragStart, onOpenCard }: TaskCardProps) => {
  const { id, title, labels, description, comment, dueDate } = task
  const taskDueDate = new Date(dueDate ?? '')
  const checkDateOverdue = isDateOverdue(taskDueDate)

  const handleCardClick = () => {
    onOpenCard(task)
  }

  return (
    <Card
      data-testid='card-id'
      shadow='md'
      padding='lg'
      mb='10'
      draggable
      onDragStart={(event) => onDragStart(event, id)}
      onClick={handleCardClick}
    >
      <Text fs='500' pb='10'>
        {title}
      </Text>
      {labels && (
        <Flex gap='5'>
          {labels.map((label) => (
            <Paper w='30' h='10' radius='4' bg={label} key={label} />
          ))}
        </Flex>
      )}
      <Flex gap='10' align='center' mt='10'>
        {dueDate && (
          <Badge variant='light' color={checkDateOverdue ? 'red' : 'blue'} radius='xs'>
            {taskDueDate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' })}
          </Badge>
        )}
        {description && <IconFileDescription size='14' />}
        {comment && <IconMessagePlus size='14' />}
      </Flex>
    </Card>
  )
}

export default TaskCard
