import { DetailsPage } from './../details/details';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SearchMealPage } from './../search-meal/search-meal';
import { FoodLogPage } from './../food-log/food-log';
import { DatePage } from './../date/date';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

      /*
  *
  *
  * Home Screen
  * 
  * */


  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.checkForDetails();
  }


itemFoodLog() {
  // That's right, we're pushing to ourselves!
  this.navCtrl.push(FoodLogPage);
}

itemDate() {
  // That's right, we're pushing to ourselves!
  this.navCtrl.push(DatePage);
}

itemSearch() {
  // That's right, we're pushing to ourselves!
  this.navCtrl.push(SearchMealPage);
}


    /*
  *
  *
  * This method checks to see if the details table is populated and if not redirects the user to the details page
  * 
  * */
checkForDetails() {
  //Database method
  this.sqlite.create({
    name: "tracker.db", 
    location:"default"})
    .then((db : SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS details (id INTEGER PRIMARY KEY AUTOINCREMENT, gender TEXT, age NUMBER, weight Number)', [])
      .then(res => console.log('Details table created'))
      .catch((error) => {
      console.log(error);
    db.executeSql('SELECT * FROM details', [])
    .then(res => {
      if (res.rows.length < 1) {
        this.navCtrl.push(DetailsPage);
      }
    }).catch(e => console.log(e));
  });
});
}
}