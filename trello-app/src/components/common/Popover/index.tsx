import { Popover, Paper } from '@mantine/core'
import Button from '../Button/index'

interface PopoverBase {
  open: boolean
  children: React.ReactNode
  name: string
  icon?: React.ReactNode
  onOpen: () => void
  onClose: () => void
}

const PopoverComponent = ({ children, name, icon, open, onOpen, onClose }: PopoverBase) => (
  <Popover opened={open} onClose={onClose}>
    <Popover.Target>
      <Button
        size='md'
        radius='sm'
        justify='flex-start'
        variant='light'
        leftSection={icon}
        name={name}
        onClick={onOpen}
      />
    </Popover.Target>
    <Popover.Dropdown p='0'>
      <Paper shadow='md'>{children}</Paper>
    </Popover.Dropdown>
  </Popover>
)

export default PopoverComponent
