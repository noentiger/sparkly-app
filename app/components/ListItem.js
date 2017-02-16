import React, { PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from 'styles';

const Row = props => (
  <TouchableOpacity onPress={props.onPress} style={styles.container}>
    <Text style={styles.text}>
      {props.address}
    </Text>
    <View>
      <Icon name="ios-arrow-forward" size={30} color={colors.gray} />
    </View>
  </TouchableOpacity>
);

Row.propTypes = {
  onPress: PropTypes.func,
  address: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
});

export default Row;
