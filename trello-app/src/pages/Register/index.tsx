import { useTransition } from 'react'
import { useForm } from '@mantine/form'
import { Container, Paper, Button, TextInput, Flex, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

// interface
import { UserRegister } from '@/interfaces/User'

// store
import useAuthStore from '@/stores/useAuthStore'

// constants
import { ENDPOINTS } from '@/constants/endpoint'

// utils
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
} from '@/utils/validateForm'

const RegisterForm = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
  const form = useForm({
    initialValues: initialValues,
    validate: {
      firstName: validateFirstName,
      lastName: validateLastName,
      email: validateEmail,
      password: validatePassword,
    },
  })

  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)

  const [isPending, startTransition] = useTransition()

  const handleRegister = (data: UserRegister) => {
    startTransition(async () => {
      await register(data)
      navigate(`/${ENDPOINTS.HOME}`)
    })
  }

  return (
    <Container miw='450'>
      <Paper w='100%' p='md' shadow='md'>
        <form onReset={form.onReset} onSubmit={form.onSubmit(handleRegister)}>
          <TextInput
            withAsterisk
            label='First Name'
            placeholder='Your First Name'
            error={form.errors.firstName}
            mb='lg'
            {...form.getInputProps('firstName')}
          />

          <TextInput
            withAsterisk
            label='Last Name'
            placeholder='Your Last Name'
            error={form.errors.lastName}
            mb='lg'
            {...form.getInputProps('lastName')}
          />

          <TextInput
            withAsterisk
            type='email'
            label='Email'
            placeholder='your@email.com'
            error={form.errors.email}
            mb='lg'
            {...form.getInputProps('email')}
          />

          <TextInput
            withAsterisk
            type='password'
            label='Password'
            placeholder='Password'
            error={form.errors.password}
            mb='lg'
            {...form.getInputProps('password')}
          />

          <Flex pt='lg' direction='column' gap='10'>
            <Button type='submit' loading={isPending}>
              Sign up
            </Button>

            <Text>
              Already have an account?{' '}
              <Link style={{ color: 'backgrounds.2' }} to={`/${ENDPOINTS.LOGIN}`}>
                Sign in
              </Link>
            </Text>
          </Flex>
        </form>
      </Paper>
    </Container>
  )
}

export default RegisterForm
