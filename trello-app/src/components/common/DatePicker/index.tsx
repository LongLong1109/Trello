import { DatePicker } from '@mantine/dates'
import { Flex } from '@mantine/core'
import Button from '../Button'
import Input from '../Input'

interface DatePickerComponentProps {
  value: Date | null
  onChange: (date: Date | null) => void
  formattedDate: string
  onSave: () => void
  onRemove: () => void
}

const DatePickerComponent = ({
  value,
  onChange,
  formattedDate,
  onSave,
  onRemove,
}: DatePickerComponentProps) => {
  return (
    <>
      <DatePicker value={value} onChange={onChange} />
      <Input value={formattedDate} />
      <Flex direction='row' justify='space-between' pt={10}>
        <Button onClick={onSave} disabled={!value} name='Save' />
        <Button onClick={onRemove} disabled={!value} color='red' name='Remove' />
      </Flex>
    </>
  )
}

export default DatePickerComponent
