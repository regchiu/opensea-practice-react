import PropTypes from 'prop-types'
import usePagination from './usePagination'
import classNames from 'classnames'
import './Pagination.css'

function Pagination({ className, totalCount, currentPage, pageSize, onPageChange }) {
  const paginationRange = usePagination({ totalCount, pageSize })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  function onNext() {
    onPageChange(currentPage + 1)
  }

  function onPrevious() {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul className={classNames('pagination', { [className]: className })}>
      <li className={classNames('arrow', { disabled: currentPage === 1 })} onClick={onPrevious}>
        &lt;
      </li>
      {paginationRange.map((pageNumber) => (
        <li
          key={pageNumber}
          className={classNames({ active: pageNumber === currentPage })}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </li>
      ))}
      <li className={classNames('arrow', { disabled: currentPage === lastPage })} onClick={onNext}>
        &gt;
      </li>
    </ul>
  )
}

Pagination.propTypes = {
  className: PropTypes.string,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func,
}

export default Pagination
