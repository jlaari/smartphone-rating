'use strict';
angular.module('ratingApp').service('productsService', productsService);

productsService.$inject = ['nonDominatedProductsService', 'dominatedProductsService', 'randomService', '$filter', '$q'];

function productsService(nonDominatedProductsService, dominatedProductsService, randomService, $filter, $q) {
    var _this = this;
    this.lastProducts = null;
    this.getProducts = function(settings) {
        var defer = $q.defer();
        nonDominatedProductsService.getOneRandomly().then(function(nonDominatedProduct) {
            // All brands must be different
            dominatedProductsService.getThreeRandomly(nonDominatedProduct.brand).then(function(dominatedProducts) {
                var products = randomService.shuffle(dominatedProducts.concat(nonDominatedProduct));

                // Add rating according given settings to all products
                for (var i = 0, l = products.length; i < l; i++) {
                    var product = products[i];
                    addRating(product, settings.minRating, settings.maxRating);
                }

                // Remove properties if needed
                var totalProperties = 10;
                products = removeProperties(products, totalProperties-settings.maxProperties, totalProperties-settings.minProperties);
                _this.lastProducts = products;

                defer.resolve(products);
            })
        });
        return defer.promise;
    };

    function removeProperties(products, min, max) {
        return randomService.removeProperties(products, min, max);
    }

    function addRating(product, min, max) {
        var rating = randomService.getRandomArbitrary(min, max);
        var ratingDecimal = $filter('number')(rating, 1);
        var ratingHalf = $filter('number')(roundHalf(ratingDecimal), 1);

        product.rating = ratingHalf;
        product.numberOfReviews = randomService.getRandomInt(900, 1200);
        product.ratingImage = "img/rating" + ratingHalf + ".jpg";
    }
}

function roundHalf(num) {
    return Math.round(num*2)/2;
}