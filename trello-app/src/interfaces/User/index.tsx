export interface UserLogin {
  email: string
  password: string
}

export interface UserRegister extends UserLogin {
  firstName: string
  lastName: string
}

export interface BaseUserInfo extends UserRegister {
  id: string
}

export interface UserResponse {
  accessToken: string
  user: BaseUserInfo
}

export interface UserAction {
  userAuth: UserResponse | null
  register: (data: UserRegister) => Promise<UserResponse>
  login: (data: UserLogin) => Promise<UserResponse>
  logout: () => Promise<void>
}
