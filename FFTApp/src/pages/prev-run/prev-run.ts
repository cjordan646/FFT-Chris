import { Component } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit';
import { NavController, Platform } from 'ionic-angular';
import * as moment from 'moment';
import { DatabaseService, RouteOut } from '../../services/database';
import { isEmpty } from 'lodash';


/**
 * Generated class for the PrevRunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-prev-run',
  templateUrl: 'prev-run.html',
})
export class PrevRunPage {
  stepcount: any = 'No Data';
  workouts = [];
  activities = [];

  constructor(public navCtrl: NavController, private healthKit: HealthKit, private plt: Platform, private dbServ: DatabaseService) {
    this.plt.ready().then(() => {
      if (this.plt.is('cordova')) {
        this.healthKit.available().then(available => {
          if (available) {
            // Request all permissions up front if you like to
            var options: HealthKitOptions = {
              readTypes: ['HKQuantityTypeIdentifierStepCount', 'HKWorkoutTypeIdentifier', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierdistanceWalkingRunning'],
              writeTypes: ['HKWorkoutTypeIdentifier', 'HKQuantityTypeIdentifierActiveEnergyBurned', 'HKQuantityTypeIdentifierdistanceWalkingRunning']
            }
            this.healthKit.requestAuthorization(options).then(_ => {
              this.loadWorkouts();
            })
          }
        });
      } else {
        this.loadWorkouts();
      }
    })
  }

  //Load workouts from apple HealthKit
  loadWorkouts() {
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

      this.healthKit.findWorkouts().then(data => {
        this.workouts = data;
        debugger;
      }, err => {
        console.log('no workouts: ', err);
        // Sometimes the result comes in here, not sure why
        this.workouts = err;
      });
    } else {
      this.stepcount = 15000;
      this.workouts = [];
    }
  }

  /*
   * Load previous workouts from the database
   */
  loadRuns() {
    this.dbServ.routes.then((routes: RouteOut[]) => {
      routes = isEmpty(routes) ? [] : routes;
      this.activities = routes.map(m => {
        return {
          startTime: m.startTime,
          endTime: m.endTime,
          speed: m.speed,
          dist: m.dist,
          path: JSON.parse(m.path)
        }
      });
    });
  }

  ionViewDidLoad() {
    this.loadRuns();
  }
}
