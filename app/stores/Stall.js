/* @flow */

import {
    observable,
} from 'mobx';
import { Api } from 'services/Api';

class Stall {

 @observable stalls;
 @observable myStalls;
 @observable myReservations;

  constructor() {
    this.myStalls = [];
    this.stalls = [];
    this.myReservations = [];
  }

  getMine() {
    Api.get('/stalls/mine').then((res) => {
      this.myStalls = res.data.stalls;
    }).catch((err) => {
      console.log(err);
    });
  }

  getAll() {
    Api.get('/stalls').then((res) => {
      this.stalls = res.data.stalls;
    }).catch((err) => {
      console.log('err', err);
    });
  }

  getMyReservations() {
    Api.get('/reservations/mine').then((res) => {
      this.myReservations = res.data.reservations;
    }).catch((err) => {
      console.log('err', err);
    });
  }

  create(data) {
    this.isLoading = true;
    return new Promise((resolve, reject) => {
      Api.post('/stalls', data).then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  reserve(id) {
    this.isLoading = true;
    return new Promise((resolve, reject) => {
      Api.post('/reservations', { stall_id: id }).then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err);
      });
    });
  }

}

export default new Stall();
