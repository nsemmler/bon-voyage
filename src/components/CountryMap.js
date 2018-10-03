import React from 'react'
import PropTypes from 'prop-types'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const CountryMap = withScriptjs(withGoogleMap((props) => {
  return (
    <div id="map">
      <GoogleMap defaultZoom={ 8 } defaultCenter={{ lat: props.latitude, lng: props.longitude }}>
        { false && <Marker position={{ lat: props.latitude, lng: props.longitude }} /> }
      </GoogleMap>
    </div>
  )
}))

CountryMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
}

export default CountryMap
