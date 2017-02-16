import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import { colors } from 'styles';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = ({ title }) => (
  <View style={{ alignItems: 'center' }}>
    <Text style={{ color: colors.gray }}>
      {title}
    </Text>
  </View>
);

TabIcon.propTypes = propTypes;
export default TabIcon;
