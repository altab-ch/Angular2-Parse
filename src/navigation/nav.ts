/// <reference path="../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {Injector} from 'angular2/di';

import $ = require('jquery');

var Parse = require('parse').Parse;

let template = require('./nav.html');
let styles   = require('./nav.css');

@Component({
  selector: 'navigation-cmp'
})

@View({
  styles: [ styles ],
  template: template
})

export class NavigationComponent {
  
  constructor(public router: Router) {
  }

    
  logout() {
    Parse.User.logOut();
    this.router.navigate('/login');
  }
    
  products() {
    this.router.navigate('/products');
  }
    
  orders() {
    this.router.navigate('/home');
  }
    
collapse(){
    console.log('collapse');
    //$(".collapse").collapse();
    $('.collapse').addClass('collapse');
}
    
}