import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle } from 'react-materialize'

function Recommendations (props) {
  return (
    props.recommendationsArr.map(country => {
      if (country.name.toLowerCase().startsWith(props.countryName.toLowerCase()) || country.name.toLowerCase().includes(props.countryName.toLowerCase())) {
        return <Card className="recommendedCountry" key={ `recommendation-${country.id}` }
          header={ <CardTitle image={ JSON.parse(country.images)[0] }/> }
          title={ ((country.name === country.native_name) || (country.name === 'United States of America')) ? `${country.name}` : `${country.name} (${country.native_name})` }
          onClick={ () => props.displayCountryInformationModal(country) }>
          { country.capital }
        </Card>
      }
    })
  )
}

Recommendations.propTypes = {
  recommendationsArr: PropTypes.array.isRequired,
  displayCountryInformationModal: PropTypes.func.isRequired,
  countryName: PropTypes.string.isRequired
}

export default Recommendations
