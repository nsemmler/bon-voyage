import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import MaterialIcon from 'material-icons-react'
import Modal from 'react-modal'
import CountryInfo from './CountryInfo'
import SelectedAnswersChips from './SelectedAnswersChips'
import { selectAnswerChoice, submitUserQuiz, updateQuizAnswers, retakeQuiz, fetchUserFavorites, removeFromFavorites, addToFavorites } from '../actions/form.actions'
import '../styling/Recommendations.css'

class Recommendations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionIndex: 0,
      questionNum: this.props.questions[0].id,
      numQuestions: this.props.questions.length,
      questionName: this.props.questions[0].name,
      showCountryInfo: false,
      selectedCountry: {},
      selectedCountryId: 0,
      countryName: "",
      showFavorites: false,
      fetchedUserFavorites: false
    }
  }

  async componentWillMount() {
    Modal.setAppElement('body')

    const token = localStorage.getItem('token')
    const userId = parseInt(localStorage.getItem('userId'))
    if (!this.props.isLoading) await this.props.fetchUserFavorites(userId, token)
  }

  // returnToQuiz = (e) => {
  //   e.preventDefault()
  //   this.props.updateQuizAnswers()
  // }

  updateUserFavorites = async (country={}, countryIndex=0) => {
    const token = localStorage.getItem('token')
    const userId = parseInt(localStorage.getItem('userId'))

    if (this.props.favorites.length) {
      const favoritesIds = this.props.favorites.map(country => country.id)

      if (favoritesIds.includes(country.id)) {
        await this.props.removeFromFavorites(userId, country.id, token)
        this.setState({ showCountryInfo: false })
      } else {
        await this.props.addToFavorites(userId, country.id, token)
      }
    } else {
      await this.props.addToFavorites(userId, country.id, token)
    }

    await this.props.fetchUserFavorites(userId, token)
  }

  displayCountryInformationModal = (country={}, countryIndex=0) => {
    this.setState({
      showCountryInfo: !this.state.showCountryInfo,
      selectedCountry: country,
      selectedCountryId: countryIndex
    })
  }

  // retakeQuiz = (e) => {
  //   e.preventDefault()
  //
  //   this.setState({
  //     questionIndex: 0,
  //     questionNum: this.props.form.questions[0].id,
  //     questionName: this.props.form.questions[0].name,
  //   })
  //
  //   this.props.retakeQuiz()
  // }

  createChipsArr = (questions) => {
    return questions.map((question, i) => {
      return question.answer_choices.filter(ansr_choice => ansr_choice.checked).map(ansr_choice => ansr_choice.content)
    })
  }

  filterRecommendations = (e) => {
    e.preventDefault()
    this.setState({ countryName: e.target.value })
  }


  render () {
    let chipsArr = this.createChipsArr(this.props.questions)
    let favoritesIds = this.props.favorites.map(country => country.id)

    return (
      <div className="Recommendations">
        <div className="recommendations-header-container">
          <div className="quiz-buttons-and-header">
            <h5 className="recommendations-header">Recommendations:</h5>
          </div>
          <div className="filter-wrapper">
            <input onChange={ this.filterRecommendations } id="recommendations-filter" placeholder="Filter Countries" autoFocus />
          </div>
          {/* <SelectedAnswersChips chipsArr={ chipsArr }/> */}
        </div>
        <br/>
        <div className="recommendations">
          <Modal id="modal" isOpen={ this.state.showCountryInfo } contentLabel="Country Information" onRequestClose={ () => this.displayCountryInformationModal({}) } shouldCloseOnOverlayClick={ true }>
            <div className="modal-container">
              { (Object.keys(this.state.selectedCountry).length !== 0) && <CountryInfo country={ this.state.selectedCountry } countryIndex={ this.state.selectedCountryId } pointsOfInterest={ this.props.pois } updateUserFavorites={ this.updateUserFavorites } favorites={ this.props.favorites } /> }
            </div>
          </Modal>
          { (this.props.recommendations.length) ?
              this.props.recommendations.map((country, countryIndex) => {
                if (country.name.toLowerCase().startsWith(this.state.countryName.toLowerCase()) || country.name.toLowerCase().includes(this.state.countryName.toLowerCase())) {
                  const imageURL = JSON.parse(country.images)[0]
                  return <div className="recommendedCountry-div" onClick={ () => this.displayCountryInformationModal(country, countryIndex) } style={{ backgroundImage: `url(${imageURL})` }}>
                    { favoritesIds.includes(country.id) && <div className="recommended-fav-icon"><MaterialIcon icon="favorite" size="small" color="#d10808"/></div> }
                    <p className="recommendation-name">{ `${country.name}` }</p>
                  </div>
                }
              })
            :
              <div className="empty-recommendations">
                <p>No countries fit your search criteria.  Please try again.</p>
              </div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { recommendations: state.form.recommendations, favorites: state.form.favorites.countries, questions: state.form.questions, pois: state.form.pois }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectAnswerChoice, submitUserQuiz, updateQuizAnswers, retakeQuiz, fetchUserFavorites, removeFromFavorites, addToFavorites
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recommendations))
