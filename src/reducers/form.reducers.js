import {
  UPDATE_ANSWER_CHOICE,
  SUBMIT_FORM
} from "../actions/form.actions"

import initialState from '../questions.json'

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ANSWER_CHOICE:
      var stateCopy = [ ...state ]
      const answerChoiceID = action.payload.answerChoiceID
      const questionID = action.payload.questionID

      const updatedStateCopy = stateCopy.map((question, i) => {
        if (i === questionID) {
          var updatedAnswerChoices = question.answer_choices.map(ansr_choice => {
            if (ansr_choice.id === answerChoiceID) {
              return { ...ansr_choice, checked: !ansr_choice.checked }
            } else {
              return ansr_choice
            }
          })
          return { ...question, answer_choices: updatedAnswerChoices }
        } else {
          return question
        }
      })

      return updatedStateCopy
    case SUBMIT_FORM:
      return { recommendations: action.payload }
    default:
      return state
  }
}
