import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import MySparks from 'components/MySparks';
import Map from 'components/Map';
import TabIcon from 'components/TabIcon';
import Checkins from 'components/Checkins';
import Spark from 'components/Spark';
import Login from 'components/Login';
import User from 'stores/User';

class App extends Component {

  constructor() {
    super();

    this.state = {
      isLoggedIn: User.isLoggedIn,
    };
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <Router>
        <Scene key="root">
          <Scene tabs key="main" type={ActionConst.RESET} tabBarStyle={styles.tabBar}>
            <Scene hideNavBar initial={isLoggedIn} key="tabFind" title="Find a Spark" icon={TabIcon} iconName="md-list" component={Map} />
            <Scene key="tabMy" title="My Sparks" icon={TabIcon} iconName="md-list" component={MySparks} />
            <Scene key="tabCheckins" title="Check-ins" icon={TabIcon} iconName="md-list" component={Checkins} />
          </Scene>
          <Scene key="tabSparkPage" clone hideNavBar={false} component={Spark} />
          <Scene key="tabLogin" initial={!isLoggedIn} hideNavBar component={Login} />
          <Scene key="tabRegister" hideNavBar component={Login} />
          <Scene key="tabAdd" component={Map} hideNavBar clone />
        </Scene>
      </Router>);
  }
}

const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: '#f9f9f9',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#999999',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },
});

export default App;
