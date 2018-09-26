import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkRegionById, submitUserQuiz } from '../actions/form.actions'
import { Input, Button } from 'react-materialize'
import Question from './Question'
import QuestionCount from './QuestionCount'
import { withRouter } from 'react-router-dom'
import Nav from './Nav'
import questionsArr from '../questions.json'

function mapStateToProps (state) {
  return { form: state.form }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    checkRegionById, submitUserQuiz
  }, dispatch)
}

// const Main = ({ form, checkRegionById, submitUserQuiz }) => {
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionIndex: 0,
      questionNum: questionsArr[0].id,
      numQuestions: questionsArr.length
    }
  }

  // const selectRegion = (e, id) => {
  selectRegion = (e, id) => {
    e.preventDefault()
    console.log('Selected Region')
    console.log('state:', this.state)
    console.log('props:', this.props)
    checkRegionById(id)
  }

  // const submitQuiz = (e) => {
  submitQuiz = (e) => {
    e.preventDefault()

    let userResponses = []
    this.props.form[0].answer_choices.forEach(subregion => {
      if (subregion.checked) userResponses.push(subregion.content)
    })

    submitUserQuiz(userResponses)
  }

  // const displayResults = () => {
  displayResults = () => {
    var recommendationsArr = this.props.form.recommendations

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

  // const displayTravelRecommendations = () => {
  displayTravelRecommendations = () => {
    return (
      <div className="Main">
        <div className="main-header">
          <h5>Recommended Travel Destinations:</h5>
        </div>
        <br/>
        <div className="response-container">
          <div className="recommendations">
            {
              this.displayResults()
            }
          </div>
        </div>
      </div>
    )
  }

  // const fetchPreviousQuestion = (e) => {
  fetchPreviousQuestion = (e) => {
    e.preventDefault()
    console.log('Inside fetchPreviousQuestion')
  }

  // const fetchNextQuestion = (e) => {
  fetchNextQuestion = (e) => {
    e.preventDefault()
    console.log('Inside fetchNextQuestion')
  }

  // const displayTravelQuiz = () => {
  displayTravelQuiz = () => {
    // make state?????
    // var questionIndex = 0
    // var questionNum = questionIndex + 1
    // var numQuestions = questionsArr.length

    return (
      <div className="Main">
        <div className="main-header">
          <h5>Travel Quiz:</h5>
        </div>
        <br/>
        <div className="quiz-container">
          <div className="question-and-question-count-container">
            <div className="question-container">
              <Question content={ questionsArr[this.state.questionIndex].question } />
            </div>
            <div className="question-counter-container">
              <QuestionCount counter={ this.state.questionNum } total={ this.state.numQuestions } />
            </div>
          </div>
          <form className="question-form" onSubmit={ this.submitQuiz }>
            <div className="quiz">
              <div className="inputs-container">
                {
                  this.props.form[0].answer_choices.map(ansr_choice => {
                    return <Input className="form-input" key={ `${ansr_choice.id}-${ansr_choice.checked}` } onClick={ (e) => this.selectRegion(e, ansr_choice.id) } name='subregion[]' type='checkbox' checked={ ansr_choice.checked } label={ ansr_choice.content } />
                  })
                }
              </div>

              {
                this.state.questionNum !== this.state.numQuestions && <div className="prev-next-questions-btns">
                  <Button className="prevbtn" onClick={ this.fetchPreviousQuestion } waves="light" type="button">Previous</Button>
                  <Button className="nextbtn" onClick={ this.fetchNextQuestion } waves="light" type="button">Next</Button>
                </div>
              }
              {
                this.state.questionNum === this.state.numQuestions && <div className="submit-question-btn">
                  <Button waves="light" type="submit">Submit</Button>
                </div>
              }
            </div>
          </form>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="main">
        <Nav />
        <div>
          {
            this.props.form.recommendations && this.displayTravelRecommendations()
          }
          {
            !this.props.form.recommendations && this.displayTravelQuiz()
          }
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
