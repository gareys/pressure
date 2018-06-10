import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Dates from 'react-native-dates';
import moment from 'moment';
import RouterButton from 'react-router-native-button';
import { connect } from 'react-redux';

import { setDateRange } from '../../reducer';


class GetDates extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: null,
      focus: 'startDate',
      startDate: moment().subtract(3, 'days'),
      endDate: moment()
    };
    props.setDateRange(moment().subtract(3, 'days').format('MM-DD-YYYY'), moment().format('MM-DD-YYYY'))
  }

  render() {
    const { location = {} } = this.props;
    const { state = {} } = location;
    const { lat, lng } = state;

    const isDateBlocked = (date) =>
      !date.isBetween(moment().subtract(90, 'days'), moment());

    const onDateChange = ({ startDate, endDate, focusedInput }) => {
      const start = moment(startDate).isSame(moment().subtract(89, 'days'), 'day') ? moment().subtract(90, 'days') : moment(moment(startDate)).subtract(1, 'days');
      const end = moment(startDate).isSame(moment(), 'day') ? moment() : moment(moment(startDate)).add(1, 'days');

      this.setState({ ...this.state, startDate: start, endDate: end});
      this.props.setDateRange(moment(start).format('MM-DD-YYYY'), moment(end).format('MM-DD-YYYY'))
    }

    return (
      <View style={styles.container}>
        <Text style={styles.helpText}>Select a date below. This will highlight a three day range around your selection. Then press Get Results.</Text>
        <Dates
          onDatesChange={onDateChange}
          isDateBlocked={isDateBlocked}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          focusedInput={this.state.focus}
          range
        />
        <View styles={styles.bottomButton}>
          <RouterButton
            to="/pressure"
            title="Get Results"
            color="#FFF"
            disabled={!this.state.startDate || !this.state.endDate}
            accessibilityLabel="Click to proceed to results"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#592e81',
    flex: 1,
    flexGrow: 1,
    marginTop: 10
  },
  helpText: {
    padding: 10,
    textAlign: 'center',
    color: '#FFF'
  },
  date: {
    marginTop: 20
  },
  focused: {
    color: 'blue'
  },
  bottomButton: {
    flex: 0.1,
    position: 'absolute',
    bottom: -10,
  }
});

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  setDateRange: (startDate, endDate) => dispatch(setDateRange(startDate, endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(GetDates);