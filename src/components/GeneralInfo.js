import React from 'react'
import PropTypes from 'prop-types'
import MaterialIcon from 'material-icons-react'
import '../styling/CountryInfo.css'

function GeneralInfo (props) {
  return (
    <div className="general-info-container">
      <div className="info-div">
        <h4 className="country-name">{ props.country.name }</h4>
        <h5 className="country-capital">{ props.country.capital }</h5>
        <ul className="info-items">
          <li className="countryInfoItem">Population: { props.country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</li>
          <li className="countryInfoItem">Currency: { props.country.currency_name } ({ props.country.currency_symbol })</li>
          <li className="countryInfoItem">Languages: { JSON.parse(props.country.languages).join(', ') }</li>
        </ul>
        <button className="fav-btn" onClick={ () => props.updateUserFavorites(props.country, props.country.id) }><MaterialIcon icon={ (props.favorites.map(country => country.id).includes(props.country.id)) ? "favorite" : "favorite_border" } size="medium" color="#d10808"/></button>
      </div>
      <div className="flag-div">
        <img src={ props.country.flag } alt={ `${props.country.name} Flag` } className="countryflag" />
      </div>
    </div>
  )
}

GeneralInfo.propTypes = {
  country: PropTypes.object.isRequired,
  updateUserFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired
}

export default GeneralInfo
