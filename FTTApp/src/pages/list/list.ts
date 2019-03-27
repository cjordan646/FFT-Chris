import { PrevRunPage } from './../prev-run/prev-run';
import { AddRunPage } from './../add-run/add-run';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

      /*
  *
  *
  * Menu for the exercise pages
  * 
  * */


  selectedItem: any;
  icons: string[];
  titles: string[];
  items: Array<{title: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  startRun() {
    this.navCtrl.push(AddRunPage);
  }

  viewRuns() {
 
   this.navCtrl.push(PrevRunPage);
  }
}
