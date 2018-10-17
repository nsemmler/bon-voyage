import React from 'react'
import PropTypes from 'prop-types'
import '../styling/CountryInfo.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

function CountryImages (props) {
  const imagesArr = JSON.parse(props.country.images).map((img, i) => {
    return img
  })

  return (
    <Carousel className="img-carousel" showThumbs={ false } showArrows={ true } showIndicators={ false }>
      {
        imagesArr.map((url, index) => {
          return <div className="carousel-div" key={ index }>
             <img src={ url } />
             <p>Legend</p>
          </div>
        })
      }
    </Carousel>
  )
}

CountryImages.propTypes = {
  country: PropTypes.object.isRequired
}

export default CountryImages
