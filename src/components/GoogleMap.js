import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './GoogleMap.css';
import Cards from './Cards';


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

                {/* add ammnities here for responsive deisng */}
                <p>The ammenities will go here and the page will still be responsive</p>  

               </div>
          </div> 
        </div>
      </div>
      

        

        
     
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAJy82TVP3JryIg444dv-DfcDUnFoG-tt4')
})(MapContainer)