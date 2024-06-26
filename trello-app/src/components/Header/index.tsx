import { ChangeEvent } from 'react'
import {
  Stack,
  Title,
  Menu,
  Avatar,
  Paper,
  Text,
  Group,
  Flex,
  Switch,
  rem,
  Modal,
} from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons-react'
import classes from './Header.module.css'

// interface
import { BaseUserInfo } from '@/interfaces/User'

// component
import { Button } from '@/components/common'

interface HeaderProps {
  open: boolean
  user: BaseUserInfo
  checked: boolean
  onChecked: (checked: boolean) => void
  isOpenSignOut: boolean
  onConfirmSignOut: (value: boolean) => void
  onOpen: () => void
  onClose: () => void
  onLogout: () => void
}

const HeaderComponent = ({
  open,
  checked,
  onChecked,
  onOpen,
  isOpenSignOut,
  onConfirmSignOut,
  onClose,
  user,
  onLogout,
}: HeaderProps) => {
  const sunIcon = <IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} />

  const moonIcon = <IconMoonStars style={{ width: rem(16), height: rem(16) }} stroke={2.5} />
  const { firstName, lastName, email } = user
  const userName = lastName + ' ' + firstName

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    onChecked(e.currentTarget.checked)
  }

  const handleOpenSignOut = () => {
    onConfirmSignOut(true)
  }

  const handleCloseSignOut = () => {
    onClose()
    onConfirmSignOut(false)
  }

  const handleCloseModal = () => {
    !isOpenSignOut && onClose()
  }

  return (
    <Stack classNames={classes}>
      <Title size='h1'>Trello</Title>
      <Stack maw='300'>
        <Switch
          color='dark.4'
          checked={checked}
          onChange={handleChecked}
          onLabel={sunIcon}
          offLabel={moonIcon}
        />
        <Menu opened={open} onClose={handleCloseModal}>
          <Menu.Target>
            <Group onClick={onOpen} style={{ cursor: 'pointer' }}>
              <Avatar radius='xl' />

              <Flex direction='column'>
                <Text tt='capitalize' c='white' size='sm' fw={500}>
                  {userName}
                </Text>

                <Text c='white' size='xs'>
                  {email}
                </Text>
              </Flex>
            </Group>
          </Menu.Target>

          <Menu.Dropdown p='0'>
            <Paper shadow='md' p='10' miw={200}>
              <Menu.Label tt='capitalize' c='backgrounds.0'>
                Hello, {userName}
              </Menu.Label>
              <Menu.Divider />
              <Button
                bg='transparent'
                variant='light'
                name='Sign out'
                onClick={handleOpenSignOut}
              />
            </Paper>
          </Menu.Dropdown>

          <Modal.Root opened={isOpenSignOut} onClose={handleCloseSignOut} centered>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <Modal.Title fw='700'>Sign Out?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Modal.Title ta='center' pb='20'>
                  Are you sure to sign out of the app?
                </Modal.Title>
                <Flex p='12' justify='flex-end' gap='20'>
                  <Button variant='light' onClick={handleCloseSignOut} name='Cancel' />
                  <Button color='blue' onClick={onLogout} name='Sign Out' />
                </Flex>
              </Modal.Body>
            </Modal.Content>
          </Modal.Root>
        </Menu>
      </Stack>
    </Stack>
  )
}

export default HeaderComponent
