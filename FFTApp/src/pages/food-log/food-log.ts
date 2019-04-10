import { Component } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { DatabaseService, MealOut } from '../../services/database';

/**
 * Generated class for the FoodLogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-food-log',
  templateUrl: 'food-log.html'
})
export class FoodLogPage {
  /*
  *
  * This page retrives the meals added to the meals database table and diplays the stored data.
  * Also included is the total steps retrieved from the healthkit plugin
  * 
  */
  selectedDate: any;
  stepcount: any;
  bre: string = 'Breakfast';
  lun: string = 'Lunch';
  din: string = 'Dinner';
  sna: string = 'Snack';
  key: string;
  break: any = { totalCal: 0, items: [] };
  lunch: any = { totalCal: 0, items: [] };
  dinner: any = { totalCal: 0, items: [] };
  snack: any = { totalCal: 0, items: [] };
  totalCal = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private healthKit: HealthKit,
    private plt: Platform,
    private dbServ: DatabaseService
  ) {
    this.selectedDate = navParams.get('selectedDate') || moment().startOf('day').format('DD/MM/YYYY');

    this.plt.ready().then(() => {
      if (this.plt.is('cordova')) {
        this.healthKit.available().then(available => {
          if (available) {
            // Request all permissions up front
            var options: HealthKitOptions = {
              readTypes: ['HKQuantityTypeIdentifierStepCount', 'HKWorkoutTypeIdentifier', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierdistanceWalkingRunning'],
              writeTypes: ['HKWorkoutTypeIdentifier', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierdistanceWalkingRunning']
            }
            this.healthKit.requestAuthorization(options).then(_ => {
              this.loadstepData();
            })
          }
        });
      } else {
        this.loadstepData();
      }
    })
  }

  //Retrieve the stepcount on the users device if available
  loadstepData() {
    var stepOptions = {
      startDate: moment().startOf('day'),
      endDate: moment().endOf('day'),
      sampleType: 'HKQuantityTypeIdentifierStepCount',
      unit: 'count'
    }

    if (this.plt.is('cordova')) {
      this.healthKit.querySampleType(stepOptions).then(data => {
        let stepSum = data.reduce((a, b) => a + b.quantity, 0);
        this.stepcount = stepSum;
      }, err => {
        console.log('No steps: ', err);
      });
    } else {
      this.stepcount = 15000;
    }
  }

  //Retrieve Data from the Database
  getMeals() {
    this.dbServ.meals.then((meals: MealOut[]) => {
      meals = isEmpty(meals) ? [] : meals;
      const byDate = meals.filter(f => f.date === this.selectedDate);

      const breakfast = this.formatRows(byDate.filter(f => f.meal === 'Breakfast'));
      this.break = {
        totalCal: Math.round(breakfast.reduce((a, b) => a + (+b.calories), 0)),
        items: breakfast
      }

      const lunch = this.formatRows(byDate.filter(f => f.meal === 'Lunch'));
      this.lunch = {
        totalCal: Math.round(lunch.reduce((a, b) => a + (+b.calories), 0)),
        items: lunch
      }

      const dinner = this.formatRows(byDate.filter(f => f.meal === 'Dinner'));
      this.dinner = {
        totalCal: Math.round(dinner.reduce((a, b) => a + (+b.calories), 0)),
        items: dinner
      }

      const snack = this.formatRows(byDate.filter(f => f.meal === 'Snack'));
      this.snack = {
        totalCal: Math.round(snack.reduce((a, b) => a + (+b.calories), 0)),
        items: snack
      }

      this.totalCal = byDate.reduce((a, b) => a + (+b.calories), 0);
    });
  }

  formatRows(arr) {
    return arr.map(m => {
      return {
        name: m.desc,
        calories: m.calories
      };
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodLogPage');
    console.log(this.navParams.get('selectedDate'));
    this.getMeals();
  }
}
