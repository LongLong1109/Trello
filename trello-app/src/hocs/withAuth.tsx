// libs
import { ComponentType, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// store
import useAuthStore from '@/stores/useAuthStore'

// constants
import { ENDPOINTS } from '@/constants/endpoint'

const withAuth = (WrappedComponent: ComponentType) => {
  const RequireAuth = () => {
    const userAuth = useAuthStore((state) => state.userAuth)
    const navigate = useNavigate()

    useEffect(() => {
      if (!userAuth) {
        navigate(`/${ENDPOINTS.LOGIN}`)
      }
    }, [navigate, userAuth])

    return <WrappedComponent />
  }

  return RequireAuth
}

export default withAuth
