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
        break
      case 1:
        return questionAnswersArr.map((answerChosen, j) => {
          return `Subregion: ${ answerChosen }`
        })
        break
      case 2:
        return questionAnswersArr.map((answerChosen, j) => {
          return `Population: ${ answerChosen }`
        })
        break
      case 3:
        return questionAnswersArr.map((answerChosen, j) => {
          if (answerChosen === "Yes") {
            return "Only Islands"
          } else if (answerChosen === "No") {
            return "No Islands"
          } else {
            return "Islands Ok"
          }
        })

        break
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

        break
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
