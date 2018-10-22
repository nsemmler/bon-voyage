import React from 'react'
import PropTypes from 'prop-types'
import CountryMap from './CountryMap'
import GeneralInfo from './GeneralInfo'
import CountryImages from './CountryImages'
import { Tabs, Tab } from 'react-materialize'
import '../styling/CountryInfo.css'

const media_query = window.matchMedia( "(max-width: 700px)" )

function CountryInfo (props) {
  if (media_query.matches) {
     return (
       <div className="CountryInfo-container">
         <div className="tabs-container">
          <Tabs className="countrytabs">
            <Tab title="General Info" active>
              { <GeneralInfo country={ props.country } updateUserFavorites={ props.updateUserFavorites } favorites={ props.favorites } /> }
            </Tab>
            <Tab title="Map">
              {
                <CountryMap latitude={ props.country.latitude }
                            longitude={ props.country.longitude }
                            countryIndex={ props.countryIndex }
                            pointsOfInterest={ props.pointsOfInterest } />
              }
            </Tab>
            <Tab title="Images">
              <div className="images-header">
                <h5></h5>
                <a className="moreimgs-link" href={ `https://www.bing.com/images/search?q=${props.country.name}%20tourist%20attractions` } target="_blank">See more images</a>
              </div>
              { <CountryImages country={ props.country } /> }
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  } else {
     return (
       <div className="CountryInfo-container">
         <div className="info-and-images-container">
           <div className="info-container">
             { <GeneralInfo country={ props.country } updateUserFavorites={ props.updateUserFavorites } favorites={ props.favorites } /> }
           </div>
           <div className="images-container">
             <div className="images-header">
               <h5>Images:</h5>
               <a className="moreimgs-link" href={ `https://www.bing.com/images/search?q=${props.country.name}%20tourist%20attractions` } target="_blank">See more images</a>
             </div>
             { <CountryImages country={ props.country } /> }
           </div>
         </div>
         <div className="map-container">
           {
             <CountryMap latitude={ props.country.latitude }
                         longitude={ props.country.longitude }
                         countryIndex={ props.countryIndex }
                         pointsOfInterest={ props.pointsOfInterest } />
           }
         </div>
       </div>
     )
  }
}

CountryInfo.propTypes = {
  country: PropTypes.object.isRequired,
  countryIndex: PropTypes.number.isRequired,
  pointsOfInterest: PropTypes.array.isRequired,
  updateUserFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired
}

export default CountryInfo
