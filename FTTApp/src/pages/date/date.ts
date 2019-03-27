import { FoodLogPage } from './../food-log/food-log';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { FoodDatabaseProvider } from './../../providers/food-database/food-database';

/**
 * Generated class for the DatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-date',
  templateUrl: 'date.html',
})
export class DatePage {
  
  date: any;


constructor(public navCtrl: NavController) {
 
}

  viewDate(){


    this.navCtrl.push(FoodLogPage, {
      selectedDate: this.date
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DatePage');
  }

}
