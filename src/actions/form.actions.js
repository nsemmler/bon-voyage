import axios from 'axios'

export const SUBMIT_FORM = "SUBMIT_FORM"
export const CHECK_SUBREGION = "CHECK_SUBREGION"
export const FAILED_SUBMISSION = "FAILED_SUBMISSION"

const BASE_URL = "http://localhost:3000"

export const checkSubregionById = (id) => {
  return { type: CHECK_SUBREGION, payload: id }
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
