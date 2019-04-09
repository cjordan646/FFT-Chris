import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as uuid from 'uuid/v4';

@Injectable()
export class DatabaseService {
  constructor(private _db: Storage) { }

  get meals() {
    return this._db.get('meals');
  }

  get details() {
    return this._db.get('details');
  }

  get routes() {
    return this._db.get('routes');
  }

  insert(table: table, row: tableRow) {
    return new Promise((resolve, reject) => {
      this[table].then((data) => {
        const arr = Array.isArray(data) ? [...data] : [];
        const id = this.getUUID(arr);
        arr.push({
          id,
          ...row
        });

        this._db.set(table, arr).then(() => {
          resolve();
        }).catch((err) => {
          reject(err);
        })
      });
    })
  }

  set(table: table, row: tableRow) {
    return new Promise((resolve, reject) => {
      this._db.set(table, row).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      })
    })
  }

  getUUID(arr) {
    const newId = uuid();
    const exists = arr.find(f => f.id === newId);
    if (exists) {
      return this.getUUID(arr);
    }

    return newId;
  }
}

type table = 'routes' | 'meals' | 'details';
type tableRow = RouteIn | MealIn | DetailIn;

export interface DBTable {
  id: string
}

export interface RouteOut extends DBTable {
  path: string,
  startTime: string,
  endTime: string,
  speed: number,
  dist: number
}

export interface MealOut extends DBTable {
  meal: string,
  desc: string,
  calories: string,
  date: string
}

export interface DetailOut extends DBTable {
  gender: string,
  age: number,
  weight: number
}

export interface RouteIn {
  path: string,
  startTime: string,
  endTime: string,
  speed: number,
  dist: number
}

export interface MealIn {
  meal: string,
  desc: string,
  calories: string,
  date: string
}

export interface DetailIn {
  gender: string,
  age: number,
  weight: number
}

export interface Database {
  details: DetailOut,
  meals: MealOut[],
  routes: RouteOut[]
}
