import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkSubregionById, submitUserQuiz } from '../actions/form.actions'
import { Input, Button } from 'react-materialize'
import Question from './Question'
import QuestionCount from './QuestionCount'

function mapStateToProps (state) {
  return { form: state.form }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    checkSubregionById, submitUserQuiz
  }, dispatch)
}

const Main = ({ form, checkSubregionById, submitUserQuiz }) => {
  const selectSubregion = (e, id) => {
    e.preventDefault()

    checkSubregionById(id)
  }

  const submitQuiz = (e) => {
    e.preventDefault()

    let userResponses = []
    form[0].answer_choices.forEach(subregion => {
      if (subregion.checked) userResponses.push(subregion.content)
    })

    submitUserQuiz(userResponses)
  }

  const displayResults = () => {
    var recommendationsArr = form.recommendations

    return (
      <ul>
      {
        recommendationsArr.map(country => {
          return <li>{ `${country.name} (${country.native_name})` }</li>
        })
      }
      </ul>
    )
  }

  const displayTravelRecommendations = () => {
    return (
      <div className="Main">
        <div className="main-header">
          <h5>Recommended Travel Destinations:</h5>
        </div>
        <br/>
        <div className="response-container">
          <div className="recommendations">
            {
              displayResults()
            }
          </div>
        </div>
      </div>
    )
  }

  const displayTravelQuiz = () => {
    return (
      <div className="Main">
        <div className="main-header">
          <h5>Travel Quiz:</h5>
        </div>
        <br/>
        <div className="quiz-container">
          <div className="question-and-question-count-container">
            <div className="question-container">
              <Question content="Select one or more subregions of the world you would be interested in traveling to:" />
            </div>
            <div className="question-counter-container">
              <QuestionCount counter={ 1 } total={ 1 } />
            </div>
          </div>
          <form className="question-form" onSubmit={ submitQuiz }>
            <div className="quiz">
              <div className="inputs-container">
                {
                  form[0].answer_choices.map(ansr_choice => {
                    return <Input className="form-input" key={ `${ansr_choice.id}-${ansr_choice.checked}` } onClick={ (e) => selectSubregion(e, ansr_choice.id) } name='subregion[]' type='checkbox' checked={ ansr_choice.checked } label={ ansr_choice.content } />
                  })
                }
              </div>

              <div className="submit-question-btn"><Button waves="light" type="submit">Submit</Button></div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div>
      {
        form.recommendations && displayTravelRecommendations()
      }
      {
        !form.recommendations && displayTravelQuiz()
      }
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
