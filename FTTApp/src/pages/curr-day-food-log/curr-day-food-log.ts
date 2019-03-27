import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
//import { Health } from '@ionic-native/health';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/**
 * Generated class for the CurrDayFoodLogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-curr-day-food-log',
  templateUrl: 'curr-day-food-log.html',
})
export class CurrDayFoodLogPage {

    /*
  *
  *
  * This page retrives the meals added to the meals database table and diplays the stored data.
  * Also included is the total steps retrieved from the healthkit plugin
  * Would also be nice to display workouts logged for the current day
  * 
  * */

  currDate: string;
  stepcount: any;
  bre: string = 'Breakfast';
  lun: string = 'Lunch';
  din: string = 'Dinner';
  sna: string = 'Snack';
  key: string;
  break: any = [];
  lunch: any = [];
  dinner: any = [];
  snack: any = [];
  totalCal =0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private healthKit: HealthKit, private plt: Platform,
    private sqlite: SQLite,) {
      this.currDate = new Date().toISOString();

      //  Access the devices health data
      this.plt.ready().then(() => { 
        this.healthKit.available().then(available => {
          if (available) {
            // Request all permissions up front if you like to
            var options: HealthKitOptions = {
              readTypes: [ 'HKQuantityTypeIdentifierStepCount', 'HKWorkoutTypeIdentifier', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierdistanceWalkingRunning'],
              writeTypes: [ 'HKWorkoutTypeIdentifier', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierdistanceWalkingRunning']
            }
            this.healthKit.requestAuthorization(options).then(_ => {
              this.loadstepData();
            })
          }
        });
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrDayFoodLogPage');
    this.getBreak();
    this.getLunch();
    this.getLunch();
    this.getSnack();
  }

  loadstepData(){
    /*
  *
  *
  * If possible change logic below to only retrieve step count for current day
  * 
  * */
    var stepOptions = {
      startDate: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      endDate: new Date(),
      sampleType: 'HKQuantityTypeIdentifierStepCount',
      unit: 'count'
    }
  
    this.healthKit.querySampleType(stepOptions).then(data => {
      let stepSum = data.reduce((a, b) => a + b.quantity, 0);
      this.stepcount = stepSum;
    }, err => {
      console.log('No steps: ', err);
    });
  }
  
      //Retrieve Data from the Database
    getBreak() {
      //Database method
      this.sqlite.create({
        name: "tracker.db", 
        location:"default"})
        .then((db : SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS meals (id INTEGER PRIMARY KEY AUTOINCREMENT, meal TEXT, desc TEXT, calories TEXT, date TEXT)', [])
        .then(res => console.log('Meals table created'))
        .catch((error) => 
        console.log(error));
        db.executeSql('SELECT * FROM meals WHERE date ='+ this.currDate +' AND meal ='+ this.break +'', [])
        .then(res => {
          this.break = [];
          if (res.rows.length > 0) {
            for (var i =0; i < res.rows.length; i++) {
              this.break.push({
                name: res.rows.item[i].desc,
                calories: res.rows.item[i].calories
              });
            }
          }
        }).catch(e => console.log(e));
        db.executeSql('SELECT SUM(calories) AS totalCalories FROM meals WHERE date ='+ this.currDate +' AND meal ='+ this.break +'', [])
        .then(res => {
          if(res.rows.length>0) {
            this.totalCal = parseInt(res.rows.item(0).totalCalories);
          }
        })
      }).catch(e => console.log(e));
    }
  
  
      getLunch() {
          //Database method
          this.sqlite.create({
            name: "tracker.db", 
            location:"default"})
            .then((db : SQLiteObject) => {
            db.executeSql('CREATE TABLE IF NOT EXISTS meals (id INTEGER PRIMARY KEY AUTOINCREMENT, meal TEXT, desc TEXT, calories TEXT, date TEXT)', [])
            .then(res => console.log('Meals table created'))
            .catch((error) => 
            console.log(error));
            db.executeSql('SELECT * FROM meals WHERE date ='+ this.currDate +' AND meal ='+ this.break +'', [])
            .then(res => {
              this.break = [];
              if (res.rows.length > 0) {
                for (var i =0; i < res.rows.length; i++) {
                  this.break.push({
                    name: res.rows.item[i].desc,
                    calories: res.rows.item[i].calories
                  });
                }
              }
            }).catch(e => console.log(e));
            db.executeSql('SELECT SUM(calories) AS totalCalories FROM meals WHERE date ='+ this.currDate +' AND meal ='+ this.break +'', [])
            .then(res => {
              if(res.rows.length>0) {
                this.totalCal = parseInt(res.rows.item(0).totalCalories)
              }
            })
          }).catch(e => console.log(e));
        }
  
  
      getDin() {
          //Database method
      this.sqlite.create({
        name: "tracker.db", 
        location:"default"})
        .then((db : SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS meals (id INTEGER PRIMARY KEY AUTOINCREMENT, meal TEXT, desc TEXT, calories TEXT, date TEXT)', [])
        .then(res => console.log('Meals table created'))
        .catch((error) => 
        console.log(error));
        db.executeSql('SELECT * FROM meals WHERE date ='+ this.currDate +' AND meal ='+ this.break +'', [])
        .then(res => {
          this.break = [];
          if (res.rows.length > 0) {
            for (var i =0; i < res.rows.length; i++) {
              this.break.push({
                name: res.rows.item[i].desc,
                calories: res.rows.item[i].calories
              });
            }
          }
        }).catch(e => console.log(e));
        db.executeSql('SELECT SUM(calories) AS totalCalories FROM meals WHERE date ='+ this.currDate +' AND meal ='+ this.break +'', [])
        .then(res => {
          if(res.rows.length>0) {
            this.totalCal = parseInt(res.rows.item(0).totalCalories)
          }
        })
      }).catch(e => console.log(e));
    }

      getSnack() {
      //Database method
      this.sqlite.create({
        name: "tracker.db", 
        location:"default"})
        .then((db : SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS meals (id INTEGER PRIMARY KEY AUTOINCREMENT, meal TEXT, desc TEXT, calories TEXT, date TEXT)', [])
        .then(res => console.log('Meals table created'))
        .catch((error) => 
        console.log(error));
        db.executeSql('SELECT * FROM meals WHERE date ='+ this.currDate +' AND meal ='+ this.break +'', [])
        .then(res => {
          this.break = [];
          if (res.rows.length > 0) {
            for (var i =0; i < res.rows.length; i++) {
              this.break.push({
                name: res.rows.item[i].desc,
                calories: res.rows.item[i].calories
              });
            }
          }
        }).catch(e => console.log(e));
        db.executeSql('SELECT SUM(calories) AS totalCalories FROM meals WHERE date ='+ this.currDate +' AND meal ='+ this.break +'', [])
        .then(res => {
          if(res.rows.length>0) {
            this.totalCal = parseInt(res.rows.item(0).totalCalories)
          }
        })
      }).catch(e => console.log(e));
    }
     
}
