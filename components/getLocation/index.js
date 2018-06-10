import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RouterButton from 'react-router-native-button';
import { connect } from 'react-redux';

import { setLocation } from '../../reducer';

import GooglePlacesInput from '../googlePlacesInput';

class GetLocation extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: null,
      lng: null,
      currentLocation: null,
      description: null
    }

    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  setLocation(lat, lng, description = null, currentLocation = false) {
    this.setState({
      lat,
      lng,
      currentLocation,
      description,
      error: null
    });

    this.props.setLocation(lat, lng);
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setLocation(position.coords.latitude, position.coords.longitude, null, true)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.helpText}>Select a location or Select the Pin Icon to use your current location, then press continue.</Text>
        <GooglePlacesInput getCurrentLocation={this.getCurrentLocation} currentLocation={this.state.currentLocation} setLocation={this.setLocation} />
        <View styles={styles.bottomButton}>
          <RouterButton
            to="/dates"
            title="Continue"
            color="#FFF"
            disabled={!this.state.lat || !this.state.lng}
            accessibilityLabel="Click to proceed to date selection"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#592e81',
    height: '100%'
  },
  helpText: {
    padding: 10,
    textAlign: 'center',
    color: '#FFF'
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  setLocation: (lat, lng) => dispatch(setLocation(lat, lng))
});

export default connect(mapStateToProps, mapDispatchToProps)(GetLocation);