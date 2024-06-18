// service
import fetchApi from './fetchApis'

// interface
import { UserLogin, UserRegister } from '@/interfaces/User'

const loginRequest = async (userData: UserLogin) => {
  const response = await fetchApi.post('/login', userData)
  return response.data
}

const registerRequest = async (userData: UserRegister) => {
  const response = await fetchApi.post('/register', userData)
  return response.data
}

export { loginRequest, registerRequest }
