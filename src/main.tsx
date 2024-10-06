import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ErrorBoundary } from './core/components/error-boundary'
import ServerErrorPage from './pages/ServerError'

import '@/index.css'
import '@configs/i18n.config'

import { router } from './router'

const queryClient = new QueryClient()

document.title = import.meta.env.VITE_APP_TITLE

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={ServerErrorPage}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)
