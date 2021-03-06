import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import MaterialIcon from 'material-icons-react'
import Modal from 'react-modal'
import CountryInfo from './CountryInfo'
import ScrollToTop from 'react-scroll-up'
import { selectAnswerChoice, submitUserQuiz, updateQuizAnswers, retakeQuiz, fetchUserFavorites, removeFromFavorites, addToFavorites } from '../actions/form.actions'
import '../styling/Recommendations.css'

const media_query = window.matchMedia( "(max-width: 700px)" )

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
    const userId = parseInt(localStorage.getItem('userId'), 10)
    if (!this.props.isLoading) await this.props.fetchUserFavorites(userId, token)
  }

  updateUserFavorites = async (country={}, countryIndex=0) => {
    const token = localStorage.getItem('token')
    const userId = parseInt(localStorage.getItem('userId'), 10)

    if (this.props.favorites.length) {
      const favoritesIds = this.props.favorites.map(country => country.id)

      if (favoritesIds.includes(country.id)) {
        await this.props.removeFromFavorites(userId, country.id, token)
      } else {
        await this.props.addToFavorites(userId, country.id, token)
      }
    } else {
      await this.props.addToFavorites(userId, country.id, token)
    }

    await this.props.fetchUserFavorites(userId, token)
  }

  displayCountryInformationModal = (country={}) => {
    var country_id = 0
    this.props.pois.map((pois_arr, pois_index) => {
      if (pois_arr.length === 10) {
        if (pois_arr[0].country_id === country.id) {
          country_id = pois_index
        }
      }
    })

    this.setState({
      showCountryInfo: !this.state.showCountryInfo,
      selectedCountry: country,
      selectedCountryId: country_id
    })
  }

  filterRecommendations = (e) => {
    e.preventDefault()
    this.setState({ countryName: e.target.value })
  }

  generateSubregionBlock = (subregion, uniqueSubregions, favoritesIds, recommendationsObject) => {
    return <div className="subregion-block">
      <h5 className="subregion-header">{ subregion }</h5>
      <hr className="line"></hr>
      <div className="subregion-recommendations">
        {
          recommendationsObject[subregion].map((country, countryIndex) => {
            if (country.name.toLowerCase().startsWith(this.state.countryName.toLowerCase()) || country.name.toLowerCase().includes(this.state.countryName.toLowerCase())) {
              const imageURL = JSON.parse(country.images)[0]

              return <div className="recommendedCountry-div" onClick={ () => this.displayCountryInformationModal(country) } style={{ backgroundImage: `url(${imageURL})` }}>
                { favoritesIds.includes(country.id) && <div className="recommended-fav-icon"><MaterialIcon icon="favorite" size="small" color="#d10808"/></div> }
                <p className="recommendation-name">{ `${country.name}` }</p>
              </div>
            }
          })
        }
      </div>
    </div>
  }

  render () {
    let favoritesIds = this.props.favorites.map(country => country.id)
    let subregionsArr = this.props.recommendations.map(country => country.subregion)
    let uniqueSubregions = Array.from(new Set(subregionsArr))
    let recommendationsObject = {}

    this.props.recommendations.map(country => {
      if (!Object.keys(recommendationsObject).includes(country.subregion)) recommendationsObject[country.subregion] = []
      recommendationsObject[country.subregion].push(country)
    })

    return (
      <div className="Recommendations">
        <div className="recommendations-header-container">
          <div className="quiz-buttons-and-header">
            <h5 className="recommendations-header">Recommendations:</h5>
          </div>
          <div className="filter-wrapper">
            <input onChange={ this.filterRecommendations } id="recommendations-filter" placeholder="Filter Countries" autoFocus />
          </div>
        </div>
        <br/>
        <Modal id="modal" isOpen={ this.state.showCountryInfo } contentLabel="Country Information" onRequestClose={ () => this.displayCountryInformationModal({}) } shouldCloseOnOverlayClick={ true }>
          <div className="modal-container">
            { (Object.keys(this.state.selectedCountry).length !== 0) && <CountryInfo country={ this.state.selectedCountry } countryIndex={ this.state.selectedCountryId } pointsOfInterest={ this.props.pois } updateUserFavorites={ this.updateUserFavorites } favorites={ this.props.favorites } /> }
          </div>
        </Modal>
        <div className="recommendations">
          {
            (this.props.recommendations.length) ?
              uniqueSubregions.map(subregion => {
                return this.generateSubregionBlock(subregion, uniqueSubregions, favoritesIds, recommendationsObject)
              })
            :
              <div className="empty-recommendations">
                <p>No countries fit your search criteria.  Please try again.</p>
              </div>
          }
        </div>
        <ScrollToTop className="scrollToTop" showUnder={ 160 } style={
          (media_query.matches) ? { bottom: 75, right: 50, zIndex: 0, display: "flex", position: "static", justifyContent: "flex-end", margin: "10px 10px 0px 0px", color: "#29274C" } : { bottom: 75, right: 50, zIndex: 0, position: "fixed", color: "#29274C" }
        }>
          <span><i className="far fa-3x fa-arrow-alt-circle-up"></i></span>
        </ScrollToTop>
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
