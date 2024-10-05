import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'
import { ErrorBoundary } from './core/components/error-boundary.tsx'
import NotFoundPage from './pages/NotFound.tsx'
import { PokemonListPage } from './pages/PokemonList.tsx'
import ServerErrorPage from './pages/ServerError.tsx'

import '@/index.css'
import '@configs/i18n.config'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<PokemonListPage />} />
      <Route path='*' element={<NotFoundPage />} />
      {import.meta.env.MODE === 'development' && <Route path='/server-error' element={<ServerErrorPage />} />}
    </Route>,
  ),
)
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
