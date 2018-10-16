import React from 'react'
import PropTypes from 'prop-types'
import CountryMap from './CountryMap'
import GeneralInfo from './GeneralInfo'
import CountryImages from './CountryImages'
import '../styling/CountryInfo.css'

function CountryInfo (props) {
  return (
    <div className="CountryInfo-container">
      <div className="info-and-images-container">
        <div className="info-container">
          { <GeneralInfo country={ props.country } updateUserFavorites={ props.updateUserFavorites } favorites={ props.favorites } /> }
        </div>
        <div className="images-container">
          <div className="images-header">
            <h5>Images:</h5>
            <a className="moreimgs-link" href={ `https://www.bing.com/images/search?q=${props.country.name}` }>See more images</a>
          </div>
          { <CountryImages country={ props.country } /> }
        </div>
      </div>
      <div className="map-container">
        { <CountryMap latitude={ props.country.latitude }
                      longitude={ props.country.longitude }
                      countryIndex={ props.countryIndex }
                      pointsOfInterest={ props.pointsOfInterest } /> }
      </div>
    </div>
  )
}

CountryInfo.propTypes = {
  country: PropTypes.object.isRequired,
  countryIndex: PropTypes.number.isRequired,
  pointsOfInterest: PropTypes.array.isRequired,
  updateUserFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired
}

export default CountryInfo
