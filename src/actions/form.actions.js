import axios from 'axios'

export const SUBMIT_FORM = "SUBMIT_FORM"
export const UPDATE_ANSWER_CHOICE = "UPDATE_ANSWER_CHOICE"
export const FAILED_SUBMISSION = "FAILED_SUBMISSION"

const BASE_URL = "http://localhost:3000"

window.axios = axios

export const selectAnswerChoice = (questionID, answerChoiceID) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_ANSWER_CHOICE, payload: { questionID, answerChoiceID } })
  }
}

export const submitUserQuiz = (quiz) => {
  console.log('Inside submitUserQuiz Action')
  console.log('quiz:', quiz)

  var quizPayload = {}
  quiz.map((question, i) => {
    switch (i) {
      case 0:
        var regions = question.answer_choices.map(ansr_choice => {
          if (ansr_choice.checked) return ansr_choice.content
        })

        quizPayload['regions'] = regions.filter(Boolean)
      case 1:
        var subregions = question.answer_choices.map(ansr_choice => {
          if (ansr_choice.checked) return ansr_choice.content
        })

        quizPayload['subregions'] = subregions.filter(Boolean)
      case 2:
        var population = question.answer_choices.map(ansr_choice => {
          if (ansr_choice.checked) return ansr_choice.content
        })

        population.map(size => {
          if (size === 'Small') { return 'S' }
          else if (size === 'Medium') { return 'M' }
          else if (size === 'Large') { return 'L' }
        })

        quizPayload['population'] = population.filter(Boolean)
      case 3:
        var island = question.answer_choices.map(ansr_choice => {
          if (ansr_choice.checked) return ansr_choice.content
        })

        quizPayload['island'] = island.filter(Boolean)[0]
      case 4:
        var english_only = question.answer_choices.map(ansr_choice => {
          if (ansr_choice.checked) return ansr_choice.content
        })

        quizPayload['english_only'] = english_only.filter(Boolean)[0]
      default:
        console.log('default case')
    }
  })

  console.log('quizPayload', quizPayload)

  return async (dispatch) => {
    try {
      let response = await axios.post(`${BASE_URL}/countries/quiz`, quizPayload)
      console.log('Submit quiz response: ', response)
      dispatch({ type: SUBMIT_FORM, payload: response.data })
    } catch (err) {
      dispatch({ type: FAILED_SUBMISSION, payload: err })
    }
  }
}
