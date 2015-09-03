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

Parse.initialize('QZRQeeMb5iGxtOtuEiSbFNMVrUtPhpdmRK3y7fiJ', 'S7n5EY6pRjLisMBZBgFm13Y9UOPaHvgL60yOMvJL');

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
    //this.parse();
  }
    
parse(){
    
    //this.
}
    
collapse(){
    console.log('collapse');
    //$(".collapse").collapse();
    $('.collapse').addClass('collapse');
}
    
  logout() {
    Parse.User.logOut();
    this.router.parent.navigate('/login');
  }

  callAnonymousApi() {
    this._callApi('Anonymous', 'http://localhost:3001/api/random-quote');
  }

  callSecuredApi() {
    this._callApi('Secured', 'http://localhost:3001/api/protected/random-quote');
  }
  _callApi(type, url) {
    this.response = null;
    this.api = type;
    window.fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + this.jwt
      }
    })
    .then(status)
    .then(text)
    .then((response) => {
      this.response = response;
    })
    .catch((error) => {
      this.response = error.message;
    });
  }

}
