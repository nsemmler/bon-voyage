import {
  CHECK_SUBREGION,
  SUBMIT_FORM
} from "../actions/form.actions"

import initialState from '../questions.json'

// separate initialState into object w/ questions={.json} & answers=[]
// check answers.length in <Main>
export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_SUBREGION:

      const id = action.payload
      const question1 = state[0]

      const newAnswerChoices = question1.answer_choices.map(choice => {
        if (choice.id === id) {
          return { ...choice, checked: !choice.checked }
        } else {
          return choice
        }
      })

      return [ { ...question1, answer_choices: newAnswerChoices } ]
    case SUBMIT_FORM:
      return { recommendations: action.payload }
    default:
      return state
  }
}
