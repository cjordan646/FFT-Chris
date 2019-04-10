import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';

/*
  Generated class for the FoodDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FoodDatabaseProvider {
  private isOpen: boolean;
  selectedDate: any;

  constructor(public http: HttpClient, public storage: SQLite) {
    if (!this.isOpen) {
      // this.storage = new SQLite();
      // this.storage.create({ name: "tracker.db", location: "default" }).then((db: SQLiteObject) => {
      //   this.db = db;
      //   // db.executeSql("CREATE TABLE IF NOT EXISTS meals (id INTEGER PRIMARY KEY AUTOINCREMENT, meal TEXT, desc TEXT, calories TEXT, date DATE", [])
      //   this.isOpen = true;
      // }).catch((error) => {
      //   console.log(error);
      // })
    }

  }

  addMeal(meal: string, desc: string, calories: string, date: string) {
    return new Promise((resolve, reject) => {
      // let sql = "INSERT INTO meals(meal, desc, calories, date) VALUES (?, ?, ?, ?)";
      // this.db.executeSql(sql, [meal, desc, calories, date]).then((meal) => {
      //   resolve(meal);
      // }, (error) => {
      //   reject(error);
      // });
    });
  }

  GetBreakfast() {
    return new Promise((resolve, reject) => {
      // this.db.executeSql("SELECT desc, calories FROM meals WHERE meal='Breakfast' AND date='" + this.selectedDate + "'", []).then((meal) => {
      //   let arrayMeals = [];
      //   if (meal.rows.length > 0) {
      //     for (var i = 0; i < meal.rows.length; i++) {
      //       arrayMeals.push({
      //         desc: meal.rows.item[i].desc,
      //         calories: meal.rows.item[i].calories
      //       });
      //     }
      //   }
      //   resolve(arrayMeals);
      // }, (error) => {
      //   reject(error);
      // })
    })
  }

  GetLunch() {
    return new Promise((resolve, reject) => {
      // this.db.executeSql("SELECT desc, calories FROM meals WHERE meal='Lunch' AND date='" + this.selectedDate + "'", []).then((meal) => {
      //   let arrayMeals = [];
      //   if (meal.rows.length > 0) {
      //     for (var i = 0; i < meal.rows.length; i++) {
      //       arrayMeals.push({
      //         desc: meal.rows.item[i].desc,
      //         calories: meal.rows.item[i].calories
      //       });
      //     }
      //   }
      //   resolve(arrayMeals);
      // }, (error) => {
      //   reject(error);
      // })
    })
  }

  GetDinner() {
    return new Promise((resolve, reject) => {
      // this.db.executeSql("SELECT desc, calories FROM meals WHERE meal='Dinner' AND date='" + this.selectedDate + "'", []).then((meal) => {
      //   let arrayMeals = [];
      //   if (meal.rows.length > 0) {
      //     for (var i = 0; i < meal.rows.length; i++) {
      //       arrayMeals.push({
      //         desc: meal.rows.item[i].desc,
      //         calories: meal.rows.item[i].calories
      //       });
      //     }
      //   }
      //   resolve(arrayMeals);
      // }, (error) => {
      //   reject(error);
      // })
    })
  }

  GetSnack() {
    return new Promise((resolve, reject) => {
      // this.db.executeSql("SELECT desc, calories FROM meals WHERE meal='Snack' AND date='" + this.selectedDate + "'", []).then((meal) => {
      //   let arrayMeals = [];
      //   if (meal.rows.length > 0) {
      //     for (var i = 0; i < meal.rows.length; i++) {
      //       arrayMeals.push({
      //         desc: meal.rows.item[i].desc,
      //         calories: meal.rows.item[i].calories
      //       });
      //     }
      //   }
      //   resolve(arrayMeals);
      // }, (error) => {
      //   reject(error);
      // })
    })
  }


}
