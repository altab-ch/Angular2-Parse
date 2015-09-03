/// <reference path="../../typings/tsd.d.ts" />

import {coreDirectives} from 'angular2/directives';
import {Component, View} from 'angular2/angular2';
import {status, json} from '../utils/fetch';
import { Router, RouterLink } from 'angular2/router';

let styles   = require('./signup.css');
let template = require('./signup.html');

var Parse = require('parse').Parse;
Parse.initialize('QZRQeeMb5iGxtOtuEiSbFNMVrUtPhpdmRK3y7fiJ', 'S7n5EY6pRjLisMBZBgFm13Y9UOPaHvgL60yOMvJL');

@Component({
  selector: 'signup'
})
@View({
  directives: [ RouterLink, coreDirectives ],
  styles: [ styles ],
  template: template
})
export class Signup {
  constructor(public router: Router) {
  }

  signup(event, username, password) {
    event.preventDefault();
    
    var self = this
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);

    user.signUp().then(function(){
        console.log("User signed in through email");
        self.router.parent.navigate('/home');
    }, function(e){
        console.log("Signin failed through email");
    });
  }

  login(event) {
    event.preventDefault();
    this.router.parent.navigate('/login');
  }

}
