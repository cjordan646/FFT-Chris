import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { DatabaseService, DetailOut } from '../../services/database';
import { HomePage } from './../home/home';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  myForm: FormGroup;
  gender: any;
  age: any;
  weight: any;

  constructor(public navCtrl: NavController, public formbuilder: FormBuilder, private dbServ: DatabaseService) {
    this.myForm = formbuilder.group({
      gender: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]),
      weight: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)])
    })

    this.gender = this.myForm.controls['gender'];
    this.age = this.myForm.controls['age'];
    this.weight = this.myForm.controls['weight'];

    this.dbServ.details.then((data: DetailOut) => {
      if (data) {
        this.myForm.get('gender').setValue(data.gender);
        this.myForm.get('age').setValue(data.age);
        this.myForm.get('weight').setValue(data.weight);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  SubmitDetails() {
    const model = {
      gender: (this.myForm.get('gender').value) as string,
      age: +this.myForm.get('age').value,
      weight: +this.myForm.get('weight').value,
    };

    this.dbServ.set('details', model).then(() => {
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
    });
  }
}


