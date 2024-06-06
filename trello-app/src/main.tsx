import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { notifications } from '@mantine/notifications'

import ThemeProvider from './themes'

import { API_GC_TIME, API_STALE_TIME } from '@/constants/api'
import { NOTIFICATION_ERROR_QUERY } from '@/constants/notification'
import { DELAY_TIME } from '@/constants/delayTime'

import { retryDelay } from '@/utils/retryDelay'

import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: API_STALE_TIME,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      gcTime: API_GC_TIME,
      retry: DELAY_TIME,
      retryDelay,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      notifications.show(NOTIFICATION_ERROR_QUERY)
    },
  }),
})

const rootElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>,
  )
} else {
  throw new Error('Root element not found')
}
