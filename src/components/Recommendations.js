import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle } from 'react-materialize'
import MaterialIcon from 'material-icons-react'
import Modal from 'react-modal'
import CountryInfo from './CountryInfo'
import SelectedAnswersChips from './SelectedAnswersChips'
import '../styling/Recommendations.css'

function Recommendations (props) {
  const favoritesIds = props.favorites.countries.map(country => country.id)

  return (
    <div className="Recommendations">
      <div className="recommendations-header-container">
        <div className="quiz-buttons-and-header">
          <button className="btn back2quiz" onClick={ props.returnToQuiz } waves="light" type="button">Update Quiz</button>
          <h5 className="recommendations-header">Recommendations:</h5>
          <button className="btn retakeQuiz" onClick={ props.retakeQuiz } waves="light" type="button">Retake Quiz</button>
        </div>
        <div className="filter-wrapper">
          <input onChange={ props.filterRecommendations } id="recommendations-filter" placeholder="Filter Countries" autoFocus />
        </div>
        <SelectedAnswersChips chipsArr={ props.chipsArr }/>
      </div>
      <br/>
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
              const imageURL = JSON.parse(country.images)[0]
              return <div className="recommendedCountry-div" onClick={ () => props.displayCountryInformationModal(country, countryIndex) } style={{ backgroundImage: `url(${imageURL})` }}>
                { favoritesIds.includes(country.id) && <button className="recommended-fav-icon"><MaterialIcon className="favd-recommendation" icon="favorite" size="medium" color="#d10808"/></button> }
                <p className="recommendation-name">{ `${country.name}` }</p>
              </div>
            }
          })
        }
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
