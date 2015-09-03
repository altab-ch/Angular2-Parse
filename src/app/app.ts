/// <reference path="../../typings/tsd.d.ts" />

import {View, Component} from 'angular2/angular2';
import {Location, RouteConfig, RouterLink, Router} from 'angular2/router';
import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {Home} from '../home/home';
import {Login} from '../login/login';
import {Signup} from '../signup/signup';
import {Products} from '../products/products';
import {CatCreate} from '../categoryCreate/catCreate';
import {NavigationComponent} from '../navigation/nav';

let template = require('./app.html');


@Component({
  selector: 'auth-app'
})
@View({
  template: template,
  directives: [ LoggedInRouterOutlet, NavigationComponent ]
})
@RouteConfig([
  { path: '/',       redirectTo: '/home' },
  { path: '/home',   as: 'home',   component: Home },
  { path: '/login',  as: 'login',  component: Login },
  { path: '/signup', as: 'signup', component: Signup },
  { path: '/products', as: 'products', component: Products },
  { path: '/products/create', as: 'categoryCreate', component: CatCreate },
  { path: '/products/:idproduct', as: 'productlist', component: Products },
  
])
export class App {
  constructor(public router: Router) {
  }
}
