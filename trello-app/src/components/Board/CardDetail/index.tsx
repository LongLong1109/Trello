/* eslint-disable jsx-a11y/no-autofocus */
import { ChangeEvent } from 'react'
import { Flex, Paper, Title, Textarea, Modal, Badge, Skeleton, Checkbox, Text } from '@mantine/core'
import { IconCalendar, IconTagStarred, IconMinus } from '@tabler/icons-react'
import { DatesRangeValue } from '@mantine/dates'

// utils
import { isDateOverdue, formatDate } from '@/utils/validateDate'

// components
import { Labels, Button, DatePicker, Popover, CheckboxItem } from '../../common'

// type
import { ModalType, MODAL_NAME } from '@/types/Modal'

export interface CardDetailProps {
  labels: CheckboxItem[]
  description: string
  checkList: CheckboxItem[]
  dateRange: DatesRangeValue
  comments: string
  modalState: ModalType
  isLoading: boolean
  checked: boolean
  onChecked: (event: ChangeEvent<HTMLInputElement>) => void
  onUpdateComment: (value: string) => void
  onUpdateDescription: (description: string) => void
  onUpdateLabels: (index: number, checked: boolean) => void
  onUpdateDueDate: (date: DatesRangeValue) => void
  onSaveDate: () => void
  onRemoveDate: () => void
  onRemoveCard: () => void
  setModalStateByKey: (key: ModalType) => void
}

const CardDetail = ({
  labels,
  description,
  checkList,
  dateRange,
  comments,
  modalState,
  isLoading,
  checked,
  onChecked,
  onUpdateComment,
  onUpdateDescription,
  onUpdateLabels,
  onUpdateDueDate,
  onSaveDate,
  onRemoveDate,
  onRemoveCard,
  setModalStateByKey,
}: CardDetailProps) => {
  const isLabelModalOpen = modalState === MODAL_NAME.LABEL
  const isDateModalOpen = modalState === MODAL_NAME.DATE
  const isRemoveCardModalOpen = modalState === MODAL_NAME.REMOVE_CARD
  const isEditDescriptionOpen = modalState === MODAL_NAME.EDIT_DESCRIPTION
  const isEditCommentOpen = modalState === MODAL_NAME.EDIT_COMMENT

  const [firstValue, lastValue] = dateRange || []
  const startDate = firstValue && new Date(firstValue)
  const dueDate = lastValue && new Date(lastValue)

  const validDate = startDate && dueDate
  const checkDateOverdue = dueDate ? isDateOverdue(dueDate) : false

  const handleOpenLabel = () => {
    setModalStateByKey(MODAL_NAME.LABEL)
  }

  const handleCloseLabel = () => {
    setModalStateByKey(null)
  }

  const handleOpenDueDate = () => {
    setModalStateByKey(MODAL_NAME.DATE)
  }

  const handleCloseDueDate = () => {
    setModalStateByKey(null)
  }

  const handleDescriptionUpdated = () => {
    setModalStateByKey(MODAL_NAME.EDIT_DESCRIPTION)
    onUpdateDescription(description)
  }

  const handleDescriptionChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateDescription(value)
  }

  const handleDescriptionBlur = () => {
    setModalStateByKey(null)
  }

  const handleCommentsUpdated = () => {
    setModalStateByKey(MODAL_NAME.EDIT_COMMENT)
    onUpdateComment(comments)
  }

  const handleCommentsChange = ({ currentTarget: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateComment(value)
  }

  const handleCommentsBlur = () => {
    setModalStateByKey(null)
  }

  const handleOpenRemoveCard = () => {
    setModalStateByKey(MODAL_NAME.REMOVE_CARD)
  }

  const handleCloseRemoveCard = () => {
    setModalStateByKey(null)
  }

  const handleRemoveCard = () => {
    setModalStateByKey(null)
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
          <Flex gap='5' wrap='wrap' w='300'>
            {isLoading ? (
              <Skeleton width={50} height={30} />
            ) : (
              labels.map((label) => (
                <Paper maw='100' mah='30' p='2' radius='4' bg={label.label} key={label.key}>
                  <Text p='2' size='xs'>
                    {label.name}
                  </Text>
                </Paper>
              ))
            )}
          </Flex>

          {isLoading ? (
            <>
              <Skeleton height={30} mb='10' mt='10' />
              <Skeleton width={100} height={24} />
            </>
          ) : validDate ? (
            <>
              <Title c='backgrounds.8' order={6} mb='10' mt='10'>
                Due date
              </Title>
              <Flex align='center' gap='5'>
                <Checkbox checked={checked} onChange={onChecked} />
                <Paper bg='backgrounds.5' pt='2' pb='2' pl='10' pr='10'>
                  <Flex align='center' justify='space-between' gap='10'>
                    <Title c='backgrounds.8' order={6} fw='600'>
                      {formatDate(startDate)} - {formatDate(dueDate)}
                    </Title>

                    {(checked || checkDateOverdue) && (
                      <Badge
                        radius='xs'
                        color={checked ? 'green' : checkDateOverdue ? 'red' : 'green'}
                        tt='capitalize'
                      >
                        {checked ? 'complete' : checkDateOverdue ? 'overdue' : ''}
                      </Badge>
                    )}
                  </Flex>
                </Paper>
              </Flex>
            </>
          ) : null}
        </Flex>
        <Paper>
          <Title c='backgrounds.8' order={6} mb='10'>
            Description
          </Title>
          {isLoading ? (
            <Skeleton height={100} mb='sm' />
          ) : isEditDescriptionOpen ? (
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
          ) : isEditCommentOpen ? (
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
          open={isLabelModalOpen}
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
          open={isDateModalOpen}
          onOpen={handleOpenDueDate}
          onClose={handleCloseDueDate}
        >
          <Paper p='12' w='300'>
            {isLoading ? (
              <Skeleton height={40} />
            ) : (
              <>
                <Title ta='center' c='backgrounds.8' order={5} pb='10'>
                  Date
                </Title>
                <DatePicker
                  dateRange={dateRange}
                  onChangeDateRange={onUpdateDueDate}
                  onSave={onSaveDate}
                  onRemove={onRemoveDate}
                />
              </>
            )}
          </Paper>
        </Popover>

        <Modal.Root opened={isRemoveCardModalOpen} onClose={handleCloseRemoveCard} centered>
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              <Flex align='center' justify='space-between' w='100%'>
                <Modal.Title fw='700'>Remove?</Modal.Title>
                <Modal.CloseButton m='0' />
              </Flex>
            </Modal.Header>
            <Modal.Body>
              <Modal.Title ta='center' pb='20'>
                Are you sure to remove this card?
              </Modal.Title>
              <Flex p='12' justify='flex-end' gap='20'>
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
