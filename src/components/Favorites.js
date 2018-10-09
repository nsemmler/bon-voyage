import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle } from 'react-materialize'
import MaterialIcon from 'material-icons-react'
import Modal from 'react-modal'

function Favorites (props) {
  // add a generic thingy that prompts a user to add favorites by taking the quiz (if none)
  return (
    <div className="favorites-container">
      <div className="Favorites-header">
        <h5>Favorites:</h5>
        <div className="filter-wrapper">
          <span><input onChange={ (e) => props.filterFavorites(e) } id="filter" placeholder="Filter Favorites" /><i className="material-icons">search</i></span>
        </div>
      </div>
      <br/>
      <div className="favorites-container" id="favorites">
        <div className="favorites">
          <Modal isOpen={ props.showCountryInfo } contentLabel="Recommended Country Information" onRequestClose={ () => props.displayCountryInformationModal({}) } shouldCloseOnOverlayClick={ true }>
            <button className="favoritebtn" onClick={ () => props.renameThisFnLater(props.selectedCountry, props.selectedCountryId) }><MaterialIcon icon="favorite" size="medium" color="#d10808"/></button>
            <div className="modal-container">
              <p>PLACEHOLDER FOR COUNTRY INFO</p>
            </div>
          </Modal>
          {
            props.favorites.countries.map((country, countryIndex) => {
              if (country.name.toLowerCase().startsWith(props.countryName.toLowerCase()) || country.name.toLowerCase().includes(props.countryName.toLowerCase())) {
                return <Card className="favoriteCountry" key={ `favorite-${country.id}` }
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