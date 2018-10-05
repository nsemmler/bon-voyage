import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle } from 'react-materialize'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox')
const { compose, withProps, withStateHandlers } = require('recompose')

const googleMapsURL = `https://maps.googleapis.com/maps/api/js?key=${ process.env.REACT_APP_GOOGLE_MAPS_KEY }`

const CountryMap = compose(
  withProps({
    googleMapURL: googleMapsURL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(() => ({
    isOpen: {}
   }), {
    onToggleOpen: ({ isOpen }) => (poiIndex) => {
      if (poiIndex === 100) return { isOpen: {} }

      if (isOpen.hasOwnProperty(poiIndex)) {
        return { isOpen: { ...isOpen, [poiIndex]: !isOpen[poiIndex]} }
      } else {
        return { isOpen: { ...isOpen, [poiIndex]: true} }
      }
    }
  }
),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap defaultZoom={ 6 } defaultCenter={{ lat: props.latitude, lng: props.longitude }} onClick={ () => props.onToggleOpen(100) }>
    {
      props.pointsOfInterest[props.countryIndex].map((poi, poiIndex) => {
        return <Marker position={{ lat: poi.latitude, lng: poi.longitude }} key={ `marker-${poiIndex}` } onClick={ () => props.onToggleOpen(poiIndex) }>
          { props.isOpen[poiIndex] && <InfoBox id={ `infobox-${poiIndex}` } onCloseClick={ () => props.onToggleOpen(poiIndex) } key={ `countryinfobox-${poiIndex}` } options={{ closeBoxURL: '', enableEventPropagation: true }} >
            <div style={{ opacity: 1, padding: '4px' }}>
              <div style={{ fontSize: '14px', fontColor: 'black' }}>

                {
                  poi.wikipedia_link ? <Card className='poi-card' key={ `poi-card-key-${poiIndex}` }
                    header={<CardTitle image={ JSON.parse(poi.image)[0] }>{ poi.name }<div className="badge score-badge">{ poi.score.toFixed(1) }</div></CardTitle>}
                    actions={[<a href={ poi.wikipedia_link } target="_blank">Read More</a>]}>
                    { poi.description }
                  </Card> : <Card className='poi-card'
                    header={<CardTitle image={ JSON.parse(poi.image)[0] }>{ poi.name }<div className="badge score-badge">{ poi.score.toFixed(1) }</div></CardTitle>}>
                    { poi.description }
                  </Card>
                }

              </div>
            </div>
          </InfoBox> }
        </Marker>
      })
    }
  </GoogleMap>
)

CountryMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  pointsOfInterest: PropTypes.array.isRequired,
  countryIndex: PropTypes.number.isRequired
}

export default CountryMap
