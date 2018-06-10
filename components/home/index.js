import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Link } from 'react-router-native';
import { Ionicons } from '@expo/vector-icons';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Ionicons style={styles.icon} name="md-rainy" size={100} color="#545454" />
        <Link to="/location">
          <Text style={styles.getStarted}>Get Started</Text>
        </Link>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#592e81',
    height: '100%',
  },
  getStarted: {
    color: '#FFF',
    fontSize: 30,
    textDecorationLine: 'underline'
  },
  icon: {
    textAlign: 'center',
    color: 'white'
  }
});