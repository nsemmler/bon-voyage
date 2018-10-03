import React from 'react'
import PropTypes from 'prop-types'

function PointsOfInterest (props) {
  var index = props.countryIndex

  return (
    <div>
      <p>Name: { props.pointsOfInterest[index][0].name }</p>
      <p>Desc: { props.pointsOfInterest[index][0].description }</p>
      <p>Score: { props.pointsOfInterest[index][0].score }</p>
      <p>Wiki Link: { props.pointsOfInterest[index][0].wikipedia_link }</p>
      <p>Lon: { props.pointsOfInterest[index][0].longitude }</p>
      <p>Lat: { props.pointsOfInterest[index][0].latitude }</p>
    </div>
  )
}

PointsOfInterest.propTypes = {
  pointsOfInterest: PropTypes.array.isRequired,
  countryIndex: PropTypes.number.isRequired
}

export default PointsOfInterest
