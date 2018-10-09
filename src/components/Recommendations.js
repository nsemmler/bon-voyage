import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle } from 'react-materialize'
import MaterialIcon from 'material-icons-react'
import Modal from 'react-modal'
import CountryInfo from './CountryInfo'
import SelectedAnswersChips from './SelectedAnswersChips'

function backToQuiz (props) {
  props.history.push("/quiz")
}

function Recommendations (props) {
  const favoritesIds = props.favorites.countries.map(country => country.id)

  return (
    <div className="Main">
      <div className="main-header">
        <h5>Recommended Travel Destinations:</h5>
        <button className="backToQuiz" onClick={ () => backToQuiz(props) } waves="light" type="button">Update Quiz</button>
        <div className="search-wrapper">
          <span><input onChange={ props.filterRecommendations } id="search" placeholder="Filter Countries" /><i className="material-icons">search</i></span>
        </div>
        <SelectedAnswersChips chipsArr={ props.chipsArr }/>
      </div>
      <br/>
      <div className="response-container" id="responses">
        <div className="recommendations">
          <Modal id="modal" isOpen={ props.showCountryInfo } contentLabel="Recommended Country Information" onRequestClose={ () => props.displayCountryInformationModal({}) } shouldCloseOnOverlayClick={ true }>
            <button className="favoritebtn" onClick={ () => props.renameThisFnLater(props.selectedCountry, props.selectedCountryId) }><MaterialIcon icon={ favoritesIds.includes(props.selectedCountry.id) ? "favorite" : "favorite_border" } size="medium" color="#d10808"/></button>
            <div className="modal-container">
              { (Object.keys(props.selectedCountry).length !== 0) && <CountryInfo country={ props.selectedCountry } countryIndex={ props.selectedCountryId } pointsOfInterest={ props.pois } /> }
            </div>
          </Modal>

          {
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
          }
        </div>
      </div>
    </div>
  )
}

// Recommendations.propTypes = {
//   recommendationsArr: PropTypes.array.isRequired,
//   displayCountryInformationModal: PropTypes.func.isRequired,
//   countryName: PropTypes.string.isRequired,
//   chipsArr: PropTypes.array.isRequired,
//   returnToQuiz: PropTypes.func.isRequired,
//   retakeQuiz: PropTypes.func.isRequired,
//   filterRecommendations: PropTypes.func.isRequired,
//   displayCountryInformationModal: PropTypes.func.isRequired,
//   showCountryInfo: PropTypes.bool.isRequired,
//   selectedCountry: PropTypes.obj.isRequired,
//   selectedCountryId: PropTypes.number.isRequired,
//   pois: PropTypes.array.isRequired
// }

export default Recommendations
