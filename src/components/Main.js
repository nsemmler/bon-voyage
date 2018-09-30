import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectAnswerChoice, submitUserQuiz } from '../actions/form.actions'
import { Input, Button, Card, CardTitle } from 'react-materialize'
import Question from './Question'
import QuestionCount from './QuestionCount'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import Nav from './Nav'
import CountryMap from './CountryMap'

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
    console.log('Inside returnToQuiz')
  }

  displayResults = () => {
    var recommendationsArr = this.props.form.recommendations

    return (
      <div className="recommendations">
        <Modal isOpen={ this.state.showModal }
          contentLabel="Recommended Country Information"
          onRequestClose={ () => this.displayCountryInformationModal({}) }
          shouldCloseOnOverlayClick={ true }>
          <div className="modal-container">
            { this.displayCountryInfo(this.state.modalCountry) }
          </div>
        </Modal>
        {
          recommendationsArr.map(country => {
            return <Card className="recommendedCountry" key={ `recommendation-${country.id}` }
              header={ <CardTitle image={ JSON.parse(country.images)[0] }/> }
              title={ ((country.name === country.native_name) || (country.name === 'United States of America')) ? `${country.name}` : `${country.name} (${country.native_name})` }
              onClick={ () => this.displayCountryInformationModal(country) }>
              { country.capital }
            </Card>
          })
        }
      </div>
    )
  }

  displayCountryInfo = (country) => {
    if (Object.keys(country).length !== 0) {
      return (
        <div>
          <ul>
            <li className="countryInfoItem">Region: { country.region }</li>
            <li className="countryInfoItem">Subregion: { country.subregion }</li>
            <li className="countryInfoItem">Population: { country.population }</li>
            <li className="countryInfoItem">Lon/Lat: { country.longitude }/{ country.latitude }</li>
            <li className="countryInfoItem">Currency: { country.currency_name })({ country.currency_symbol })</li>
            <li className="countryInfoItem">Languages: { country.languages }</li>
            <li className="countryInfoItem">Flag: { <img src={ country.flag } alt={ `${country.name} Flag` } /> }</li>
          </ul>
          <br/>
          <CountryMap latitude={ country.latitude } longitude={ country.longitude } />
        </div>
      )
    }
  }

  displayTravelRecommendations = () => {
    return (
      <div className="Main">
        <div className="main-header">
          <h5>Recommended Travel Destinations:</h5>
          <button className="back2quiz" onClick={ this.returnToQuiz } waves="light" type="button">Return to Quiz</button>
        </div>
        <br/>
        <div className="response-container" id="responses">
          { this.displayResults() }
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
            (this.props.form.recommendations.length) ? this.displayTravelRecommendations() : this.displayTravelQuiz()
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
