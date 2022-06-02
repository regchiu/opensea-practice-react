import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Card.css'

function Card({ className, cover, body, action }) {
  return (
    <div className={classNames('card', { [className]: className })}>
      <div className="card__cover">{cover}</div>
      <div className="card__body">{body}</div>
      <footer className="card__action">{action}</footer>
    </div>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  cover: PropTypes.element,
  body: PropTypes.element,
  action: PropTypes.element,
}

export default Card
