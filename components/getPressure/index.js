import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { getPressureData } from '../../reducer';

class GetPressure extends React.Component {
  componentDidMount() {
    console.log(this.props)
    this.props.getPressureData(this.props.lat, this.props.lng, this.props.startDate, this.props.endDate);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.helpText}>Pressure Data</Text>
        <ScrollView>
          <Text style={styles.data}>{JSON.stringify(this.props.pressureData, null ,2)}</Text>
        </ScrollView>
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
  data: {
    padding: 10,
    color: '#FFF'
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = {
  getPressureData
};

export default connect(mapStateToProps, mapDispatchToProps)(GetPressure);