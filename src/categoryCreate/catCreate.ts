import {Component, View} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {ParseManager} from '../Model/ParseManager';

let template = require('./catCreate.html');
let styles   = require('./catCreate.css');

@Component({
  selector: 'products'
})

@View({
  styles: [ styles ],
  template: template,
})

export class CatCreate {
    
    constructor(public router: Router, public parseManager: ParseManager) {
        
    }

    createCat (event, name)
    {
        event.preventDefault();
        
        this.parseManager.createCategory(name, (category)=>{this.router.parent.navigate('/products');});
        
    }
}
