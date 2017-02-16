/* @flow weak */

import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import Button from 'components/Button';
import { styles } from 'styles';

const Spark = ({ data }) => (
  <View style={[styles.container, { padding: 20 }]}>
    <Text style={[mainStyles.text, { fontWeight: 'bold' }]}>{data.address}</Text>
    <Text style={mainStyles.text}>Available until { moment(data.ends_at).format('ddd, hA') }</Text>
    <Text style={mainStyles.text}>{ moment(data.ends_at).fromNow() } left</Text>
    <Button title={'Remove Spark'} onPress={() => console.log('remove')} color="destroy" />
  </View>
);

Spark.propTypes = {
  data: PropTypes.object,
};

export default Spark;

const mainStyles = StyleSheet.create({
  text: {
    fontSize: 21,
    marginVertical: 10,
    textAlign: 'center',
  },
});
