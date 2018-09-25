import React from 'react'
import PropTypes from 'prop-types'

function Question (props) {
  return (
    <h6 className="question">{ props.content }</h6>
  )
}

Question.propTypes = { content: PropTypes.string.isRequired }

export default Question
