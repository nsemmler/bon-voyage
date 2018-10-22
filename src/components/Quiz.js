import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import Question from './Question'
import QuestionCount from './QuestionCount'
import QuizForm from './QuizForm'
import { selectAnswerChoice, submitUserQuiz, updateQuizAnswers, retakeQuiz, fetchUserFavorites, removeFromFavorites, addToFavorites } from '../actions/form.actions'
import '../styling/Quiz.css'

class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionIndex: 0,
      questionNum: this.props.questions[0].id,
      numQuestions: this.props.questions.length,
      showCountryInfo: false,
      selectedCountry: {},
      selectedCountryId: 0,
      countryName: ""
    }
  }

  submitQuiz = async (e) => {
    e.preventDefault()
    var quiz = this.props.form.questions
    await this.props.submitUserQuiz(quiz)
    this.props.history.push("/recommendations")
  }

  toggleAnswerChoice = (e, id) => {
    e.preventDefault()
    this.props.selectAnswerChoice(this.state.questionIndex, id)
  }

  fetchPreviousQuestion = (e) => {
    e.preventDefault()

    if (this.state.questionIndex > 0) {
      var questionIndex = this.state.questionIndex
      var questionNum = this.state.questionNum

      this.setState({
        questionIndex: questionIndex - 1,
        questionNum: questionNum - 1
      })
    }
  }

  fetchNextQuestion = (e) => {
    e.preventDefault()

    if (this.state.questionNum < this.state.numQuestions) {
      var questionIndex = this.state.questionIndex
      var questionNum = this.state.questionNum

      this.setState({
        questionIndex: questionIndex + 1,
        questionNum: questionNum + 1
      })
    }
  }

  render () {
    const uniqueAnswerChoices = this.props.form.questions[this.state.questionIndex].answer_choices.map((ansr_choice) => { return ansr_choice.checked }).filter((val, i, array) => array.indexOf(val) === i)

    return (
      <div className="Quiz">
        <div className="quiz-header-container">
          <h5 className="quiz-header">Travel Quiz:</h5>
        </div>
        <br/>
        <div className="quiz-container">
          <div className="question-and-question-count-container">
            <div className="question-container">
              <Question content={ this.props.questions[this.state.questionIndex].question } />
            </div>
            <div className="question-counter-container">
              <QuestionCount counter={ this.state.questionNum } total={ this.state.numQuestions } />
            </div>
          </div>
          <QuizForm
            submitQuiz={ this.submitQuiz }
            uniqueAnswerChoices={ uniqueAnswerChoices }
            form={ this.props.form }
            questionIndex={ this.state.questionIndex }
            questionNum={ this.state.questionNum }
            numQuestions={ this.state.numQuestions }
            fetchPreviousQuestion={ this.fetchPreviousQuestion }
            fetchNextQuestion={ this.fetchNextQuestion }
            toggleAnswerChoice={ this.toggleAnswerChoice }
          />
        </div>
      </div>
    )
  }
}


function mapStateToProps (state) {
  return { questions: state.form.questions, form: state.form }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectAnswerChoice, submitUserQuiz, updateQuizAnswers, retakeQuiz, fetchUserFavorites, removeFromFavorites, addToFavorites
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Quiz))
