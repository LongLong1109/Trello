import { useTransition } from 'react'
import { useForm } from '@mantine/form'
import { Container, Paper, Button, TextInput, Group, Text } from '@mantine/core'
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
    <Container maw={400}>
      <Paper w='100%' p='md' shadow='xs'>
        <form onReset={form.onReset} onSubmit={form.onSubmit(handleRegister)}>
          <TextInput
            withAsterisk
            label='First Name'
            placeholder='Your First Name'
            error={form.errors.firstName}
            {...form.getInputProps('firstName')}
          />

          <TextInput
            withAsterisk
            label='Last Name'
            placeholder='Your Last Name'
            error={form.errors.lastName}
            {...form.getInputProps('lastName')}
          />

          <TextInput
            withAsterisk
            type='email'
            label='Email'
            placeholder='your@email.com'
            error={form.errors.email}
            {...form.getInputProps('email')}
          />

          <TextInput
            withAsterisk
            type='password'
            label='Password'
            placeholder='Password'
            error={form.errors.password}
            {...form.getInputProps('password')}
            mt='md'
          />

          <Group mt='md'>
            <Button type='submit' loading={isPending}>
              Create Account
            </Button>

            <Text>
              Already have an account?{' '}
              <Link style={{ color: 'backgrounds.2' }} to={`/${ENDPOINTS.LOGIN}`}>
                Login now
              </Link>
            </Text>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}

export default RegisterForm
