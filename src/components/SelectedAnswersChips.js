import React from 'react'
import PropTypes from 'prop-types'
import { Chip } from 'react-materialize'

function SelectedAnswersChips (props) {
  const updatedChipsArr = props.chipsArr.map((questionAnswersArr, questionIndex) => {
    switch (questionIndex) {
      case 0:
        return questionAnswersArr.map((answerChosen, j) => {
          return `Region: ${ answerChosen }`
        })
      case 1:
        return questionAnswersArr.map((answerChosen, j) => {
          return `Subregion: ${ answerChosen }`
        })
      case 2:
        return questionAnswersArr.map((answerChosen, j) => {
          return `Population: ${ answerChosen }`
        })
      case 3:
        return questionAnswersArr.map((answerChosen, j) => {
          if (answerChosen === "Yes") {
            return "Islands: Only"
          } else if (answerChosen === "No") {
            return "Islands: None"
          } else {
            return "Islands: Allowed"
          }
        })
      case 4:
        return questionAnswersArr.map((answerChosen, j) => {
          if (answerChosen === "Yes") {
            return "Language: English"
          } else if (answerChosen === "No") {
            return "Language: Native"
          } else {
            return "Language: Any"
          }
        })
      default:
        return "default"
    }
  })

  return (
    <div className="answerChoicesChips">
      {
        updatedChipsArr.flat().map(chipText => {
          return <Chip>{ chipText }</Chip>
        })
      }
    </div>
  )
}

SelectedAnswersChips.propTypes = {
  chipsArr: PropTypes.array.isRequired
}

export default SelectedAnswersChips
