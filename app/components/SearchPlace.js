/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

const { width } = Dimensions.get('window');

export default class SearchPlace extends Component {


  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        this.props.onGetPlace(place);
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  render() {
    return (

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.openSearchModal()}
          activeOpacity={0.8}
        >
          <Text style={{ color: '#999999' }}>{this.props.placeholder}</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

SearchPlace.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onGetPlace: PropTypes.func.isRequired,
};

SearchPlace.defaultProps = {
  placeholder: 'Enter address',
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 35,
    width: width - 50,
    left: 25,
    right: 25,
  },
  button: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    flexDirection: 'column',
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
  },
});
