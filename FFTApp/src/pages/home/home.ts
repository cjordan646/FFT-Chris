import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { isEmpty } from 'lodash';
import { DatabaseService } from '../../services/database';
import { DetailsPage } from '../details/details';
import { DatePage } from './../date/date';
import { FoodLogPage } from './../food-log/food-log';
import { SearchMealPage } from './../search-meal/search-meal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private dbServ: DatabaseService) {
    this.checkForDetails();
  }

  itemFoodLog() {
    this.navCtrl.push(FoodLogPage);
  }

  itemDate() {
    this.navCtrl.push(DatePage);
  }

  itemSearch() {
    this.navCtrl.push(SearchMealPage);
  }


  /*
   *
   * This method checks to see if the details table is populated and if not redirects the user to the details page
   * 
   */
  checkForDetails() {
    this.dbServ.details.then((details) => {
      if (isEmpty(details)) {
        this.navCtrl.push(DetailsPage);
      }
    });
  }
}
