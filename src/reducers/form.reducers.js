import {
  CHECK_REGION,
  SUBMIT_FORM
} from "../actions/form.actions"

import initialState from '../questions.json'

// separate initialState into object w/ questions={.json} & answers=[]
// check answers.length in <Main>
export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_REGION:
      console.log('Inside Reducer when click Region');
      const id = action.payload
      const regionQuestion = state[0]

      const updatedAnswerChoices = regionQuestion.answer_choices.map(choice => {
        if (choice.id === id) {
          return { ...choice, checked: !choice.checked }
        } else {
          return choice
        }
      })

      return [ { ...regionQuestion, answer_choices: updatedAnswerChoices } ]
    case SUBMIT_FORM:
      return { recommendations: action.payload }
    default:
      return state
  }
}
