// service
import fetchApi from './fetchApis'

// interface
import { UserLogin, UserRegister } from '@/interfaces/User'

const loginRequest = async (data: UserLogin) => {
  const response = await fetchApi.post('/login', data)
  return response.data
}

const registerRequest = async (data: UserRegister) => {
  const response = await fetchApi.post('/register', data)
  return response.data
}

export { loginRequest, registerRequest }
