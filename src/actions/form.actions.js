import axios from 'axios'

export const SUBMIT_FORM = "SUBMIT_FORM"
export const CHECK_REGION = "CHECK_REGION"
export const FAILED_SUBMISSION = "FAILED_SUBMISSION"

const BASE_URL = "http://localhost:3000"

window.axios = axios

export const checkRegionById = (id) => {
  console.log('Inside Action when click Region');
  return (dispatch) => {
    dispatch({ type: CHECK_REGION, payload: id })
  }
}

export const submitUserQuiz = (userResponses) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${BASE_URL}/countries/subregion`, {
        subregions: JSON.stringify(userResponses)
      })

      dispatch({ type: SUBMIT_FORM, payload: response.data })
    } catch (err) {
      dispatch({ type: FAILED_SUBMISSION, payload: err })
    }
  }
}
