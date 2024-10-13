import { type FC, type PropsWithChildren, createContext } from 'react'

import { type UsePaginationReturn, usePagination } from '../hooks/pagination'

export interface PaginationContextProps {
  currentPage: number
  pageSize: number
  offset: number
  nextPage: () => void
  previousPage: () => void
  setPage: (page: number) => void
  resetPagination: () => void
}

export const PaginationContext = createContext<PaginationContextProps | undefined>(undefined)

type PaginationProviderProps = PropsWithChildren & {
  initialPage?: number
  pageSize: number
}
type PaginationProviderWithValueProps = PropsWithChildren & {
  pagination: UsePaginationReturn
}

export const PaginationProvider: FC<PaginationProviderProps> = ({ initialPage, pageSize, children }) => {
  const pagination = usePagination({ initialPage, pageSize })

  return <PaginationContext.Provider value={pagination}>{children}</PaginationContext.Provider>
}

export const PaginationProviderWithValue: FC<PaginationProviderWithValueProps> = ({ pagination, children }) => (
  <PaginationContext.Provider value={pagination}>{children}</PaginationContext.Provider>
)
