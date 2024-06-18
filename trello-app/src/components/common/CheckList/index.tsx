import { Checkbox, Text, Flex, Tooltip } from '@mantine/core'
import classes from './CheckList.module.css'

export interface CheckboxItem {
  label: string
  value: string
  checked: boolean
  key: string
  name: string
}

interface CheckboxListProps {
  items: CheckboxItem[]
  onItemChange: (index: number, checked: boolean) => void
}

const CheckListComponent = ({ items, onItemChange }: CheckboxListProps) => (
  <Flex gap='10' w='100%' align='center' justify='space-between' direction='column'>
    {items.map(({ label, value, checked, key, name }, index) => (
      <Flex key={key}>
        <Checkbox
          classNames={classes}
          label={
            <Flex bg={label} align='center' p='10'>
              <Tooltip label=''>
                <Text size='sm' truncate='end'>
                  {name}
                </Text>
              </Tooltip>
            </Flex>
          }
          key={key}
          value={value}
          checked={checked}
          onChange={(event) => onItemChange(index, event.currentTarget.checked)}
        />
      </Flex>
    ))}
  </Flex>
)
export default CheckListComponent
