import { useForm } from '@mantine/form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Container, Paper, Button, TextInput, Group, Text } from '@mantine/core'

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

  const handleLogin = async (data: UserLogin) => {
    await login(data)
    navigate(`/${ENDPOINTS.HOME}`)
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
    <Container maw={400}>
      <Paper w='100%' p='md' shadow='xs'>
        <form onReset={form.onReset} onSubmit={form.onSubmit(handleLogin)}>
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
            <Button type='submit' className='submit' disabled={!form.isValid()}>
              Sign in
            </Button>

            <Text>
              Don&apos;t have an account?{' '}
              <Link style={{ color: 'backgrounds.2' }} to={`/${ENDPOINTS.REGISTER}`}>
                SignUp now
              </Link>
            </Text>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
