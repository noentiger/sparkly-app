/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  AppState,
} from 'react-native';

import ListItem from 'components/ListItem';
import { Actions } from 'react-native-router-flux';
import User from 'stores/User';
import { observer } from 'mobx-react/native';
import Button from 'components/Button';
import Stall from 'stores/Stall';
import { styles } from 'styles';

@observer
export default class Add extends Component {

  componentWillMount() {
    Stall.getMine();
  }

  componentDidMount() {
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        Stall.getMine();
      }
    }
      );
  }

  get list() {
    if (Stall.myStalls.length) {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      const dataSource = ds.cloneWithRows(Stall.myStalls.slice());

      return (
        <ListView
          enableEmptySections
          dataSource={dataSource}
          renderRow={
              rowData => (
                <ListItem
                  address={rowData.address}
                  onPress={() =>
                            Actions.tabSparkPage({ data: rowData, title: rowData.address })
                        }
                />
              )
          }
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={mainStyles.separator} />}
        />
      );
    } else {
      return <Text style={styles.emptyText}>Start by adding your spark now.</Text>;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.list}
        <View style={{ padding: 20, marginBottom: 25 }}>
          <Button onPress={() => Actions.tabAdd({ editMode: true })} title={'Add new spark'} />
          <Button onPress={() => User.logout()} title={'Log Out'} color="destroy" />
        </View>
      </View>
    );
  }
}

const mainStyles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
