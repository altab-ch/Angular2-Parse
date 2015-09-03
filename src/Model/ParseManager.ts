/// <reference path="../../typings/tsd.d.ts" />

var Parse = require('parse').Parse;
Parse.initialize('', '');

export class ParseManager{
    constructor(){
        
    }
    
    getOrders(){
        return 'test';
    }
    
    getProductsCategory(success: (products) => void)
    {
        var catClass = Parse.Object.extend("ProductsCategory");
        var query = new Parse.Query(catClass);
        query.find({
        success: function(categories) {
            success(categories);
        }
        });
    }
    
    getProducts(category: String, success:(products)=>void)
    {
        var cat = Parse.Object.extend("ProductsCategory");
        //var pro = Parse.Object.extend("Products");
        var innerQuery = new Parse.Query(cat);
        innerQuery.equalTo("objectId", category);
        //innerQuery.include("products");
        //var query = new Parse.Query(pro);
        //query.matchesQuery("category", innerQuery);
        innerQuery.find({
            success: function(products) {
                var pro = Parse.Object.extend("Products");
                var query = new Parse.Query(pro);
                query.equalTo("category", products[0]);
                query.find({
                    success: function(products) {
                        success(products);
                    }
                });
            }
        });
    }
    
    createCategory(name: String, success:(category)=>void)
    {
        var CategoryClass = Parse.Object.extend("ProductsCategory");
        var cat = new CategoryClass();

        cat.set("name",name);

        cat.save(null,{
          success:function(category) { 
            success(category);
          },
          error:function(error) {
            console.log('parse saving error');
          }
        });
    }
    
    logIn(username: String, password: String, success: ()=> void, error: ()=>void)
    {
        Parse.User.logIn(username, password).then(function(){
            success();
        },function(e){
            error();
        });
    }
    
    logInFacebook(success: (user: Parse.User) => void, error: (user: Parse.User, error: any) => void)
    {
        Parse.FacebookUtils.logIn(null, {
            success: (user: Parse.User) => {
                success(user);
            },
            error: (user: Parse.User, error: any) => {
                error(user, error);
            }
        });
    }
    
    signup(username: String, password: String, success: ()=>void)
    {
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);

        user.signUp().then(function(){
            success();
        }, function(e){
            console.log("Signin failed through email");
        });
    }
}