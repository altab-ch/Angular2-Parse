/// <reference path="../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import {coreDirectives} from 'angular2/directives';
import {status, json} from '../utils/fetch'
import { Router, RouterLink } from 'angular2/router';
var Parse = require('parse').Parse;

Parse.initialize('QZRQeeMb5iGxtOtuEiSbFNMVrUtPhpdmRK3y7fiJ', 'S7n5EY6pRjLisMBZBgFm13Y9UOPaHvgL60yOMvJL');

window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ // this line replaces FB.init({
      appId      : '751514691637141', // Facebook App ID
      status     : true,  // check Facebook Login status
      cookie     : true,  // enable cookies to allow Parse to access the session
      xfbml      : true,  // initialize Facebook social plugins on the page
      version    : 'v2.3' // point to the latest Facebook Graph API version
    });

        // Run code after the Facebook SDK is loaded.
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

let styles   = require('./login.css');
let template = require('./login.html');


@Component({
  selector: 'login'
})
@View({
  styles: [ styles ],
  template: template,
  directives: [RouterLink, coreDirectives]
})
export class Login {
    
    errorMsg: string;
    
  constructor(public router: Router) {
  }

  login(event, username, password) {
    event.preventDefault();
   
    var self = this;
      
    this.errorMsg = null;
    Parse.User.logIn(username, password).then(function(){
          console.log("User logged in through email");
          self.router.parent.navigate('/home');
        },function(e){
          self.errorMsg = 'Wrong user/pass';
      });
      
  }

  signup() {
    event.preventDefault();
    this.router.parent.navigate('/signup');
  }
    
    signupFacebook(){
        Parse.FacebookUtils.logIn(null, {
        success: (user: Parse.User) => {
            if (!user.existed()) {
                console.log("User signed up and logged in through Facebook!");
                this.router.parent.navigate('/home');
            } else {
                console.log("User logged in through Facebook!");
                this.router.parent.navigate('/home');
            }
        },
        error: (user: Parse.User, error: any) => {
            alert("User cancelled the Facebook login or did not fully authorize.");
        }
    });
    }
}
