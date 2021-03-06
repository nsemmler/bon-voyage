import {
  UPDATE_ANSWER_CHOICE,
  UPDATE_QUIZ_ANSWERS,
  FORM_SUBMISSION_PENDING,
  RETAKE_QUIZ,
  SUBMIT_FORM,
  GET_USER_FAVORITES,
  ADD_COUNTRY_TO_FAVORITES,
  REMOVE_COUNTRY_FROM_FAVORITES,
  CLEAR_USER_FAVORITES
} from "../actions/form.actions"

import initialState from '../questions.json'

export default (state = { questions: initialState, recommendations: [], pois: [], favorites: { countries: [], pois: [] }, isLoading: false }, action) => {
  switch (action.type) {
    case GET_USER_FAVORITES:
      return { ...state, favorites: { countries: action.payload.countries, pois: action.payload.pois } }
    case CLEAR_USER_FAVORITES:
      return { ...state, favorites: { countries: [], pois: [] } }
    case ADD_COUNTRY_TO_FAVORITES:
      return { ...state }
    case REMOVE_COUNTRY_FROM_FAVORITES:
      return { ...state }
    case FORM_SUBMISSION_PENDING:
      return { ...state, recommendations: [], pois: [], favorites: state.favorites, isLoading: true }
    case UPDATE_ANSWER_CHOICE:
      var questionsCopy = [ ...state.questions ]
      const answerChoiceID = action.payload.answerChoiceID
      const questionID = action.payload.questionID

      const updatedQuestionsCopy = questionsCopy.map((question, i) => {
        if (i === questionID) {
          var updatedAnswerChoices = question.answer_choices.map(ansr_choice => {
            if (ansr_choice.id === answerChoiceID) {
              if (questionID > 2) {
                return { ...ansr_choice, checked: true }
              } else {
                return { ...ansr_choice, checked: !ansr_choice.checked }
              }
            } else {
              if (questionID > 2) {
                return { ...ansr_choice, checked: false }
              } else {
                return ansr_choice
              }
            }
          })
          return { ...question, answer_choices: updatedAnswerChoices }
        } else {
          return question
        }
      })

      return { questions: updatedQuestionsCopy, recommendations: [], pois: [], favorites: state.favorites, isLoading: false }
    case UPDATE_QUIZ_ANSWERS:
      return { questions: state.questions, recommendations: [], pois: [], favorites: state.favorites, isLoading: false }
    case RETAKE_QUIZ:
      return { questions: initialState, recommendations: [], pois: [], favorites: state.favorites, isLoading: false }
    case SUBMIT_FORM:
      return { ...state, recommendations: action.payload.countries, pois: action.payload.pois, favorites: state.favorites, isLoading: false }
    default:
      return state
  }
}
