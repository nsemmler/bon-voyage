import React from 'react'
import PropTypes from 'prop-types'
import CountryMap from './CountryMap'
import GeneralInfo from './GeneralInfo'
import CountryImages from './CountryImages'
import PointsOfInterest from './PointsOfInterest'
import { Tabs, Tab } from 'react-materialize'

const googleMapsURL = `https://maps.googleapis.com/maps/api/js?key=${ process.env.REACT_APP_GOOGLE_MAPS_KEY }`

function CountryInfo (props) {
  return (
    <div className="CountryInfo-container">
      <div className="tabs-container">
        <Tabs className="countrytabs">
          <Tab title="General Info" active>
            { <GeneralInfo country={ props.country } /> }
          </Tab>
          <Tab title="Maps">
            { <CountryMap latitude={ props.country.latitude }
                          longitude={ props.country.longitude }
                          googleMapURL={ googleMapsURL }
                          clickableIcons={ false }
                          loadingElement={ <div style={{ height: "100%" }} /> }
                          containerElement={ <div style={{ height: "400px" }} /> }
                          mapElement={ <div style={{ height: "100%" }} /> } /> }
          </Tab>
          <Tab title="Points of Interest">
            { <PointsOfInterest countryIndex={ props.countryIndex } pointsOfInterest={ props.pointsOfInterest } /> }
          </Tab>
          <Tab title="Images">
            { <CountryImages country={ props.country } /> }
          </Tab>
        </Tabs>
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
