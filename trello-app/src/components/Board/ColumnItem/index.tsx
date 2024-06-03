import { useCallback } from 'react'
import { Flex, Card, CloseButton } from '@mantine/core'

// components
import { Input, Button } from '@/components/common'

interface ColumnItemProps {
  listName: string
  onAddList: (listName: string) => void
  onIsAddingList: (isAdding: boolean) => void
  onListName: (listName: string) => void
}

const ColumnItem = ({ onAddList, onIsAddingList, listName, onListName }: ColumnItemProps) => {
  const handleAddList = useCallback(() => {
    if (listName.trim()) {
      onAddList(listName)
      onListName('')
      onIsAddingList(false)
    }
  }, [listName, onAddList, onIsAddingList, onListName])

  const handleCloseAddingList = () => {
    onIsAddingList(false)
  }

  return (
    <Card shadow='md' w='270' radius='md'>
      <Flex direction='column' gap='sm'>
        <Input
          variant='primary'
          placeholder='Enter list title...'
          value={listName}
          onChange={({ currentTarget: { value } }) => onListName(value)}
        />
        <Flex direction='row' gap='sm' align='center'>
          <Button onClick={handleAddList} name='Add List' />

          <CloseButton onClick={handleCloseAddingList} />
        </Flex>
      </Flex>
    </Card>
  )
}

export default ColumnItem
