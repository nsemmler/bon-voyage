import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle } from 'react-materialize'
import MaterialIcon from 'material-icons-react'
import Modal from 'react-modal'
import CountryInfo from './CountryInfo'
import '../styling/Favorites.css'

function Favorites (props) {
  // add a generic thingy that prompts a user to add favorites by taking the quiz (if none)
  return (
    <div className="Favorites">
      <div className="favorites-header-container">
        <h5 className="favorites-header">Favorites:</h5>
        <div className="filter-wrapper">
          <input onChange={ (e) => props.filterFavorites(e) } id="filter" placeholder="Filter Favorites" autoFocus/>
        </div>
      </div>
      <br/>
      <div className="favorites-container" id="favorites">
        <div className="favorites">
          <Modal isOpen={ props.showCountryInfo } contentLabel="Recommended Country Information" onRequestClose={ () => props.displayCountryInformationModal({}) } shouldCloseOnOverlayClick={ true }>
            <button className="favoritebtn" onClick={ () => props.renameThisFnLater(props.selectedCountry, props.selectedCountryId) }><MaterialIcon icon="favorite" size="medium" color="#d10808"/></button>
            <div className="modal-container">
              { (Object.keys(props.selectedCountry).length !== 0) && <CountryInfo country={ props.selectedCountry } countryIndex={ props.selectedCountryId } pointsOfInterest={ props.favorites.pois } /> }
            </div>
          </Modal>
          { (props.favorites.countries.length) ?
              props.favorites.countries.map((country, countryIndex) => {
                if (country.name.toLowerCase().startsWith(props.countryName.toLowerCase()) || country.name.toLowerCase().includes(props.countryName.toLowerCase())) {
                  const imageURL = JSON.parse(country.images)[0]
                  return <div className="favoriteCountry-div" onClick={ () => props.displayCountryInformationModal(country, countryIndex) } style={{ backgroundImage: `url(${imageURL})` }}>
                    <p className="favorite-name">{ `${country.name}` }</p>
                  </div>
                }
              })
            :
              <div className="empty-favorites">
                <p>You currently have no favorites.  To add countries to favorites, take the Quiz and click the heart container for any country.</p>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

Favorites.propTypes = {
  favorites: PropTypes.object.isRequired,
  displayCountryInformationModal: PropTypes.func.isRequired,
  filterFavorites: PropTypes.func.isRequired,
  showCountryInfo: PropTypes.bool.isRequired,
  countryName: PropTypes.string.isRequired,
  renameThisFnLater: PropTypes.func.isRequired,
  selectedCountry: PropTypes.object.isRequired,
  selectedCountryId: PropTypes.number.isRequired,
}

export default Favorites
