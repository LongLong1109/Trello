import { useTransition } from 'react'
import { useForm } from '@mantine/form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Container, Paper, Button, TextInput, Flex, Text } from '@mantine/core'

// interface
import { UserLogin } from '@/interfaces/User'

// store
import useAuthStore from '@/stores/useAuthStore'

// constants
import { ENDPOINTS } from '@/constants/endpoint'

// utils
import { validateEmail, validatePassword } from '@/utils/validateForm'

const Login = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const [isPending, startTransition] = useTransition()

  const handleLogin = async (data: UserLogin) => {
    startTransition(async () => {
      await login(data)
      navigate(`/${ENDPOINTS.HOME}`)
    })
  }

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: validateEmail,
      password: validatePassword,
    },
  })

  return (
    <Container miw='450'>
      <Paper w='100%' p='md' shadow='xs'>
        <form onReset={form.onReset} onSubmit={form.onSubmit(handleLogin)}>
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
              Sign in
            </Button>

            <Text>
              Don&apos;t have an account?{' '}
              <Link style={{ color: 'backgrounds.2' }} to={`/${ENDPOINTS.REGISTER}`}>
                SignUp now
              </Link>
            </Text>
          </Flex>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
