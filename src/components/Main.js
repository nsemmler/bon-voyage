import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectAnswerChoice, submitUserQuiz, updateQuizAnswers, retakeQuiz } from '../actions/form.actions'
import { Input, Button, Preloader } from 'react-materialize'
import Question from './Question'
import QuestionCount from './QuestionCount'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import Nav from './Nav'
import CountryInfo from './CountryInfo'
import Recommendations from './Recommendations'
import SelectedAnswersChips from './SelectedAnswersChips'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionIndex: 0,
      questionNum: props.form.questions[0].id,
      numQuestions: props.form.questions.length,
      questionName: props.form.questions[0].name,
      showModal: false,
      modalCountry: {}
    }
  }

  componentWillMount() {
    Modal.setAppElement('body')
  }

  displayCountryInformationModal = (country={}) => {
    this.setState({
      showModal: !this.state.showModal,
      modalCountry: country
    })
  }

  toggleAnswerChoice = (e, id) => {
    e.preventDefault()

    this.props.selectAnswerChoice(this.state.questionIndex, id)
  }

  submitQuiz = (e) => {
    e.preventDefault()

    var quiz = this.props.form.questions
    this.props.submitUserQuiz(quiz)
  }

  returnToQuiz = (e) => {
    e.preventDefault()

    this.props.updateQuizAnswers()
  }

  retakeQuiz = (e) => {
    e.preventDefault()

    this.setState({
      questionIndex: 0,
      questionNum: this.props.form.questions.questions[0].id,
      questionName: this.props.form.questions.questions[0].name,
    })

    this.props.retakeQuiz()
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

  displayRecommendations = () => {
    return (
      <div className="recommendations">
        <Modal isOpen={ this.state.showModal }
          contentLabel="Recommended Country Information"
          onRequestClose={ () => this.displayCountryInformationModal({}) }
          shouldCloseOnOverlayClick={ true }>
          <div className="modal-container">
            { (Object.keys(this.state.modalCountry).length !== 0) && <CountryInfo country={ this.state.modalCountry }/> }
          </div>
        </Modal>
        {
          <Recommendations recommendationsArr={ this.props.form.recommendations } displayCountryInformationModal={ this.displayCountryInformationModal } />
        }
      </div>
    )
  }

  displayTravelRecommendations = () => {
    let chipsArr = this.props.form.questions.questions.map((question, i) => {
      const selectedAnswers = question.answer_choices.filter((ansr_choice) => {
        if (ansr_choice.checked) return ansr_choice.content
      })

      const selectedAnswerContent = selectedAnswers.map(ansr_obj => {
        return ansr_obj.content
      })

      return selectedAnswerContent
    })

    return (
      <div className="Main">
        <div className="main-header">
          <h5>Recommended Travel Destinations:</h5>
          <button className="back2quiz" onClick={ this.returnToQuiz } waves="light" type="button">Return to Quiz</button>
          <button className="retakeQuiz" onClick={ this.retakeQuiz } waves="light" type="button">Retake Quiz</button>
        </div>
        <SelectedAnswersChips chipsArr={ chipsArr }/>
        <br/>
        <div className="response-container" id="responses">
          { this.displayRecommendations() }
        </div>
      </div>
    )
  }

  displayTravelQuiz = () => {
    let uniqueAnswerChoices = this.props.form.questions[this.state.questionIndex].answer_choices.map((ansr_choice) => { return ansr_choice.checked }).filter((val, i, array) => array.indexOf(val) === i)

    return (
      <div className="Main">
        <div className="main-header">
          <h5>Travel Quiz:</h5>
        </div>
        <br/>
        {
          this.props.isLoading ? <Preloader className="pending" /> : <div className="quiz-container">
            <div className="question-and-question-count-container">
              <div className="question-container">
                <Question content={ this.props.form.questions[this.state.questionIndex].question } />
              </div>
              <div className="question-counter-container">
                <QuestionCount counter={ this.state.questionNum } total={ this.state.numQuestions } />
              </div>
            </div>
            <form className="question-form" onSubmit={ this.submitQuiz }>
              <div className="quiz">
                <div className="inputs-container">
                  {
                    this.props.form.questions[this.state.questionIndex].answer_choices.map(ansr_choice => {
                      return <Input className="form-input" key={ `${ansr_choice.id}-${ansr_choice.checked}` } onClick={ (e) => this.toggleAnswerChoice(e, ansr_choice.id) } name={ `${ansr_choice.type}[]` } type='checkbox' checked={ ansr_choice.checked } label={ ansr_choice.content } />
                    })
                  }
                </div>

                <div className={(this.state.questionNum !== this.state.numQuestions) ? "prev-next-questions-btns" : "submit-question-btn"}>
                  {
                    (this.state.questionNum !== 1) &&
                    <Button className="prevbtn" onClick={ this.fetchPreviousQuestion } waves="light" type="button" disabled={ this.state.questionNum === 1 }>Previous</Button>
                  }
                  {
                    (this.state.questionNum !== this.state.numQuestions) &&
                    <Button className="nextbtn" onClick={ this.fetchNextQuestion } waves="light" type="button" disabled={ (uniqueAnswerChoices.length === 1 && !uniqueAnswerChoices[0]) }>Next</Button>
                  }
                  {
                    (this.state.questionNum === this.state.numQuestions) &&
                    <Button waves="light" type="submit" disabled={ (uniqueAnswerChoices.length === 1 && !uniqueAnswerChoices[0]) }>Submit</Button>
                  }
                </div>
              </div>
            </form>
          </div>
        }
      </div>
    )
  }

  render() {
    return (
      <div className="main">
        <Nav />
        <div>
          {
            (this.props.form.recommendations.length) ? this.displayTravelRecommendations() : this.displayTravelQuiz()
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { form: state.form, isLoading: state.auth.isLoading }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectAnswerChoice, submitUserQuiz, updateQuizAnswers, retakeQuiz
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
