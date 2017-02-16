/* @flow weak */

import React, { PropTypes } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors } from 'styles';

const Button = ({ title, onPress, size, color, transparent }) => (
  <TouchableOpacity
    style={
    [
      styles.button,
      styles[size],
      styles[color],
      transparent ? { backgroundColor: 'transparent' } : {},
    ]
    }
    onPress={onPress}
  >
    <Text style={[styles.text, transparent ? { color: colors.gray } : {}]}>{title}</Text>
  </TouchableOpacity>
);

Button.defaultProps = {
  size: 'large',
  color: 'default',
  transparent: false,
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  transparent: PropTypes.bool,
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 5,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.lightGray,
  },
  small: {
    paddingVertical: 5,
    marginBottom: 5,
  },
  large: {
    paddingVertical: 16,
    marginBottom: 20,
  },
  destroy: {
    backgroundColor: colors.destroy,
  },
  default: {
    backgroundColor: colors.actionColor,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});
