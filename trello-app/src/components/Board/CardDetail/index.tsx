/* eslint-disable jsx-a11y/no-autofocus */
import { ChangeEvent } from 'react'
import { Flex, Paper, Title, Textarea, Modal, Badge, Skeleton } from '@mantine/core'
import { IconCalendar, IconTagStarred, IconMinus } from '@tabler/icons-react'

// utils
import { isDateOverdue } from '@/utils/validateDate'

// components
import { Labels, Button, DatePicker, Popover, CheckboxItem } from '../../common'

export interface CardDetailProps {
  labels: string[]
  description: string
  checkList: CheckboxItem[]
  dueDate: Date | null
  isOpenLabel: boolean
  isOpenDate: boolean
  formattedDate: string
  isEditingDescription: boolean
  comments: string
  isEditComment: boolean
  isOpenRemoveCard: boolean
  isLoading: boolean
  onEditComment: (value: boolean) => void
  onEditingDescription: (value: boolean) => void
  onUpdateComment: (value: string) => void
  onOpenLabel: (value: boolean) => void
  onOpenDate: (value: boolean) => void
  onUpdateDescription: (description: string) => void
  onUpdateLabels: (index: number, checked: boolean) => void
  onUpdateDueDate: (date: Date | null) => void
  onSaveDate: () => void
  onRemoveDate: () => void
  onOpenRemoveCard: (value: boolean) => void
  onRemoveCard: () => void
}

const CardDetail = ({
  labels,
  description,
  checkList,
  dueDate,
  isOpenLabel,
  isOpenDate,
  formattedDate,
  isEditingDescription,
  comments,
  isEditComment,
  isLoading,
  onEditComment,
  onUpdateComment,
  onEditingDescription,
  onOpenLabel,
  onOpenDate,
  onUpdateDescription,
  onUpdateLabels,
  onUpdateDueDate,
  onSaveDate,
  onRemoveDate,
  isOpenRemoveCard,
  onOpenRemoveCard,
  onRemoveCard,
}: CardDetailProps) => {
  const taskDueDate = new Date(dueDate ?? '')
  const checkDateOverdue = isDateOverdue(taskDueDate)

  const handleOpenLabel = () => {
    onOpenLabel(true)
  }

  const handleCloseLabel = () => {
    onOpenLabel(false)
  }

  const handleOpenDueDate = () => {
    onOpenDate(true)
  }

  const handleCloseDueDate = () => {
    onOpenDate(false)
  }

  const handleDescriptionUpdated = () => {
    onEditingDescription(true)
    onUpdateDescription(description)
  }

  const handleDescriptionChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateDescription(value)
  }

  const handleDescriptionBlur = () => {
    onEditingDescription(false)
  }

  const handleCommentsUpdated = () => {
    onEditComment(true)
    onUpdateComment(comments)
  }

  const handleCommentsChange = ({ currentTarget: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateComment(value)
  }

  const handleCommentsBlur = () => {
    onEditComment(false)
  }

  const handleOpenRemoveCard = () => {
    onOpenRemoveCard(true)
  }

  const handleCloseRemoveCard = () => {
    onOpenRemoveCard(false)
  }

  const handleRemoveCard = () => {
    onOpenRemoveCard(false)
  }

  return (
    <Flex justify='space-between' mih='500'>
      <Flex direction='column' w='60%'>
        <Flex direction='column' mb='20'>
          {isLoading ? (
            <Skeleton height={30} mb='10' />
          ) : (
            labels.length > 0 && (
              <Title c='backgrounds.8' order={6} mb='10'>
                Labels
              </Title>
            )
          )}
          <Flex gap='5'>
            {isLoading ? (
              <Skeleton width={50} height={30} />
            ) : (
              labels.map((label) => <Paper w='50' h='30' radius='4' bg={label} key={label} />)
            )}
          </Flex>

          {isLoading ? (
            <>
              <Skeleton height={30} mb='10' mt='10' />
              <Skeleton width={100} height={24} />
            </>
          ) : (
            dueDate && (
              <>
                <Title c='backgrounds.8' order={6} mb='10' mt='10'>
                  Due date
                </Title>
                <Badge radius='xs' color={checkDateOverdue ? 'red' : 'blue'}>
                  {taskDueDate.toLocaleDateString()} {checkDateOverdue && 'overdue'}
                </Badge>
              </>
            )
          )}
        </Flex>
        <Paper>
          <Title c='backgrounds.8' order={6} mb='10'>
            Description
          </Title>
          {isLoading ? (
            <Skeleton height={100} mb='sm' />
          ) : isEditingDescription ? (
            <Textarea
              value={description}
              onChange={handleDescriptionChange}
              onBlur={handleDescriptionBlur}
              autoFocus
              mb='sm'
              w='100%'
            />
          ) : (
            <Paper onClick={handleDescriptionUpdated} mb='sm' w='100%' p='10' bg='backgrounds.1'>
              {description || 'Add a more detailed description...'}
            </Paper>
          )}
        </Paper>

        <Paper>
          <Title c='backgrounds.8' order={6} mt='20' mb='10'>
            Comment
          </Title>
          {isLoading ? (
            <Skeleton height={100} mb='sm' />
          ) : isEditComment ? (
            <Textarea
              value={comments}
              onChange={handleCommentsChange}
              onBlur={handleCommentsBlur}
              autoFocus
              mb='sm'
              w='100%'
            />
          ) : (
            <Paper onClick={handleCommentsUpdated} mb='sm' w='100%' p='10' bg='backgrounds.4'>
              {comments || 'Write a comment...'}
            </Paper>
          )}
        </Paper>
      </Flex>

      <Flex direction='column' gap='10' w='30%'>
        <Title c='backgrounds.8' order={6}>
          Add to card
        </Title>
        <Popover
          name='Labels'
          icon={<IconTagStarred size='16' />}
          open={isOpenLabel}
          onOpen={handleOpenLabel}
          onClose={handleCloseLabel}
        >
          <Paper p='12' w='300'>
            {isLoading ? (
              <Skeleton height={40} />
            ) : (
              <Labels onChange={onUpdateLabels} checkList={checkList} onClose={handleCloseLabel} />
            )}
          </Paper>
        </Popover>

        <Popover
          name='Date'
          icon={<IconCalendar size='16' />}
          open={isOpenDate}
          onOpen={handleOpenDueDate}
          onClose={handleCloseDueDate}
        >
          <Paper p='12' w='300'>
            {isLoading ? (
              <Skeleton height={40} />
            ) : (
              <DatePicker
                value={dueDate}
                onChange={onUpdateDueDate}
                formattedDate={formattedDate}
                onSave={onSaveDate}
                onRemove={onRemoveDate}
              />
            )}
          </Paper>
        </Popover>

        <Modal.Root opened={isOpenRemoveCard} onClose={handleCloseRemoveCard} centered>
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              <Flex align='center' justify='space-between' w='100%'>
                <Paper />
                <Modal.Title>Are you sure to remove this card</Modal.Title>
                <Modal.CloseButton m='0' />
              </Flex>
            </Modal.Header>
            <Modal.Body>
              <Flex p='12' justify='space-between'>
                <Button variant='light' onClick={handleRemoveCard} name='Cancel' />
                <Button color='red' onClick={onRemoveCard} name='Remove Card' />
              </Flex>
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
        <Button
          size='md'
          radius='sm'
          justify='flex-start'
          variant='light'
          leftSection={<IconMinus size='16' />}
          onClick={handleOpenRemoveCard}
          name='Remove Card'
        />
      </Flex>
    </Flex>
  )
}

export default CardDetail
