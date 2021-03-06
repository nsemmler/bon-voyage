import axios from 'axios'

export const FORM_SUBMISSION_PENDING = "FORM_SUBMISSION_PENDING"
export const SUBMIT_FORM = "SUBMIT_FORM"
export const RETAKE_QUIZ = "RETAKE_QUIZ"
export const UPDATE_QUIZ_ANSWERS = "UPDATE_QUIZ_ANSWERS"
export const UPDATE_ANSWER_CHOICE = "UPDATE_ANSWER_CHOICE"
export const FAILED_SUBMISSION = "FAILED_SUBMISSION"
export const GET_USER_FAVORITES = "GET_USER_FAVORITES"
export const ADD_COUNTRY_TO_FAVORITES = "ADD_COUNTRY_TO_FAVORITES"
export const REMOVE_COUNTRY_FROM_FAVORITES = "REMOVE_COUNTRY_FROM_FAVORITES"
export const CLEAR_USER_FAVORITES = "CLEAR_USER_FAVORITES"

window.axios = axios

const BASE_URL = "https://bon-voyage-api.herokuapp.com"

export const fetchUserFavorites = (userId, token) => {
  return async (dispatch) => {
    var config = { headers: { 'Authorization': token, 'Content-Type': 'application/json' }}
    let response = await axios.get(`${BASE_URL}/favorites?user_id=${parseInt(userId, 10)}`, config)
    dispatch({ type: GET_USER_FAVORITES, payload: response.data })
  }
}

export const addToFavorites = (userId, countryId, token) => {
  return async (dispatch) => {
    var body = { country_id: parseInt(countryId, 10), user_id: parseInt(userId, 10) }
    var config = { headers: { 'Authorization': token, 'Content-Type': 'application/json' }}
    let response = await axios.post(`${BASE_URL}/favorites`, body, config)
    dispatch({ type: ADD_COUNTRY_TO_FAVORITES, action: response.data })
  }
}

export const removeFromFavorites = (userId, countryId, token) => {
  return async (dispatch) => {
    var config = { headers: { 'Authorization': token, 'Content-Type': 'application/json' }, data: { country_id: parseInt(countryId, 10), user_id: parseInt(userId, 10) } }
    let response = await axios.delete(`${BASE_URL}/favorites`, config)
    dispatch({ type: REMOVE_COUNTRY_FROM_FAVORITES, action: response.data })
  }
}

export const clearFavorites = () => {
  return async (dispatch) => {
    dispatch({ type: CLEAR_USER_FAVORITES })
  }
}

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

export const submitUserQuiz = (quiz, history) => {
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
      const token = localStorage.getItem('token')
      var config = { headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }}

      let response = await axios.post(`${BASE_URL}/countries/quiz`, quizPayload, config)
      setTimeout(function() {
        dispatch({ type: SUBMIT_FORM, payload: response.data })
        history.push("/recommendations")
      }, 2000)
    } catch (err) {
      dispatch({ type: FAILED_SUBMISSION, payload: err })
    }
  }
}
