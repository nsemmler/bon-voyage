import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle } from 'react-materialize'
import MaterialIcon from 'material-icons-react'

function Recommendations (props) {
  return (
    props.recommendationsArr.map((country, countryIndex) => {
      if (country.name.toLowerCase().startsWith(props.countryName.toLowerCase()) || country.name.toLowerCase().includes(props.countryName.toLowerCase())) {
        return <Card className="recommendedCountry" key={ `recommendation-${country.id}` }
          header={ <CardTitle image={ JSON.parse(country.images)[0] } /> }
          title={ `${country.name}` }
          onClick={ () => props.displayCountryInformationModal(country, countryIndex) }>
          { country.capital }{ false && <MaterialIcon icon="favorite" size="medium" color="#d10808"/>}
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
