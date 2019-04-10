import { HttpClient } from '@angular/common/http'; //Imported to allow API calls
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import { DatabaseService, MealIn } from '../../services/database';
import { HomePage } from './../home/home';
import * as moment from 'moment';

/**
 * Generated class for the SearchMealPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-search-meal',
  templateUrl: 'search-meal.html'
})
export class SearchMealPage {
  /*
  * Search nutrionix api and return results
  * upon selection of meal button (breakfast, lunch, dinner, snack) and adds it to the database
  */

  //variables 
  searchMeal: any;
  food = new BehaviorSubject([]); //automatically updates on page upon changes being made
  apiBaseURL: string = '';
  data: string;
  params: string = '?fields=item_name%2Cnf_calories%2Cnf_total_fat%2Cnf_protein%2Cnf_saturated_fat%2Cnf_total_carbohydrate&appId=b15cf509&appKey=+ef180408b108a12f463c2eb4e1ea8a66';
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    private dbServ: DatabaseService,
    private toast: ToastController
  ) {

    //API
    this.apiBaseURL = "https://api.nutritionix.com/v1_1/search/";
    this.searchMeal = navParams.get('food');
    this.mealSearch;

    //Set the Toast options
    this.toastOptions = {
      message: 'Meal Successfully Added',
      duration: 4000
    }
  }

  //  Method that for the API call
  mealSearch(event, food) {

    this.http.get(this.apiBaseURL + this.searchMeal + this.params)
      .subscribe(data => {
        this.food.next(data['hits'].map(m => m.fields)); //the 'map' function allows to manipulate data...in this case it alters the JSOn received from the api to only display the 'fields' items
        console.log(JSON.stringify(data)); // outputs the json to the console log
      }, err => {
        console.log(err); //should the call not work, return an error
      });
  }

  addMeal(item, meal: string) {
    const model: MealIn = {
      meal,
      desc: item.item_name,
      calories: item.nf_calories,
      date: moment().format('DD/MM/YYYY')
    }

    this.dbServ.insert('meals', model).then(() => {
      this.toast.create(this.toastOptions);
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchMealPage');
    this.mealSearch;
  }
}
