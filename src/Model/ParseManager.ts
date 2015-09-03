/// <reference path="../../typings/tsd.d.ts" />

var Parse = require('parse').Parse;
Parse.initialize('QZRQeeMb5iGxtOtuEiSbFNMVrUtPhpdmRK3y7fiJ', 'S7n5EY6pRjLisMBZBgFm13Y9UOPaHvgL60yOMvJL');

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
}