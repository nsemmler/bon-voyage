import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectAnswerChoice, submitUserQuiz, updateQuizAnswers, retakeQuiz } from '../actions/form.actions'
import { Preloader } from 'react-materialize'
import Question from './Question'
import QuestionCount from './QuestionCount'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import Nav from './Nav'
import QuizForm from './QuizForm'
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
      showCountryInfo: false,
      selectedCountry: {},
      selectedCountryId: 0,
      countryName: ""
    }
  }

  componentWillMount() {
    Modal.setAppElement('body')
  }

  isEmpty = (obj) => {
    for (let key in obj) {
      if(obj.hasOwnProperty(key)) return false
    }
    return true
  }

  displayCountryInformationModal = (country={}, countryIndex=0) => {
    // Make Axios request to fetch all POI info for given country ID
    // if (!this.isEmpty(country)) this.props.fetchCountryPOIs(country.id)
    
    this.setState({
      showCountryInfo: !this.state.showCountryInfo,
      selectedCountry: country,
      selectedCountryId: countryIndex
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
      questionNum: this.props.form.questions[0].id,
      questionName: this.props.form.questions[0].name,
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

  createChipsArr = (questions) => {
    return questions.map((question, i) => {
      return question.answer_choices.filter(ansr_choice => ansr_choice.checked).map(ansr_choice => ansr_choice.content)
    })
  }

  filterRecommendations = (e) => {
    e.preventDefault()

    this.setState({ countryName: e.target.value })
  }

  displayTravelRecommendations = () => {
    let chipsArr = this.createChipsArr(this.props.form.questions)

    return (
      <div className="Main">
        <div className="main-header">
          <h5>Recommended Travel Destinations:</h5>
          <button className="back2quiz" onClick={ this.returnToQuiz } waves="light" type="button">Return to Quiz</button>
          <button className="retakeQuiz" onClick={ this.retakeQuiz } waves="light" type="button">Retake Quiz</button>
          <div className="search-wrapper">
            <span><input onChange={ this.filterRecommendations } id="search" placeholder="Filter Countries" /><i className="material-icons">search</i></span>
          </div>
          <SelectedAnswersChips chipsArr={ chipsArr }/>
        </div>
        <br/>
        <div className="response-container" id="responses">
          <div className="recommendations">
            <Modal isOpen={ this.state.showCountryInfo } contentLabel="Recommended Country Information" onRequestClose={ () => this.displayCountryInformationModal({}) } shouldCloseOnOverlayClick={ true }>
              <div className="modal-container">
                { (Object.keys(this.state.selectedCountry).length !== 0) && <CountryInfo country={ this.state.selectedCountry } countryIndex={ this.state.selectedCountryId } pointsOfInterest={ this.props.form.pois } /> }
              </div>
            </Modal>
            { <Recommendations recommendationsArr={ this.props.form.recommendations } displayCountryInformationModal={ this.displayCountryInformationModal } countryName={ this.state.countryName } /> }
          </div>
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
          this.props.form.isLoading ? <Preloader className="pending" /> : <div className="quiz-container">
            <div className="question-and-question-count-container">
              <div className="question-container">
                <Question content={ this.props.form.questions[this.state.questionIndex].question } />
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
        }
      </div>
    )
  }

  render() {
    return (
      <div className="main">
        <Nav />
        <div>
          { (this.props.form.recommendations.length) ? this.displayTravelRecommendations() : this.displayTravelQuiz() }
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
