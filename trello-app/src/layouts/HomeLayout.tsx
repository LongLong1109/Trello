import { useState } from 'react'
import { Outlet } from 'react-router-dom'

// store
import useAuthStore from '@/stores/useAuthStore'

// component
import HeaderComponent from '@/components/Header'

const HomeLayout = () => {
  const [openModal, setOpenModal] = useState(false)
  const [userAuth, logout] = useAuthStore((state) => [state.userAuth, state.logout])
  const userName = userAuth?.user.firstName || ''
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
        userName={userName}
        onClose={handleCloseModal}
        onLogout={logout}
        onOpen={handleOpenModal}
      />
      <Outlet />
    </>
  )
}

export default HomeLayout
