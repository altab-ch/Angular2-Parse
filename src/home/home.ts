/// <reference path="../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import {coreDirectives} from 'angular2/directives';
import {status, text} from '../utils/fetch'
import { Router} from 'angular2/router';
import {NavigationComponent} from '../navigation/nav';
import {ParseManager} from '../Model/ParseManager';

import $ = require('jquery');

var Parse = require('parse').Parse;

let styles   = require('./home.css');
let template = require('./home.html');

@Component({
  selector: 'home'
})
@View({
  styles: [ styles ],
  template: template,
  directives: [ coreDirectives, NavigationComponent ]
})
export class Home {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;
    
constructor(public router: Router, parseManager: ParseManager) {
    this.jwt = localStorage.getItem('jwt');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
   
  }
    
collapse(){
    console.log('collapse');
    $(".collapse").collapse();
    $('.collapse').addClass('collapse');
}
    
  logout() {
    Parse.User.logOut();
    this.router.parent.navigate('/login');
  }

}
