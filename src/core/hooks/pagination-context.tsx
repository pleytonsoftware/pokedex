import { useContext } from 'react'

import { PaginationContext, PaginationContextProps } from '../context/pagination.context'

export const usePaginationContext = (): PaginationContextProps => {
  const context = useContext(PaginationContext)
  if (!context) {
    throw new Error('usePaginationContext must be used within a PaginationProvider')
  }
  return context
}
