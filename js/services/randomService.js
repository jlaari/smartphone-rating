'use strict';
angular.module('ratingApp').service('randomService', randomService);

function randomService() {
    this.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.getRandomArbitrary = function(min, max) {
        return Math.random() * (max - min) + min;
    }

    this.shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    this.removeProperties = function(products, min,max) {
        var newProducts=[];
        var numberOfItemsToRemove = this.getRandomInt(min,max);
        var propertiesKeys = Object.keys(products[0].properties);
        var properties = this.shuffle(propertiesKeys);
        properties.splice(0,numberOfItemsToRemove); // keep properties that exists in list

        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            for (var property in product.properties) {
                if (properties.indexOf(property) === -1) {
                    delete product.properties[property];
                }
            }
            newProducts.push(product);
        }
        return newProducts;
    }
}
