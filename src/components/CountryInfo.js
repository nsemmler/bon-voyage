import React from 'react'
import PropTypes from 'prop-types'
import CountryMap from './CountryMap'
import GeneralInfo from './GeneralInfo'
import CountryImages from './CountryImages'
import { Tabs, Tab } from 'react-materialize'
import '../styling/CountryInfo.css'

function CountryInfo (props) {
  return (
    <div className="CountryInfo-container">

      <div className="info-and-images-container">
        <div className="info-container">
          { <GeneralInfo country={ props.country } /> }
        </div>
        <div className="images-container">
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
  pointsOfInterest: PropTypes.array.isRequired
}

export default CountryInfo
