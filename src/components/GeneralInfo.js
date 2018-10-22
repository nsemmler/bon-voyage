import React, { Component } from 'react'
import MaterialIcon from 'material-icons-react'
import '../styling/CountryInfo.css'

class GeneralInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFavorited: false
    }
  }

  componentWillMount () {
    if (this.props.favorites.map(country => country.id).includes(this.props.country.id)) {
      this.setState({ isFavorited: true })
    } else {
      this.setState({ isFavorited: false })
    }
  }

  favoriteCountry () {
    this.setState({ isFavorited: !this.state.isFavorited })
  }

  render () {
    return (
      <div className="general-info-container">
        <div className="info-div">
          <h4 className="country-name">{ this.props.country.name }</h4>
          <h5 className="country-capital">{ this.props.country.capital }</h5>
          <ul className="info-items">
            <li className="countryInfoItem">Population: { this.props.country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</li>
            <li className="countryInfoItem">Currency: { this.props.country.currency_name } ({ this.props.country.currency_symbol })</li>
            <li className="countryInfoItem">Languages: { JSON.parse(this.props.country.languages).join(', ') }</li>
          </ul>
          {
            this.state.isFavorited &&
            <button className="fav-btn" onClick={ () => {
              this.favoriteCountry()
              this.props.updateUserFavorites(this.props.country, this.props.country.id)
            }}>
              <MaterialIcon icon="favorite"  size="medium" color="#d10808"/>
            </button>
          }
          {
            !this.state.isFavorited &&
            <button className="fav-btn" onClick={ () => {
              this.favoriteCountry()
              this.props.updateUserFavorites(this.props.country, this.props.country.id)
            }}>
              <MaterialIcon icon="favorite_border"  size="medium" color="#d10808"/>
            </button>
          }
        </div>
        <div className="flag-div">
          <img src={ this.props.country.flag } alt={ `${this.props.country.name} Flag` } className="countryflag" />
        </div>
      </div>
    )
  }
}

export default GeneralInfo
