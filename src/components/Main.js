import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectAnswerChoice, submitUserQuiz, updateQuizAnswers, retakeQuiz, fetchUserFavorites, removeFromFavorites, addToFavorites } from '../actions/form.actions'
import { Preloader } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import Quiz from './Quiz'
import Recommendations from './Recommendations'
import Favorites from './Favorites'

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
      countryName: "",
      showFavorites: false
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token')
    const userId = parseInt(localStorage.getItem('userId'))

    this.props.fetchUserFavorites(userId, token)
    Modal.setAppElement('body')
  }

  displayCountryInformationModal = (country={}, countryIndex=0) => {
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

  goToFavorites = () => {
    this.setState({ showFavorites: true })
  }

  goToQuiz = () => {
    this.setState({ showFavorites: false })
  }

  filterFavorites = (e) => {
    this.setState({ countryName: e.target.value })
  }

  renameThisFnLater = async (country={}, countryIndex=0) => {
    const token = localStorage.getItem('token')
    const userId = parseInt(localStorage.getItem('userId'))

    if (this.props.form.favorites.countries.length) {
      const favoritesIds = this.props.form.favorites.countries.map(country => country.id)

      if (favoritesIds.includes(country.id)) {
        await this.props.removeFromFavorites(userId, country.id, token)
        this.setState({ showCountryInfo: false })
        // if no more favorites, redirect to quiz automatically
      } else {
        await this.props.addToFavorites(userId, country.id, token)
      }
    } else {
      await this.props.addToFavorites(userId, country.id, token)
    }

    await this.props.fetchUserFavorites(userId, token)
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
      <Recommendations recommendationsArr={ this.props.form.recommendations }
        displayCountryInformationModal={ this.displayCountryInformationModal }
        countryName={ this.state.countryName }
        chipsArr={ chipsArr }
        returnToQuiz={ this.returnToQuiz }
        retakeQuiz={ this.retakeQuiz }
        filterRecommendations={ this.filterRecommendations }
        renameThisFnLater={ this.renameThisFnLater }
        showCountryInfo={ this.state.showCountryInfo }
        selectedCountry={ this.state.selectedCountry }
        selectedCountryId={ this.state.selectedCountryId }
        pois={ this.props.form.pois }
        favorites={ this.props.form.favorites } />
    )
  }

  displayTravelQuiz = () => {
    let uniqueAnswerChoices = this.props.form.questions[this.state.questionIndex].answer_choices.map((ansr_choice) => { return ansr_choice.checked }).filter((val, i, array) => array.indexOf(val) === i)

    return (
      <div className="Main">
        <div className="main-header">
          <h5>Travel Quiz:</h5>
          <button className="goToFavorites" onClick={ () => this.goToFavorites() }>Go To Favorites</button>
        </div>
        <br/>
        {
          this.props.form.isLoading ? <Preloader className="pending" /> :
          <Quiz form={ this.props.form }
            questionIndex={ this.state.questionIndex }
            questionNum={ this.state.questionNum }
            numQuestions={ this.state.numQuestions }
            uniqueAnswerChoices={ uniqueAnswerChoices }
            submitQuiz={ this.submitQuiz }
            fetchPreviousQuestion={ this.fetchPreviousQuestion }
            fetchNextQuestion={ this.fetchNextQuestion }
            toggleAnswerChoice={ this.toggleAnswerChoice } />
        }
      </div>
    )
  }

  displayFavorites = () => {
    return (
      <div className="favorites-container">
        { <Favorites favorites={ this.props.form.favorites }
          displayCountryInformationModal={ this.displayCountryInformationModal }
          goToQuiz={ this.goToQuiz }
          filterFavorites={ this.filterFavorites }
          showCountryInfo={ this.state.showCountryInfo }
          countryName={ this.state.countryName }
          renameThisFnLater={ this.renameThisFnLater }
          selectedCountry={ this.state.selectedCountry }
          selectedCountryId={ this.state.selectedCountryId } /> }
      </div>
    )
  }

  displayRecommendationsOrQuiz = () => {
    if (this.props.form.recommendations.length) {
      return this.displayTravelRecommendations()
    } else {
      return this.displayTravelQuiz()
    }
  }

  render() {
    return (
      <div>
        { (this.state.showFavorites) ? this.displayFavorites() : this.displayRecommendationsOrQuiz() }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { form: state.form, isLoading: state.auth.isLoading }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectAnswerChoice, submitUserQuiz, updateQuizAnswers, retakeQuiz, fetchUserFavorites, removeFromFavorites, addToFavorites
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
