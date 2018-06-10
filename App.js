import React from 'react';
import { WEATHER_API_ORIGIN } from 'react-native-dotenv'
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { NativeRouter, Route, Link } from 'react-router-native'
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { createLogger } from 'redux-logger'

import reducer from './reducer';

import Home from './components/home';
import GetLocation from './components/getLocation';
import GetDates from './components/getDates';
import GetPressure from './components/getPressure';

const client = axios.create({
  baseURL: WEATHER_API_ORIGIN,
  responseType: 'json'
});

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ })

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client), loggerMiddleware));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <View style={styles.container}>
            <View style={styles.nav}>
              <Link
                to="/"
                underlayColor='#592e81'
                style={styles.navItem}>
                <View style={styles.navLogo}>
                  <Ionicons style={styles.navLogoIcon} name="md-rainy" size={32} color="#FFF" />
                  <Text style={styles.navLogoText}>Pressure App</Text>
                </View>
              </Link>
            </View>
            <Route exact path="/" render={() => <Home/>}/>
            <Route path="/location" render={() => <GetLocation/>}/>
            <Route path="/dates" render={() => <GetDates/>}/>
            <Route path="/pressure" render={() => <GetPressure/>}/>
          </View>
        </NativeRouter>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: '100%',
    backgroundColor: '#592e81'
  },
  header: {
    fontSize: 20,
  },
  nav: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#592e81'
  },
  navLogo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navLogoIcon: {
    marginRight: 10
  },
  navLogoText: {
    color: '#FFF',
    fontSize: 20
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});