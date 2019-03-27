import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit';
import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';


/**
 * Generated class for the PrevRunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prev-run',
  templateUrl: 'prev-run.html',
})
export class PrevRunPage {
  stepcount = 'No Data';
  workouts = [];
  activities = [];

  constructor(public navCtrl: NavController, private healthKit: HealthKit, private plt: Platform, private sqlite: SQLite) {
    this.plt.ready().then(() => { 
      this.healthKit.available().then(available => {
        if (available) {
          // Request all permissions up front if you like to
          var options: HealthKitOptions = {
            readTypes: [ 'HKQuantityTypeIdentifierStepCount', 'HKWorkoutTypeIdentifier', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierdistanceWalkingRunning'],
            writeTypes: [ 'HKWorkoutTypeIdentifier', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierdistanceWalkingRunning']
          }
          this.healthKit.requestAuthorization(options).then(_ => {
            this.loadWorkouts();
          })
        }
      });
    })
  }

  loadWorkouts() {
    var stepOptions = {
      startDate: new Date(new Date().getTime() - 30*24 * 60 * 60 * 1000),
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
 
    this.healthKit.findWorkouts().then(data => {
      this.workouts = data;
    }, err => {
      console.log('no workouts: ', err);
      // Sometimes the result comes in here, very strange.
      this.workouts = err;
    });
  }

      /*
  *
  *
  * Load previous workouts from the database would also be nice to have the map functionality from the add-run page here
  * 
  * */


    //get data from database 
    loadRuns(){
     this.sqlite.create({
      name: "tracker.db", 
      location:"default"})
      .then((db : SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS routes (id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT, startTime TEXT, endTime TEXT, speed NUMBER, dist NUMBER)', [])
        .then(res => console.log('Routes table created'))
      .catch((error) => 
      console.log(error));
      db.executeSql('SELECT * FROM routes', [])
      .then(res => {
        if (res.rows.length > 0) {
          for (var i =0; i < res.rows.length; i++) {
            this.activities.push({
              startTime: res.rows.item[i].startTime,
              endTime: res.rows.item[i].endTime,
              speed: res.rows.item[i].speed,
              dist: res.rows.item[i].dist
            });

          }
        }
      }).catch(e => console.log(e));

    }).catch(e => console.log(e));
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PrevRunsPage');
    this.loadRuns();
  }

}
