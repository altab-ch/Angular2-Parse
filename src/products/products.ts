/// <reference path="../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {RouteParams} from 'angular2/router';
import {Inject} from 'angular2/di';
import {ParseManager} from '../Model/ParseManager';
import {NgFor} from 'angular2/directives';

let template = require('./products.html');
let styles   = require('./products.css');

@Component({
  selector: 'products'
})

@View({
  styles: [ styles ],
  template: template,
  directives:[NgFor],
})

export class Products {
    
    categories: Parse.Object[];
    
    constructor(public router: Router, parseManager: ParseManager, @Inject(RouteParams) params) {
        parseManager.getProductsCategory((categories)=>{this.categories = categories});
        var catId = params.get('idproduct');
        if (catId != null) {
            parseManager.getProducts(catId, (products)=>{console.log(products.length);});
        }
    }

    selectCat (category)
    {
        this.router.parent.navigate('/products/'+category.id);
    }
    
    createCat ()
    {
        this.router.parent.navigate('/products/create');
    }
}
