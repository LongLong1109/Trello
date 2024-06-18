import { CheckboxItem } from '@/components/common'
import { randomId } from '@mantine/hooks'

export const INITIAL_CHECKBOX_VALUES: CheckboxItem[] = [
  { label: 'labels.0', value: 'green', checked: false, key: randomId(), name: 'Front-End' },
  { label: 'labels.1', value: 'yellow', checked: false, key: randomId(), name: 'Back-End' },
  { label: 'labels.2', value: 'orange', checked: false, key: randomId(), name: 'Ui component' },
  { label: 'labels.3', value: 'red', checked: false, key: randomId(), name: 'Feature' },
  { label: 'labels.4', value: 'purple', checked: false, key: randomId(), name: 'Page' },
  { label: 'labels.5', value: 'blue', checked: false, key: randomId(), name: 'Test' },
]
