import { useTransition } from 'react'
import { useForm } from '@mantine/form'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Paper, Button, TextInput, Flex, Text, Image, Title } from '@mantine/core'

// interface
import { UserLogin } from '@/interfaces/User'

// logo
import Logo from '/trello.svg'

// store
import useAuthStore from '@/stores/useAuthStore'

// constants
import { ENDPOINTS } from '@/constants/endpoint'

// utils
import { validateEmail, validatePassword } from '@/utils/validateForm'

import classes from '../pages.module.css'

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
    <Flex w='100%' bg='backgrounds.1' h='100vh' align='center'>
      <Container miw='450'>
        <Paper w='100%' p='md' shadow='xs'>
          <Flex gap='20' direction='column' align='center' justify='center' w='100%' pb='20'>
            <Image h={40} w={40} src={Logo} />
            <Title c='backgrounds.0' size='24' fw='900' order={2}>
              Sign in to Trello
            </Title>
          </Flex>
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
              <Button className={classes.loader} type='submit' loading={isPending}>
                Sign in
              </Button>

              <Text>
                Don&apos;t have an account?{' '}
                <Link style={{ color: 'backgrounds.2' }} to={`/${ENDPOINTS.REGISTER}`}>
                  Sign up now!
                </Link>
              </Text>
            </Flex>
          </form>
        </Paper>
      </Container>
    </Flex>
  )
}

export default Login
