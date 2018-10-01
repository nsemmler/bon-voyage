import React from 'react'
import PropTypes from 'prop-types'

function CountryImages (props) {
  return (
    <div className="images-container">
      {
        JSON.parse(props.country.images).map((img, i) => {
          return <img src={ img } alt={ `${props.country.name} Image ${i+1}` } className="countryimg" key={ `${props.country.name}-img-${i}` } />
        })
      }
    </div>
  )
}

CountryImages.propTypes = {
  country: PropTypes.object.isRequired
}

export default CountryImages
