import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mantine/core'
// store
import useAuthStore from '@/stores/useAuthStore'

// interface
import { BaseUserInfo } from '@/interfaces/User'

//store
import useThemeStore from '@/stores/useThemeStore'
// component
import HeaderComponent from '@/components/Header'

const HomeLayout = () => {
  const [openModal, setOpenModal] = useState(false)
  const [isOpenSignOut, setIsOpenSignOut] = useState(false)

  const [userAuth, logout] = useAuthStore((state) => [state.userAuth, state.logout])
  const [checked, setChecked] = useThemeStore((state) => [state.checked, state.setChecked])
  const user = userAuth?.user ?? ({} as BaseUserInfo)
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  return (
    <>
      <HeaderComponent
        open={openModal}
        user={user}
        onClose={handleCloseModal}
        onLogout={logout}
        onOpen={handleOpenModal}
        checked={checked}
        onChecked={setChecked}
        isOpenSignOut={isOpenSignOut}
        onConfirmSignOut={setIsOpenSignOut}
      />
      <Box
        bg={
          checked
            ? 'linear-gradient(135deg, rgb(74, 90, 117) 0%, rgb(0 0 0) 100%)'
            : 'linear-gradient(135deg, rgb(74, 90, 117) 0%, rgb(255 255 255) 100%)'
        }
        h={`calc(100vh - 50px)`}
        w='100%'
        p='20'
      >
        <Outlet />
      </Box>
    </>
  )
}

export default HomeLayout
