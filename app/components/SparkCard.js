/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Button from 'components/Button';

export default class SparkCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reserved: this.props.reserved,
    };
  }

  reserve(id) {
    this.props.store.reserve(id).then(() => {
      this.props.store.getMyReservations();
      this.setState({
        reserved: true,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>{this.props.address}</Text>
        </View>
        <View>
          <Button title={this.state.reserved ? 'Reserved' : 'Reserve'} onPress={() => this.reserve(this.props.id)} size="small" />
        </View>
      </View>
    );
  }
}

SparkCard.propTypes = {
  reserved: PropTypes.bool,
  address: PropTypes.string,
  store: PropTypes.object,
  id: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
