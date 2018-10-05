import React from 'react'
import PropTypes from 'prop-types'
import CountryMap from './CountryMap'
import GeneralInfo from './GeneralInfo'
import CountryImages from './CountryImages'
import { Tabs, Tab } from 'react-materialize'

function CountryInfo (props) {
  return (
    <div className="CountryInfo-container">
      <div className="tabs-container">
        <Tabs className="countrytabs">
          <Tab title="General Info" active>
            { <GeneralInfo country={ props.country } /> }
          </Tab>
          <Tab title="Points of Interest">
            { <CountryMap latitude={ props.country.latitude }
                          longitude={ props.country.longitude }
                          countryIndex={ props.countryIndex }
                          pointsOfInterest={ props.pointsOfInterest } /> }
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
