/* @flow */

import {
  AsyncStorage,
} from 'react-native';
import { Api } from 'services/Api';
import { Actions } from 'react-native-router-flux';
import { observable } from 'mobx';

class User {

 @observable isLoggedIn = false;

  constructor() {
    this._user = {
      email: '',
      password: '',
    };
    this.me = {};
    this.isLoggedIn = false;

    AsyncStorage.getItem('@sparkly:token').then((token) => {
      if (token) {
        this.addTokenToHeader(token);
        this.isLoggedIn = true;
        Actions.tabInfo();
      }
      Api.get(`/me?timestamp=${Date.now()}&token=${token}`).then((response) => {
        this.me = response.data;
      }).catch((err) => {
        console.log('err', err);
        if (err.response && err.response.status === 401) {
          this.logout();
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  register() {
    Api.post('/register', this._user).then((response) => {
      const { data } = response;

      this._user = {};
      this.me = data;
      this.isLoggedIn = true;
      this.addTokenToHeader(data.token);
      console.log('data', data);
      Actions.main();
      AsyncStorage.setItem('@sparkly:token', data.token).then(() => {
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log('err', err);
    });
  }

  login() {
    Api.post('/sign_in', this._user).then((response) => {
      const { data } = response;
      console.log('data', data);
      this.addTokenToHeader(data.token);
      this._user = {};
      this.me = data;
      this.isLoggedIn = true;
      Actions.main();
      AsyncStorage.setItem('@sparkly:token', data.token).then(() => {
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  addTokenToHeader(token) {
    Api.defaults.headers.common.Authorization = token;
  }

  removeTokenFromHeader() {
    Api.defaults.headers.common.Authorization = '';
  }

  logout() {
    AsyncStorage.removeItem('@sparkly:token').then(() => {
      this.me = {};
      this.isLoggedIn = false;
      this.removeTokenFromHeader();
      Actions.tabLogin();
    }).catch((err) => {
      console.log(err);
    });
  }
}

export default new User();
