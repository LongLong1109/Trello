import { Flex } from '@mantine/core'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <Flex display='flex' h='100vh' w='100%' align='center'>
      <Outlet />
    </Flex>
  )
}

export default AuthLayout
