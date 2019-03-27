import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  myForm: FormGroup;
  gender : any;
  age : any;
  weight : any;


  constructor(public navCtrl: NavController, public formbuilder: FormBuilder, private sqlite: SQLite) {

    this.myForm = formbuilder.group({
      gender: new FormControl('', Validators.required),
      age:new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
      weight:new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(3)])
    })

    this.gender = this.myForm.controls['gender'];
    this.age = this.myForm.controls['age'];
    this.weight = this.myForm.controls['weight']
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  SubmitDetails(){
    //Database method
    console.log(this.gender + ", "+ this.age+ ", " + this.weight)
    this.sqlite.create({
      name: "tracker.db", 
      location:"default"})
      .then((db : SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS details (id INTEGER PRIMARY KEY AUTOINCREMENT, gender TEXT, age NUMBER, weight Number)', [])
      .then(res => console.log('Meals table created'))
      .catch((error) => {
      console.log(error);
     })

    db.executeSql('INSERT INTO details(gender, age, weight) VALUES (?, ?, ?)',
      [this.gender, this.age, this.weight])
      .then((res) => {
        console.log(res);
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.popToRoot();
       }, (error) => {
        console.log(error);
        });
  });
   }
  }


