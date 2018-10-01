import {
  UPDATE_ANSWER_CHOICE,
  UPDATE_QUIZ_ANSWERS,
  FORM_SUBMISSION_PENDING,
  RETAKE_QUIZ,
  SUBMIT_FORM
} from "../actions/form.actions"

import initialState from '../questions.json'

export default (state = { questions: initialState, recommendations: [], isLoading: false }, action) => {
  switch (action.type) {
    case FORM_SUBMISSION_PENDING:
      return { ...state, isLoading: true }
      break
    case UPDATE_ANSWER_CHOICE:
      var questionsCopy = [ ...state.questions ]
      const answerChoiceID = action.payload.answerChoiceID
      const questionID = action.payload.questionID

      const updatedQuestionsCopy = questionsCopy.map((question, i) => {
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

      return { questions: updatedQuestionsCopy, recommendations: [] }
      break
    case UPDATE_QUIZ_ANSWERS:
      return { questions: state.questions.questions, recommendations: [] }
      break
    case RETAKE_QUIZ:
      console.log('initialState', initialState)
      return { questions: initialState, recommendations: [] }
      break
    case SUBMIT_FORM:
      return { questions: state, recommendations: action.payload }
      break
    default:
      return state
  }
}
