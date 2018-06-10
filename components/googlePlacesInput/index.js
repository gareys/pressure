import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from 'react-native-dotenv'
import { Ionicons } from '@expo/vector-icons';

export default class GooglePlacesInput extends React.Component {
  constructor() {
    super()
    this.GPAutocomplete = null;
    this.onPressGetCurrentLocation = this.onPressGetCurrentLocation.bind(this);
  }

  componentDidUpdate() {
    if (this.props.currentLocation) this.setInputValue();
  }

  setInputValue() {
    this.GPAutocomplete.setState({
      text: 'Using Current Location'
    });
  }

  onPressGetCurrentLocation() {
    this.props.getCurrentLocation();
  }

  render() {
    return (
      <GooglePlacesAutocomplete
        ref={node => this.GPAutocomplete = node}
        placeholder='Input Location'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          this.props.setLocation(details.geometry.location.lat, details.geometry.location.lng, data.description)
        }}
        getDefaultValue={() => ''}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: GOOGLE_PLACES_API_KEY,
          language: 'en', // language of the results
          types: 'geocode' // default: 'geocode'
        }}
        styles={{
          container: {
            backgroundColor: '#592e81',
            width: '100%'
          },
          textInput: {
            backgroundColor: 'transparent',
            color: '#FFF',
            borderColor: '#FFF',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            height: 40
          },
          textInputContainer: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            height: 50
          },
          description: {
            fontWeight: 'bold',
            color: '#FFF'
          },
          poweredContainer: {
            backgroundColor: '#592e81'
          }
        }}
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        renderRightButton={() =>
          <Ionicons style={{marginTop: 10, marginRight: 5, paddingLeft: 5, paddingRight: 7}} onPress={this.onPressGetCurrentLocation} name="md-pin" size={32} color="#FFF" />
        }
      />
    );
  }
}