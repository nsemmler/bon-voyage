import React from 'react'
import PropTypes from 'prop-types'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox")

var userClickedMarker = false

const CountryMap = withScriptjs(withGoogleMap((props) => {
  const poisArr = props.pointsOfInterest[props.countryIndex]
  return (
    <div id="map">
      <GoogleMap defaultZoom={ 6 } defaultCenter={{ lat: props.latitude, lng: props.longitude }}>
        {
          (poisArr.length > 0) && poisArr.map((poi, poiIndex) => {
            return <Marker position={{ lat: poi.latitude, lng: poi.longitude }} key={ `marker-${poiIndex}` } onClick={ () => {
              console.log('CLICKED MARKER');
              userClickedMarker = !userClickedMarker
            } }>
                      {
                        userClickedMarker && <InfoBox className="infobox" onCloseClick={ () => { userClickedMarker = !userClickedMarker } } options={{ closeBoxURL: ``, enableEventPropagation: true }} >
                          <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                            <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                              Hello, Kaohsiung!
                              { console.log('INSIDE INFOBOX!!!!!!!!!!') }
                            </div>
                          </div>
                        </InfoBox>
                      }
                    </Marker>
          })
        }
      </GoogleMap>
    </div>
  )
}))

CountryMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  pointsOfInterest: PropTypes.array.isRequired,
  countryIndex: PropTypes.number.isRequired
}

export default CountryMap
