import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'react-materialize'
import '../styling/CountryInfo.css'

function CountryImages (props) {
  const imagesArr = JSON.parse(props.country.images).map((img, i) => {
    return img
  })

  return (
    <div className="images-container">
      <Carousel className="img-carousel" options={{ fullWidth: true }} images={ imagesArr } />
    </div>
  )
}

CountryImages.propTypes = {
  country: PropTypes.object.isRequired
}

export default CountryImages
