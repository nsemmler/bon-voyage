import React from 'react'
import PropTypes from 'prop-types'
import CountryMap from './CountryMap'

function CountryInfo (props) {
  return (
    <div>
      <ul>
        <li className="countryInfoItem">Region: { props.country.region }</li>
        <li className="countryInfoItem">Subregion: { props.country.subregion }</li>
        <li className="countryInfoItem">Population: { props.country.population }</li>
        <li className="countryInfoItem">Lon/Lat: { props.country.longitude }/{ props.country.latitude }</li>
        <li className="countryInfoItem">Currency: { props.country.currency_name })({ props.country.currency_symbol })</li>
        <li className="countryInfoItem">Languages: { props.country.languages }</li>
        <li className="countryInfoItem">Flag: { <img src={ props.country.flag } alt={ `${props.country.name} Flag` } /> }</li>
      </ul>
      <br/>
      <CountryMap latitude={ props.country.latitude } longitude={ props.country.longitude } />
    </div>
  )
}

CountryInfo.propTypes = {
  country: PropTypes.object.isRequired
}

export default CountryInfo
