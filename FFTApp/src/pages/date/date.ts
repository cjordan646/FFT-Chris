import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FoodLogPage } from './../food-log/food-log';
import * as moment from 'moment';

/**
 * Generated class for the DatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-date',
  templateUrl: 'date.html',
})
export class DatePage {
  date: any;

  constructor(public navCtrl: NavController) { }

  viewDate() {
    this.navCtrl.push(FoodLogPage, {
      selectedDate: moment(this.date, 'YYYY-MM-DD').format('DD/MM/YYYY')
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatePage');
  }
}
