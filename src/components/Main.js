import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectAnswerChoice, submitUserQuiz } from '../actions/form.actions'
import { Input, Button } from 'react-materialize'
import Question from './Question'
import QuestionCount from './QuestionCount'
import { withRouter } from 'react-router-dom'
import Nav from './Nav'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionIndex: 0,
      questionNum: props.form[0].id,
      numQuestions: props.form.length,
      questionName: props.form[0].name
    }
  }

  toggleAnswerChoice = (e, id) => {
    e.preventDefault()

    this.props.selectAnswerChoice(this.state.questionIndex, id)
  }

  submitQuiz = (e) => {
    e.preventDefault()
    console.log('Inside submitQuiz <Main>')
    var quiz = this.props.form
    this.props.submitUserQuiz(quiz)
  }

  displayResults = () => {
    var recommendationsArr = this.props.form.recommendations

    return (
      <ul>
        {
          recommendationsArr.map(country => {
            return <li key={ `country-${country.id}` }>{ `${country.name} (${country.native_name})` }</li>
          })
        }
      </ul>
    )
  }

  displayTravelRecommendations = () => {
    return (
      <div className="Main">
        <div className="main-header">
          <h5>Recommended Travel Destinations:</h5>
        </div>
        <br/>
        <div className="response-container">
          <div className="recommendations">
            { this.displayResults() }
          </div>
        </div>
      </div>
    )
  }

  fetchPreviousQuestion = (e) => {
    e.preventDefault()

    if (this.state.questionIndex > 0) {
      this.setState({
        questionIndex: --this.state.questionIndex,
        questionNum: --this.state.questionNum
      })
    }
  }

  fetchNextQuestion = (e) => {
    e.preventDefault()

    if (this.state.questionNum < this.state.numQuestions) {
      this.setState({
        questionIndex: ++this.state.questionIndex,
        questionNum: ++this.state.questionNum
      })
    }
  }

  displayTravelQuiz = () => {
    return (
      <div className="Main">
        <div className="main-header">
          <h5>Travel Quiz:</h5>
        </div>
        <br/>
        <div className="quiz-container">
          <div className="question-and-question-count-container">
            <div className="question-container">
              { console.log('this.props.form[this.state.questionIndex]', this.props.form[this.state.questionIndex]) }
              <Question content={ this.props.form[this.state.questionIndex].question } />
            </div>
            <div className="question-counter-container">
              <QuestionCount counter={ this.state.questionNum } total={ this.state.numQuestions } />
            </div>
          </div>
          <form className="question-form" onSubmit={ this.submitQuiz }>
            <div className="quiz">
              <div className="inputs-container">
                {
                  this.props.form[this.state.questionIndex].answer_choices.map(ansr_choice => {
                    return <Input className="form-input" key={ `${ansr_choice.id}-${ansr_choice.checked}` } onClick={ (e) => this.toggleAnswerChoice(e, ansr_choice.id) } name={ `${ansr_choice.type}[]` } type='checkbox' checked={ ansr_choice.checked } label={ ansr_choice.content } />
                  })
                }
              </div>

              {
                this.state.questionNum !== this.state.numQuestions && <div className="prev-next-questions-btns">
                  <Button className="prevbtn" onClick={ this.fetchPreviousQuestion } waves="light" type="button" disabled={ this.state.questionNum === 1 }>Previous</Button>
                  <Button className="nextbtn" onClick={ this.fetchNextQuestion } waves="light" type="button">Next</Button>
                </div>
              }
              {
                this.state.questionNum === this.state.numQuestions && <div className="submit-question-btn">
                  <Button className="prevbtn" onClick={ this.fetchPreviousQuestion } waves="light" type="button">Previous</Button>
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
            this.props.form.recommendations ? this.displayTravelRecommendations() : this.displayTravelQuiz()
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { form: state.form }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectAnswerChoice, submitUserQuiz
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
