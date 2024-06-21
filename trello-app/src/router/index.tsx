import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// layouts
import AuthLayout from '@/layouts/AuthLayout'
import HomeLayout from '@/layouts/HomeLayout'

// constants
import { PAGE_URLS } from '@/constants/pageUrls'

// pages
import { HomePage, LoginPage, RegisterPage } from '@/pages/index'
import OfflinePage from '@/pages/Offline'

// component
import ErrorBoundary from '@/components/ErrorBoundary'

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      element: <HomeLayout />,
      children: [
        {
          path: PAGE_URLS.HOME,
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
          path: PAGE_URLS.LOGIN,
          element: (
            <ErrorBoundary>
              <LoginPage />
            </ErrorBoundary>
          ),
        },
        {
          path: PAGE_URLS.REGISTER,
          element: (
            <ErrorBoundary>
              <RegisterPage />
            </ErrorBoundary>
          ),
        },
      ],
    },
    {
      element: <OfflinePage />,
      path: PAGE_URLS.OFF_LINE,
    },
  ])

  return <RouterProvider router={router} />
}

export default AppRoutes
