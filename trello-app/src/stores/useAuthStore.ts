import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// interface
import { UserLogin, UserRegister, UserAction } from '@/interfaces/User'

// service
import { loginRequest, registerRequest } from '@/services/userApis'

const useAuthStore = create(
  persist<UserAction>(
    (set) => ({
      userAuth: null,
      login: async (data: UserLogin) => {
        const response = await loginRequest(data)

        set({ userAuth: response })
        return response
      },
      register: async (data: UserRegister) => {
        const response = await registerRequest(data)

        set({ userAuth: response })
        return response
      },
      logout: async () => {
        localStorage.clear()
        set({ userAuth: null })
      },
    }),
    {
      name: 'user',
    },
  ),
)

export default useAuthStore
