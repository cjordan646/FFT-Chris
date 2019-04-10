import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { DatabaseService, RouteOut, RouteIn } from '../../services/database';
import { isEmpty, get } from 'lodash';

/**
 * Generated class for the AddRunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@Component({
  selector: 'page-add-run',
  templateUrl: 'add-run.html',
})
export class AddRunPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;

  isTracking = false;
  trackedRoute = [];
  previousRoutes = [];

  positionSubscription: Subscription;
  finishTime: string;
  startTime: string;
  speed = [];

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private geolocation: Geolocation,
    private dbServ: DatabaseService
  ) { }

  // Display the users current location on a map and a start button on page load 
  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.loadHistoricRoutes();

      if (this.platform.is('cordova')) {
        let mapOptions = {
          zoom: 13,
          mapTypeId: google.maps.mapTypeId.ROADMAP,
          mapTypeControl: false,
          streetViewControl: false,
          fullScreenControl: false
        };

        this.map = new google.mpas.Map(this.mapElement.nativeElement, mapOptions);

        this.geolocation.getCurrentPosition().then(pos => {
          let LatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          this.map.setCenter(LatLng);
          this.map.setZoom(15);
        });
      }
    });
  }

  /*
  *  The following function displays all of the previous workouts a user has completed and upon being
  *  pressed, its route is displayed on a map
  */
  loadHistoricRoutes() {
    this.dbServ.routes.then((historic: RouteOut[]) => {
      historic = isEmpty(historic) ? [] : historic;
      this.previousRoutes = historic.map((m) => ({ finished: m.endTime, path: JSON.parse(m.path) }));
    });
  }

  //  Function to start tracking a users workout
  startRun() {
    this.isTracking = true;
    this.trackedRoute = [];
    this.startTime = new Date().getTime().toString();

    this.positionSubscription = this.geolocation.watchPosition()
      .filter(p => p.coords !== undefined)  //Filter out any error that occur
      .subscribe(data => {
        setTimeout(() => {
          this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
          this.redrawPath(this.trackedRoute);
          this.speed.push(data.coords.speed);
        });
      })
  }

//  Draws the path the user took on their workout in the map
  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }

    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: false,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });

      this.currentMapTrack.setMap(this.map);
    }
  }

  //  Stops tracking the users workout and saves details to database


  stopRun() {

    let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    this.finishTime = new Date().getTime().toString();
    this.previousRoutes.push(newRoute);

    //Calculate Average Speed
    let totSpeed = 0,
      avgSpeed = 0;

    if (this.speed.length && this.trackedRoute.length) {
      for (let i = 0; i <= this.trackedRoute.length; i++) {
        totSpeed = totSpeed + (this.speed[i] || 0);
      }
      avgSpeed = totSpeed / this.speed.length;
    }

    //Calculate total distance
    let dist = 0;
    for (let i = 0; i <= this.trackedRoute.length; i++) {
      dist = dist + get(this.trackedRoute, '[i].distance.value', 0);
    }

    const model: RouteIn = {
      path: JSON.stringify(this.trackedRoute),
      startTime: this.startTime,
      endTime: this.finishTime,
      speed: avgSpeed,
      dist: dist
    };

    this.dbServ.insert('routes', model).then(() => {
      this.isTracking = false;
      this.positionSubscription.unsubscribe();
      if (this.platform.is('cordova')) {
        this.currentMapTrack.setMap(null);
      }
    });
  }


//  Calls the Draw path funtion upon selecting a previous workout
  showHistoricRunRoute(route) {
    this.redrawPath(route);
  }
}
