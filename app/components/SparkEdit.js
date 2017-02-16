/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Modal,
  DatePickerIOS,
} from 'react-native';
import StallService from 'services/Stall';
import Button from 'components/Button';
import { styles } from 'styles';

export default class SparkEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeZoneOffsetInHours: ((-1) * (new Date()).getTimezoneOffset()) / 60,
    };
  }

  onDateChange(date) {
    StallService.data.ends_at = date;
  }

  saveSpark() {
    StallService.create().then(() => {
      this.props.onSave();
    }).catch((err) => {
      console.error(err);
    });
  }

  render() {
    const { visible, address, ends_at, onCancel } = this.props;
    const { timeZoneOffsetInHours } = this.state;

    return (
      <View>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={visible}
        >
          <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold' }}>{address}</Text>
            </View>
            <View>
              <DatePickerIOS
                date={ends_at}
                mode="datetime"
                timeZoneOffsetInMinutes={timeZoneOffsetInHours * 60}
                onDateChange={this.onDateChange.bind(this)}
              />
            </View>
            <View style={{ padding: 20 }}>
              <Button title={'Make parking spot available'} onPress={() => this.saveSpark()} />
              <Button title={'Cancel'} onPress={() => onCancel()} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

SparkEdit.propTypes = {
  visible: PropTypes.bool,
  address: PropTypes.string,
  ends_at: PropTypes.instanceOf(Date),
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};
