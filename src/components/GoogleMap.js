import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './GoogleMap.css';
import Cards from './Cards';
import Dropdown1 from './Dropdowns/Dropdown1';
import Dropdown2 from './Dropdowns/Dropdown2';
import Dropdown3 from './Dropdowns/Dropdown3';
import Dropdown4 from './Dropdowns/Dropdown4';
import Dropdown5 from './Dropdowns/Dropdown5';
import Dropdown6 from './Dropdowns/Dropdown6';
import Dropdown7 from './Dropdowns/Dropdown7';
import Dropdown8 from './Dropdowns/Dropdown8';
import Dropdown9 from './Dropdowns/Dropdown9';



export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      address: '',

      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
  
      mapCenter: {
        lat: 49.2827291,
        lng: -123.1207375
      }
    };
  }

  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);

        // update center state
        this.setState({ mapCenter: latLng });
      })
      .catch(error => console.error('Error', error));
  };
 
  render() {
    /*Added this to fit map into container */
    const containerStyle = {
      position: 'relative',  
      width: '100%',
      height: '100%'
    }
    return (
      
      <div class = 'main-page-wrapper'>
        <div class = 'row'>
          <div class = 'column-30'>

          <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div className='SB_suggestions'>
                <input 
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input',
                  })}
                
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#007FFF', cursor: 'pointer' /*Hover*/}
                      : { backgroundColor: '#ffffff', cursor: 'pointer',};
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
              </div>
              <div className='main_card'></div>
              <Cards/>
            </div>
          )}
        </PlacesAutocomplete>
          </div>

          
          {/* change the column to 70px */}
          <div class = 'column-70'> 
            <div className="map-container">
                <Map
                /*Added container style to fit map into container */
                
                  containerStyle={containerStyle}
                  google={this.props.google}
                  initialCenter={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                  }}
                  center={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                  }}
                >
                  <Marker
                    position={{
                      lat: this.state.mapCenter.lat,
                      lng: this.state.mapCenter.lng
                    }} />
                </Map>
              </div>

              {/* create container for ammenities! */}
              <div className='amenities-container'>
                <div className='Banner'>
                  <h2>Nearby Ameneties</h2></div>
                <div className='indiv-ameneties'>
                  <div className='Transport'>
                    <h3>Transport</h3>
                    <div className='transport-1'>
                      <Dropdown1></Dropdown1>
                      <Dropdown2></Dropdown2>
                      <Dropdown3></Dropdown3>
                    </div>
                  </div>
                  <div className='Retail'>
                    <h3>Retail</h3>
                    <div className='transport-1'>
                      <Dropdown4></Dropdown4>
                      <Dropdown5></Dropdown5>
                      <Dropdown6></Dropdown6>
                    </div>
                  </div>
                  <div className='Services'>
                    <h3>Services</h3>
                    <div className='transport-1'>
                      <Dropdown7></Dropdown7>
                      <Dropdown8></Dropdown8>
                      <Dropdown9></Dropdown9>
                    </div>
                  </div>
                </div>

                

                {/* add ammnities here for responsive deisng */}
               </div>
          </div> 
        </div>
      </div>
      

        

        
     
    )
  }
}

const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelectorAll('.menu li');
  const selected = dropdown.querySelector('.selected');

  select.addEventListener('click',() => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-open');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText;
      select.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');
      menu.classList.remove('menu-open');
      options.forEach(option => {
        option.classList.remove('active');
      });
      option.classList.add('active');
    })
  })
})

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAJy82TVP3JryIg444dv-DfcDUnFoG-tt4')
})(MapContainer)