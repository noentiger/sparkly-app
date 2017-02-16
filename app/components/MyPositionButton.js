/* @flow weak */

import React, { PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, styles } from 'styles';

const MyPositionButton = ({ onPress }) => (
  <TouchableOpacity
    style={[styles.action, mainStyles.container]}
    onPress={() => onPress()}
    activeOpacity={0.8}
  >
    <Icon name="md-locate" size={20} color={colors.gray} />
  </TouchableOpacity>
);

MyPositionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const mainStyles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginVertical: 60,
    marginHorizontal: 15,
  },
});

export default MyPositionButton;
