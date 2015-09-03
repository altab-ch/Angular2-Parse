import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/angular2';
import {Router, RouterOutlet} from 'angular2/router';
import {Injector} from 'angular2/di';
import {Login} from '../login/login';

var Parse = require('parse').Parse;

@Directive({
  selector: 'router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any
  constructor(public _elementRef: ElementRef, public _loader: DynamicComponentLoader,
              public _parentRouter: Router, @Attribute('name') nameAttr: string) {
      super(_elementRef, _loader, _parentRouter, nameAttr);

      this.publicRoutes = {
        '/login': true,
        '/signup': true
      };

  }

  activate(instruction) {
    var url = this._parentRouter.lastNavigationAttempt;
    if (!this.publicRoutes[url] && !Parse.User.current()){//!localStorage.getItem('jwt')) {
      instruction.component = Login;
    }
    return super.activate(instruction);
  }
}
