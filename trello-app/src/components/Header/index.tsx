import { Stack, Title, Popover, Avatar, Paper, Text } from '@mantine/core'
import classes from './Header.module.css'
import { Button } from '@/components/common'

interface HeaderProps {
  open: boolean
  userName: string
  onOpen: () => void
  onClose: () => void
  onLogout: () => void
}

const HeaderComponent = ({ open, onOpen, onClose, userName, onLogout }: HeaderProps) => {
  return (
    <Stack classNames={classes}>
      <Title size='h1'>Trello</Title>
      <Popover opened={open} onClose={onClose}>
        <Popover.Target>
          <Avatar onClick={onOpen} />
        </Popover.Target>

        <Popover.Dropdown p='0'>
          <Paper shadow='md' p='10' miw={200}>
            <Text fw={500} fs='bold' size='h2' pb={20}>
              Hello, {userName}
            </Text>
            <Button name='Logout' onClick={onLogout} />
          </Paper>
        </Popover.Dropdown>
      </Popover>
    </Stack>
  )
}

export default HeaderComponent
