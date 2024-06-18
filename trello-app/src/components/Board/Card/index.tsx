import { ChangeEvent, DragEvent } from 'react'
import { Card, Text, Paper, Flex, Badge, Checkbox } from '@mantine/core'
import { IconMessagePlus, IconFileDescription } from '@tabler/icons-react'

// style
import classes from './Card.module.css'

// interface
import { Task } from '@/interfaces/Task'

// utils
import { isDateOverdue, formatDate } from '@/utils/validateDate'

interface TaskCardProps {
  task: Task
  onCheckboxClick: (event: React.MouseEvent<HTMLDivElement>) => void
  onChecked: (event: ChangeEvent<HTMLInputElement>) => void
  onDragStart: (event: DragEvent<HTMLDivElement>, taskId: number) => void
  onOpenCard: (value: Task) => void
}

const TaskCard = ({ task, onDragStart, onOpenCard, onChecked, onCheckboxClick }: TaskCardProps) => {
  const { id, title, labels, description, comment, dateRange, checked } = task
  const [firstValue, secondValue] = dateRange || []
  const startDate = firstValue && new Date(firstValue)
  const dueDate = secondValue && new Date(secondValue)
  const checkDateOverdue = dueDate ? isDateOverdue(dueDate) : false

  const handleCardClick = () => {
    onOpenCard(task)
  }

  return (
    <Card
      data-testid='card-id'
      shadow='md'
      padding='10'
      mb='10'
      draggable
      onDragStart={(event) => onDragStart(event, id)}
      onClick={handleCardClick}
      className={classes.card}
      withBorder
    >
      <Text fs='500' mb='5'>
        {title}
      </Text>
      {labels && (
        <Flex gap='5' mb='10' wrap='wrap' w='200'>
          {labels.map((label) => (
            <Paper maw='100' mah='30' p='2' radius='4' bg={label.label} key={label.key}>
              <Text p='2' size='xs'>
                {label.name}
              </Text>
            </Paper>
          ))}
        </Flex>
      )}
      <Flex gap='10' align='center'>
        {startDate && dueDate ? (
          <Badge
            variant='light'
            radius='sm'
            color={checked ? 'green' : checkDateOverdue ? 'red' : 'gray'}
            tt='capitalize'
            h='22'
            onClick={onCheckboxClick}
          >
            <Checkbox
              className={classes.checkbox}
              size='xs'
              color={checked ? 'green' : checkDateOverdue ? 'red' : 'green'}
              label={`${formatDate(startDate)} - ${formatDate(dueDate)}`}
              checked={checked}
              onChange={onChecked}
            />
          </Badge>
        ) : null}
        {description && <IconFileDescription size='14' />}
        {comment && <IconMessagePlus size='14' />}
      </Flex>
    </Card>
  )
}

export default TaskCard
