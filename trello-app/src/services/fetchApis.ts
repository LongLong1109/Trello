import axios from 'axios'

// constant
import { BASE_URL } from '@/constants/baseUrl'

const fetchApi = axios.create({
  baseURL: BASE_URL,
})

export default fetchApi
