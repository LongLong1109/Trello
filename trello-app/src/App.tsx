import { Suspense } from 'react'
import { LoadingOverlay } from '@mantine/core'
import { Route, Routes } from 'react-router-dom'

// layouts
import AuthLayout from '@/layouts/AuthLayout'
import HomeLayout from './layouts/HomeLayout'

// constants
import { ENDPOINTS } from '@/constants/endpoint'

// pages
import { HomePage, LoginPage, RegisterPage } from '@/pages/index'

// component
import ErrorBoundary from '@/components/ErrorBoundary'

const App = () => {
  return (
    <Suspense
      fallback={<LoadingOverlay visible zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />}
    >
      <Routes>
        <Route element={<HomeLayout />}>
          <Route
            path={`/${ENDPOINTS.HOME}`}
            element={
              <ErrorBoundary>
                <HomePage />
              </ErrorBoundary>
            }
          />
          <Route
            index
            element={
              <ErrorBoundary>
                <HomePage />
              </ErrorBoundary>
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path={`/${ENDPOINTS.LOGIN}`}
            element={
              <ErrorBoundary>
                <LoginPage />
              </ErrorBoundary>
            }
          />
          <Route
            path={`/${ENDPOINTS.REGISTER}`}
            element={
              <ErrorBoundary>
                <RegisterPage />
              </ErrorBoundary>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
