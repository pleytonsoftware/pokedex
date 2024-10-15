import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import ms from 'ms'

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

import { ErrorBoundary } from './core/components/error-boundary'
import ServerErrorPage from './pages/ServerError'
import { router } from './router'

import '@/index.css'
import '@configs/i18n.config'

const gcTime = ms('24h')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime,
    },
  },
})
const persister = createAsyncStoragePersister({
  storage: window.sessionStorage,
})

document.title = import.meta.env.VITE_APP_TITLE

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <ErrorBoundary fallback={ServerErrorPage}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </PersistQueryClientProvider>
  </StrictMode>,
)
