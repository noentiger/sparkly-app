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
import { observer } from 'mobx-react/native';
import Button from 'components/Button';
import Stall from 'stores/Stall';
import { styles } from 'styles';

@observer
export default class Checkins extends Component {

  componentWillMount() {
    Stall.getMyReservations();
  }

  componentDidMount() {
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        Stall.getMyReservations();
      }
    });
  }

  get list() {
    if (Stall.myReservations.length) {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      const dataSource = ds.cloneWithRows(Stall.myReservations.slice());

      return (
        <ListView
          enableEmptySections
          dataSource={dataSource}
          renderRow={
              rowData => (
                <ListItem
                  address={rowData.stall.address}
                  onPress={() =>
                      Actions.tabSparkPage({ data: rowData, title: rowData.stall.address })
                  }
                />
              )
          }
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={mainStyles.separator} />}
        />
      );
    } else {
      return <Text style={styles.emptyText}>{'You haven\'t sparked anywhere yet.'}</Text>;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.list}
        <View style={{ padding: 20, marginBottom: 25 }}>
          <Button onPress={() => Actions.tabFind()} title={'Find a Spark'} />
        </View>
      </View>
    );
  }
}

const mainStyles = StyleSheet.create({
  searchField: {
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
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
