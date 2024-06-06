import { useState } from 'react'
import { Outlet } from 'react-router-dom'

// store
import useAuthStore from '@/stores/useAuthStore'

// interface
import { BaseUserInfo } from '@/interfaces/User'

// component
import HeaderComponent from '@/components/Header'

const HomeLayout = () => {
  const [openModal, setOpenModal] = useState(false)
  const [userAuth, logout] = useAuthStore((state) => [state.userAuth, state.logout])
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
      />
      <Outlet />
    </>
  )
}

export default HomeLayout
