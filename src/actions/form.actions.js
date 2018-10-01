import axios from 'axios'

export const FORM_SUBMISSION_PENDING = "FORM_SUBMISSION_PENDING"
export const SUBMIT_FORM = "SUBMIT_FORM"
export const RETAKE_QUIZ = "RETAKE_QUIZ"
export const UPDATE_QUIZ_ANSWERS = "UPDATE_QUIZ_ANSWERS"
export const UPDATE_ANSWER_CHOICE = "UPDATE_ANSWER_CHOICE"
export const FAILED_SUBMISSION = "FAILED_SUBMISSION"

const BASE_URL = "http://localhost:3000"

window.axios = axios

export const selectAnswerChoice = (questionID, answerChoiceID) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_ANSWER_CHOICE, payload: { questionID, answerChoiceID } })
  }
}

export const updateQuizAnswers = () => {
  return (dispatch) => {
    dispatch({ type: UPDATE_QUIZ_ANSWERS })
  }
}

export const retakeQuiz = () => {
  return (dispatch) => {
    dispatch({ type: RETAKE_QUIZ })
  }
}

export const submitUserQuiz = (quiz) => {
  var quizPayload = {}

  quiz.map((question, i) => {
    switch (i) {
      case 0:
        var regions = question.answer_choices.filter(ansr_choice => ansr_choice.checked).map(ansr_choice => ansr_choice.content)

        quizPayload['regions'] = regions.filter(Boolean)
        break
      case 1:
        var subregions = question.answer_choices.filter(ansr_choice => ansr_choice.checked).map(ansr_choice => ansr_choice.content)

        quizPayload['subregions'] = subregions.filter(Boolean)
        break
      case 2:
        var population = question.answer_choices.filter(ansr_choice => ansr_choice.checked).map(ansr_choice => ansr_choice.content)

        population.map(size => {
          if (size === 'Small') {
            return 'S'
          } else if (size === 'Medium') {
            return 'M'
          } else {
            return 'L'
          }
        })

        quizPayload['population'] = population.filter(Boolean)
        break
      case 3:
        var island = question.answer_choices.filter(ansr_choice => ansr_choice.checked).map(ansr_choice => ansr_choice.content)

        quizPayload['island'] = island.filter(Boolean)[0]
        break
      case 4:
        var english_only = question.answer_choices.filter(ansr_choice => ansr_choice.checked).map(ansr_choice => ansr_choice.content)

        quizPayload['english_only'] = english_only.filter(Boolean)[0]
        break
      default:
        console.log('default case')
    }

    return question
  })

  return async (dispatch) => {
    try {
      dispatch({ type: FORM_SUBMISSION_PENDING })
      let response = await axios.post(`${BASE_URL}/countries/quiz`, quizPayload)
      dispatch({ type: SUBMIT_FORM, payload: response.data })
    } catch (err) {
      dispatch({ type: FAILED_SUBMISSION, payload: err })
    }
  }
}
