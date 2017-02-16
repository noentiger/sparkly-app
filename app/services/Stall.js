/* @flow */

import { Actions } from 'react-native-router-flux';
import store from 'stores/Stall.js';
import { observable } from 'mobx';

class Stall {

  @observable data = {};

  constructor() {
    this.reset();
  }

  create() {
    return new Promise((resolve, reject) => {
      const data = this.data;
      store.create(data).then((response) => {
        store.getAll();
        store.getMine();
        Actions.tabSparkPage({
          title: data.address,
          data,
        });
        resolve(response);
        this.reset();
      }).catch((err) => {
        reject(err);
      });
    });
  }

  reset() {
    this.data = {
      address: '',
      lng: null,
      lat: null,
      starts_at: new Date(),
      ends_at: new Date(),
    };
  }
}

export default new Stall();
