import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { ToastController, ToastOptions, IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Observable } from 'rxjs/Observable'; //Imported to display API results
import { HttpClient } from '@angular/common/http'; //Imported to allow API calls
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';
//import { FoodDatabaseProvider } from './../../providers/food-database/food-database';


/**
 * Generated class for the SearchMealPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-meal',
  templateUrl: 'search-meal.html',
//  providers: [FoodDatabaseProvider]
  
})
export class SearchMealPage {

      /*
  *
  *
  * Search nutrionix api and return results
  * upon selection of meal button (breakfast, lunch, dinner, snack) and adds it to the database
  * 
  * 
  * */

//variables 
  searchMeal: any;
  food = new BehaviorSubject([]); //automatically updates on page upon changes being made
  apiBaseURL:string='';
  data:string;
  params:string='?fields=item_name%2Cnf_calories%2Cnf_total_fat%2Cnf_protein%2Cnf_saturated_fat%2Cnf_total_carbohydrate&appId=b15cf509&appKey=+ef180408b108a12f463c2eb4e1ea8a66';
  break: string = 'Breakfast';
  lunch: string = 'Lunch';
  dinner: string = 'Dinner';
  snack: string = 'Snack';
  date = new Date().toISOString();
  cal: string;
  name: string;
  toastOptions: ToastOptions;
  addToMeal: Array<string> = [];
  key: string;

 //private database: FoodDatabaseProvider, private storage: Storage
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient,
    private sqlite: SQLite, private toast: ToastController) {
    
    //API
    this.apiBaseURL="https://api.nutritionix.com/v1_1/search/";
    this.searchMeal = navParams.get('food');
    this.mealSearch;

    //Set the Toast options
    this.toastOptions = {
      message: 'Meal Successfully Added',
      duration: 4000
    }
  }

//  Method that for the API call
//   https://api.nutritionix.com/v1_1/search/pea?results=0%3A20&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=b15cf509&appKey=+ef180408b108a12f463c2eb4e1ea8a66
  mealSearch(event, food){
 
   this.http.get(this.apiBaseURL + this.searchMeal + this.params )
                 .subscribe(data => {
                this.food.next(data['hits'].map(m => m.fields)); //the 'map' function allows to manipulate data...in this case it alters the JSOn received from the api to only display the 'fields' items
                      console.log(JSON.stringify(data)); // outputs the json to the console log
                  
                 },err => {
                  console.log(err); //should the call not work, return an error
                 });
  }

  addBreak($event, item){
    //Database method
    this.sqlite.create({
      name: "tracker.db", 
      location:"default"})
      .then((db : SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS meals (id INTEGER PRIMARY KEY AUTOINCREMENT, meal TEXT, desc TEXT, calories TEXT, date TEXT)', [])
      .then(res => console.log('Meals table created'))
      .catch((error) => {
      console.log(error);
     })

    db.executeSql('INSERT INTO meals(meal, desc, calories, date) VALUES (?, ?, ?, ?)',
      [this.break, item.item_name, item.nf_calories, this.date])
      .then((res) => {
        console.log(res);
        this.toast.create(this.toastOptions);
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.popToRoot();
       }, (error) => {
        console.log(error);
        });
  });
}

//Original Method using local storage, problem was it resulted in data being overwritten
    // this.key =this.break;
    // this.addToMeal = [this.name, this.cal, this.date];
    // this.storage.set(this.key, JSON.stringify(this.addToMeal));
    // console.log(this.addToMeal);

  addLunch($event, item){
        //Database method
        this.sqlite.create({
          name: "tracker.db", 
          location:"default"})
          .then((db : SQLiteObject) => {
          db.executeSql('CREATE TABLE IF NOT EXISTS meals (id INTEGER PRIMARY KEY AUTOINCREMENT, meal TEXT, desc TEXT, calories TEXT, date TEXT)', [])
          .then(res => console.log('Meals table created'))
          .catch((error) => {
          console.log(error);
         })
    
        db.executeSql('INSERT INTO meals(meal, desc, calories, date) VALUES (?, ?, ?, ?)',
          [this.lunch, item.item_name, item.nf_calories, this.date])
          .then((res) => {
            console.log(res);
            this.toast.create(this.toastOptions);
            this.navCtrl.setRoot(HomePage);
            this.navCtrl.popToRoot();
           }, (error) => {
            console.log(error);
            });
      });
    }

  addDinner($event, item){
     //Database method
     this.sqlite.create({
      name: "tracker.db", 
      location:"default"})
      .then((db : SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS meals (id INTEGER PRIMARY KEY AUTOINCREMENT, meal TEXT, desc TEXT, calories TEXT, date TEXT)', [])
      .then(res => console.log('Meals table created'))
      .catch((error) => {
      console.log(error);
     })

    db.executeSql('INSERT INTO meals(meal, desc, calories, date) VALUES (?, ?, ?, ?)',
      [this.dinner, item.item_name, item.nf_calories, this.date])
      .then((res) => {
        console.log(res);
        this.toast.create(this.toastOptions);
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.popToRoot();
       }, (error) => {
        console.log(error);
        });
  });
}

  addSnack($event, item){
     //Database method
     this.sqlite.create({
      name: "tracker.db", 
      location:"default"})
      .then((db : SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS meals (id INTEGER PRIMARY KEY AUTOINCREMENT, meal TEXT, desc TEXT, calories TEXT, date TEXT)', [])
      .then(res => console.log('Meals table created'))
      .catch((error) => {
      console.log(error);
     })

    db.executeSql('INSERT INTO meals(meal, desc, calories, date) VALUES (?, ?, ?, ?)',
      [this.snack, item.item_name, item.nf_calories, this.date])
      .then((res) => {
        console.log(res);
        this.toast.create(this.toastOptions);
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.popToRoot();
       }, (error) => {
        console.log(error);
        });
  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchMealPage');
    this.mealSearch;
  }

}
