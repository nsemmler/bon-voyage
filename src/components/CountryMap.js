import React from 'react'
import PropTypes from 'prop-types'
import GoogleMaps from 'simple-react-google-maps'
const { REACT_APP_GOOGLE_MAPS_KEY } = process.env

function CountryMap (props) {
  return (
    <GoogleMaps
      apiKey={ REACT_APP_GOOGLE_MAPS_KEY }
      style={ { height: "400px", width: "100%" } }
      zoom={ 6 }
      center={ { lat: props.latitude, lng: props.longitude } }
    />
  )
}

CountryMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
}

export default CountryMap
