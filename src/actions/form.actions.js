// import axios from 'axios'

export const SUBMIT_FORM = "SUBMIT_FORM"
export const CHECK_SUBREGION = "CHECK_SUBREGION"

// const BASE_URL = "http://localhost:3000"

export const checkSubregionById = (id) => {
  return { type: CHECK_SUBREGION, payload: id }
}

export const submitUserQuiz = (userResponses) => {
  console.log('inside submitUserQuiz Action')
  console.log('Action payload: ', userResponses)
  return { type: SUBMIT_FORM, payload: [ "Denmark", "Sweden", "Norway", "Finland" ] }
}
