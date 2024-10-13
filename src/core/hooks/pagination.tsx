import { useState } from 'react'

interface UsePaginationProps {
  initialPage?: number
  pageSize: number
}

export interface UsePaginationReturn {
  currentPage: number
  pageSize: number
  offset: number
  nextPage: () => void
  previousPage: () => void
  setPage: (page: number) => void
  resetPagination: () => void
}

export const usePagination = ({ initialPage = 1, pageSize }: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const offset = (currentPage - 1) * pageSize

  const nextPage = () => setCurrentPage((prev) => prev + 1)
  const previousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const setPage = (page: number) => setCurrentPage(page)
  const resetPagination = () => setCurrentPage(initialPage)

  return {
    currentPage,
    pageSize,
    offset,
    nextPage,
    previousPage,
    setPage,
    resetPagination,
  }
}
