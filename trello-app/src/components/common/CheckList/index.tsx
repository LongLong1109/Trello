import { Checkbox, Stack } from '@mantine/core'
import classes from './CheckList.module.css'

export interface CheckboxItem {
  label: string
  value: string
  checked: boolean
  key: string
}

interface CheckboxListProps {
  items: CheckboxItem[]
  onItemChange: (index: number, checked: boolean) => void
}

const CheckListComponent = ({ items, onItemChange }: CheckboxListProps) => (
  <>
    {items.map(({ label, value, checked, key }, index) => (
      <Checkbox
        classNames={classes}
        mt='xs'
        ml={33}
        label={<Stack bg={label}></Stack>}
        key={key}
        value={value}
        checked={checked}
        onChange={(event) => onItemChange(index, event.currentTarget.checked)}
      />
    ))}
  </>
)
export default CheckListComponent
