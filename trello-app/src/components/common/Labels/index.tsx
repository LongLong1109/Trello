import { Title, Stack, Flex } from '@mantine/core'
import { CloseButton } from '@mantine/core'
import CheckListComponent, { CheckboxItem } from '../CheckList/index'
import classes from './Lables.module.css'

interface LabelProps {
  onChange: (index: number, checked: boolean) => void
  checkList: CheckboxItem[]
  onClose: () => void
}

const LabelComponent = ({ checkList, onChange, onClose }: LabelProps) => (
  <>
    <Flex className={classes.root} justify='space-between' align='center'>
      <Stack />
      <Title size='h2' c='backgrounds.0' style={{ fontWeight: 'bold' }}>
        Labels
      </Title>
      <CloseButton onClick={onClose} />
    </Flex>
    <CheckListComponent items={checkList} onItemChange={onChange} />
  </>
)

export default LabelComponent
