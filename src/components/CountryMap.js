import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle } from 'react-materialize'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import '../styling/Map.css'
const { InfoBox } = require('react-google-maps/lib/components/addons/InfoBox')
const { compose, withProps, withStateHandlers } = require('recompose')

const googleMapsURL = `https://maps.googleapis.com/maps/api/js?key=${ process.env.REACT_APP_GOOGLE_MAPS_KEY }`

const media_query = window.matchMedia( "(max-width: 700px)" )

const CountryMap = compose(
  withProps({
    googleMapURL: googleMapsURL,
    loadingElement: <div style={(media_query.matches) ? { height: `100%` } : { height: `100%` }} />,
    containerElement: <div style={(media_query.matches) ? { height: `500px` } : { height: `650px` }} />,
    mapElement: <div style={(media_query.matches) ? { height: `100%` } : { height: `100%` }} />,
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
          {
            props.isOpen[poiIndex] && <InfoBox id={ `infobox-${poiIndex}` } className="poi-infobox" onCloseClick={ () => props.onToggleOpen(poiIndex) } key={ `countryinfobox-${poiIndex}` } options={{ closeBoxURL: '', enableEventPropagation: true }} >
              {
                poi.wikipedia_link ?
                  <Card className='poi-card' key={ `poi-card-key-${poiIndex}` }
                    header={<CardTitle image={ JSON.parse(poi.image)[poiIndex] }><div className="badge score-badge">{ poi.score.toFixed(1) }</div>{ poi.name }</CardTitle>}
                    actions={[<a href={ poi.wikipedia_link } target="_blank">Read More</a>]}>
                    { poi.description }
                  </Card>
                :
                  <Card className='poi-card'
                    header={<CardTitle image={ JSON.parse(poi.image)[poiIndex] }>{ poi.name }<div className="badge score-badge">{ poi.score.toFixed(1) }</div></CardTitle>}>
                    { poi.description }
                  </Card>
              }
            </InfoBox>
          }
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
