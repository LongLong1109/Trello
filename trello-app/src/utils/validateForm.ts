import { MESSAGES } from '@/constants/message'
import { REGEX_EMAIL, PASSWORD_MIN_LENGTH } from '@/constants/validateFields'

export const validateFirstName = (value: string) => {
  return value === '' ? MESSAGES.firstName : null
}

export const validateLastName = (value: string) => {
  return value === '' ? MESSAGES.lastName : null
}

export const validateEmail = (value: string) => {
  return REGEX_EMAIL.test(value) ? null : MESSAGES.email
}

export const validatePassword = (value: string) => {
  if (value === '') {
    return MESSAGES.passwordRequired
  }
  return value.length >= PASSWORD_MIN_LENGTH ? null : MESSAGES.password
}
