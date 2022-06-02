import { useMemo } from 'react'

function usePagination({ totalCount, pageSize }) {
  return useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)

    const totalPageNumbers = 6

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }
  }, [totalCount, pageSize])
}

function range(start, end) {
  let length = end - start + 1
  return Array.from({ length }, (_, index) => index + start)
}

export default usePagination
