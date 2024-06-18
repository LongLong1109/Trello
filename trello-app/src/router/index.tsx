import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// layouts
import AuthLayout from '@/layouts/AuthLayout'
import HomeLayout from '@/layouts/HomeLayout'

// constants
import { ENDPOINTS } from '@/constants/endpoint'

// pages
import { HomePage, LoginPage, RegisterPage } from '@/pages/index'

// component
import ErrorBoundary from '@/components/ErrorBoundary'

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      element: <HomeLayout />,
      children: [
        {
          path: `/${ENDPOINTS.HOME}`,
          element: (
            <ErrorBoundary>
              <HomePage />
            </ErrorBoundary>
          ),
        },
        {
          index: true,
          element: (
            <ErrorBoundary>
              <HomePage />
            </ErrorBoundary>
          ),
        },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: `/${ENDPOINTS.LOGIN}`,
          element: (
            <ErrorBoundary>
              <LoginPage />
            </ErrorBoundary>
          ),
        },
        {
          path: `/${ENDPOINTS.REGISTER}`,
          element: (
            <ErrorBoundary>
              <RegisterPage />
            </ErrorBoundary>
          ),
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default AppRoutes
