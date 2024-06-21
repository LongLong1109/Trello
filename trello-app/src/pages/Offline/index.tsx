import { Container, Title, Text, Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useNetwork } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { NOTIFICATION_NETWORK } from '@/constants/notification'

const OfflinePage = () => {
  const navigate = useNavigate()
  const { online } = useNetwork()

  const handleRetry = () => {
    if (online) {
      navigate('/')
    } else {
      notifications.show(NOTIFICATION_NETWORK)
    }
  }

  return (
    <Container ta='center' mt='50'>
      <Title order={1}>You are offline</Title>
      <Text size='lg' mt='md'>
        Please check your internet connection and try again.
      </Text>
      <Button mt='lg' onClick={handleRetry}>
        Retry
      </Button>
    </Container>
  )
}

export default OfflinePage
