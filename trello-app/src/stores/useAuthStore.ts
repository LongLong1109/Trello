import { createWithEqualityFn } from 'zustand/traditional'
import { persist } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'

// interface
import { UserLogin, UserRegister, UserAction } from '@/interfaces/User'

// service
import { loginRequest, registerRequest } from '@/services/userApis'

const useAuth = createWithEqualityFn(
  persist<UserAction>(
    (set) => ({
      userAuth: null,
      login: async (userData: UserLogin) => {
        const response = await loginRequest(userData)

        set({ userAuth: response })
        return response
      },
      register: async (userData: UserRegister) => {
        const response = await registerRequest(userData)

        set({ userAuth: response })
        return response
      },
      logout: async () => {
        set({ userAuth: null })
      },
    }),
    {
      name: 'user',
    },
  ),
  shallow,
)

export default useAuth
