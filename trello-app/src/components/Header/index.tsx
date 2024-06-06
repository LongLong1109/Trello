import { Stack, Title, Menu, Avatar, Paper, Text, Group, Flex } from '@mantine/core'
import classes from './Header.module.css'

// constants
import { menuList } from '@/constants/menuList'

// interface
import { BaseUserInfo } from '@/interfaces/User'

// component
import { Button } from '@/components/common'

interface HeaderProps {
  open: boolean
  user: BaseUserInfo
  onOpen: () => void
  onClose: () => void
  onLogout: () => void
}

const HeaderComponent = ({ open, onOpen, onClose, user, onLogout }: HeaderProps) => {
  const { firstName, lastName, email } = user
  const userName = lastName + ' ' + firstName

  return (
    <Stack classNames={classes}>
      <Title size='h1'>Trello</Title>
      <Menu opened={open} onClose={onClose}>
        <Menu.Target>
          <Group onClick={onOpen} style={{ cursor: 'pointer' }}>
            <Avatar radius='xl' />

            <Flex direction='column'>
              <Text tt='capitalize' c='dimmed' size='sm' fw={500}>
                {userName}
              </Text>

              <Text c='dimmed' size='xs'>
                {email}
              </Text>
            </Flex>
          </Group>
        </Menu.Target>

        <Menu.Dropdown p='0'>
          <Paper shadow='md' p='10' miw={200}>
            <Menu.Label tt='capitalize'>{userName}</Menu.Label>
            {menuList.map((item, index) => (
              <Menu.Item key={index} leftSection={item.icon}>
                {item.label}
              </Menu.Item>
            ))}
            <Menu.Divider />
            <Button bg='transparent' variant='light' name='Sign out' onClick={onLogout} />
          </Paper>
        </Menu.Dropdown>
      </Menu>
    </Stack>
  )
}

export default HeaderComponent
