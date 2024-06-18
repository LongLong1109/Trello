import { DatePicker, DatesRangeValue } from '@mantine/dates'
import { Flex, Title, TextInput } from '@mantine/core'
import Button from '../Button'

// utils
import { convertDateToString } from '@/utils/validateDate'

// constants
import { TODAY, NEXT_DAY } from '@/constants/dateTime'

interface DatePickerComponentProps {
  dateRange: DatesRangeValue
  onChangeDateRange: (value: DatesRangeValue) => void
  onSave: () => void
  onRemove: () => void
}

const DatePickerComponent = ({
  dateRange,
  onChangeDateRange,
  onSave,
  onRemove,
}: DatePickerComponentProps) => {
  const [firstValue, secondValue] = dateRange
  const startDate = firstValue ?? TODAY
  const dueDate = secondValue ?? NEXT_DAY

  const validDate = startDate && dueDate

  return (
    <>
      <DatePicker
        type='range'
        allowSingleDateInRange
        value={dateRange}
        onChange={onChangeDateRange}
      />

      <Title c='backgrounds.8' order={6} pb='5' pt='10'>
        Start Date
      </Title>
      <TextInput value={convertDateToString(startDate)} readOnly />

      <Title c='backgrounds.8' order={6} pb='5'>
        Due date
      </Title>
      <TextInput value={convertDateToString(dueDate)} readOnly />

      <Flex direction='row' justify='flex-end' gap='10' pt={10}>
        <Button
          variant={dateRange ? 'light' : ''}
          onClick={onRemove}
          disabled={!dateRange}
          name='Remove'
        />
        <Button onClick={onSave} disabled={!validDate} name='Save' />
      </Flex>
    </>
  )
}

export default DatePickerComponent
