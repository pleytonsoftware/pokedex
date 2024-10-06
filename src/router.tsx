/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import App from './App'
import NotFoundPage from './pages/NotFound'
import PokemonListPage from './pages/PokemonList'
import ServerErrorPage from './pages/ServerError'

const PokemonDetailsPage = lazy(() => import('./pages/PokemonDetails'))

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<PokemonListPage />} />
      <Route
        path='/pokemon/:id'
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <PokemonDetailsPage />
          </Suspense>
        }
      />
      <Route path='*' element={<NotFoundPage />} />
      {import.meta.env.MODE === 'development' && <Route path='/server-error' element={<ServerErrorPage />} />}
    </Route>,
  ),
)
