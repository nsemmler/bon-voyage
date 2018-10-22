import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import CountryInfo from './CountryInfo'
import ScrollToTop from 'react-scroll-up'
import { fetchUserFavorites, removeFromFavorites, addToFavorites } from '../actions/form.actions'
import '../styling/Favorites.css'

const media_query = window.matchMedia( "(max-width: 700px)" )

class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCountryInfo: false,
      selectedCountry: {},
      selectedCountryId: 0,
      countryName: ""
    }
  }

  async componentWillMount() {
    const token = localStorage.getItem('token')
    const userId = parseInt(localStorage.getItem('userId'), 10)

    if (!this.props.isLoading) await this.props.fetchUserFavorites(userId, token)
    Modal.setAppElement('body')
  }

  updateUserFavorites = async (country={}, countryIndex=0) => {
    const token = localStorage.getItem('token')
    const userId = parseInt(localStorage.getItem('userId'), 10)

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

  filterFavorites = (e) => {
    this.setState({ countryName: e.target.value })
  }

  displayCountryInformationModal = (country={}, countryIndex=0) => {
    this.setState({
      showCountryInfo: !this.state.showCountryInfo,
      selectedCountry: country,
      selectedCountryId: countryIndex
    })
  }

  render () {
    return (
      <div className="Favorites">
        <div className="favorites-header-container">
          <h5 className="favorites-header">Favorites:</h5>
          <div className="filter-wrapper">
            <input onChange={ (e) => this.filterFavorites(e) } id="filter" placeholder="Filter Favorites" autoFocus/>
          </div>
        </div>
        <br/>
          <Modal isOpen={ this.state.showCountryInfo } contentLabel="Country Information" onRequestClose={ () => this.displayCountryInformationModal({}) } shouldCloseOnOverlayClick={ true }>
            <div className="modal-container">
              { (Object.keys(this.state.selectedCountry).length !== 0) && <CountryInfo country={ this.state.selectedCountry } countryIndex={ this.state.selectedCountryId } pointsOfInterest={ this.props.pois } updateUserFavorites={ this.updateUserFavorites } favorites={ this.props.favorites } /> }
            </div>
          </Modal>
        <div className="favorites-container" id="favorites">
          <div className="favorites">
            { (this.props.favorites.length) ?
                this.props.favorites.map((country, countryIndex) => {
                  if (country.name.toLowerCase().startsWith(this.state.countryName.toLowerCase()) || country.name.toLowerCase().includes(this.state.countryName.toLowerCase())) {
                    const imageURL = JSON.parse(country.images)[0]
                    return <div className="favoriteCountry-div" key={ `favoriteCountry-${country.id}` } onClick={ () => this.displayCountryInformationModal(country, countryIndex) } style={{ backgroundImage: `url(${imageURL})` }}>
                      <p className="favorite-name">{ `${country.name}` }</p>
                    </div>
                  }
                })
              :
                <div className="empty-favorites">
                  <div className="nofavs-desc-container">
                    <p>You have no favorites.  To add countries to favorites, take the Quiz and click the heart container for any country.</p>
                  </div>
                </div>
            }
          </div>
          <ScrollToTop className="scrollToTop" showUnder={ 160 } style={
            (media_query.matches) ? { bottom: 75, right: 50, zIndex: 0, display: "flex", position: "static", justifyContent: "flex-end", margin: "10px 10px 0px 0px", color: "#29274C" } : { bottom: 75, right: 50, zIndex: 0, position: "fixed", color: "#29274C" }
          }>
            <span><i className="far fa-3x fa-arrow-alt-circle-up"></i></span>
          </ScrollToTop>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { favorites: state.form.favorites.countries, pois: state.form.favorites.pois, isLoggedIn: state.auth.isLoggedIn, isLoading: state.auth.isLoading }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fetchUserFavorites, removeFromFavorites, addToFavorites
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorites))
