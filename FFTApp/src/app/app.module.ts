import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { HealthKit } from '@ionic-native/health-kit';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DatePage } from '../pages/date/date';
import { FoodLogPage } from '../pages/food-log/food-log';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FoodDatabaseProvider } from '../providers/food-database/food-database';
import { DatabaseService } from '../services/database';
import { AddRunPage } from './../pages/add-run/add-run';
//import { CurrDayFoodLogPage } from './../pages/curr-day-food-log/curr-day-food-log';
import { DetailsPage } from './../pages/details/details';
import { PrevRunPage } from './../pages/prev-run/prev-run';
import { SearchMealPage } from './../pages/search-meal/search-meal';
import { MyApp } from './app.component';

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
 //   CurrDayFoodLogPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
//    CurrDayFoodLogPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FoodDatabaseProvider,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Geolocation,
    HealthKit,
    DatabaseService
  ]
})
export class AppModule { }
