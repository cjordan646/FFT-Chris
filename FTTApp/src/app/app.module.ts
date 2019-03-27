import { DetailsPage } from './../pages/details/details';
import { CurrDayFoodLogPage } from './../pages/curr-day-food-log/curr-day-food-log';
import { HealthKit } from '@ionic-native/health-kit';
import { PrevRunPage } from './../pages/prev-run/prev-run';
import { AddRunPage } from './../pages/add-run/add-run';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FoodDatabaseProvider } from '../providers/food-database/food-database';
import { SQLite } from '@ionic-native/sqlite';
import { Geolocation } from '@ionic-native/geolocation';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DatePage } from '../pages/date/date';
import { FoodLogPage } from '../pages/food-log/food-log';
import { SearchMealPage } from './../pages/search-meal/search-meal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DatePage,
    FoodLogPage,
    SearchMealPage,
    AddRunPage,
    PrevRunPage,
    CurrDayFoodLogPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DatePage,
    FoodLogPage,
    SearchMealPage,
    AddRunPage,
    PrevRunPage,
    CurrDayFoodLogPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FoodDatabaseProvider,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    HealthKit
    
    
  ]
})
export class AppModule {}
