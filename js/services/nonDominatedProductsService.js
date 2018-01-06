'use strict';
angular.module('ratingApp').service('nonDominatedProductsService', nonDominatedProductsService);

nonDominatedProductsService.$inject = ['randomService', '$http'];

function nonDominatedProductsService(randomService, $http) {
    this.getOneRandomly = function () {
        return $http({method: 'GET', url: 'data/nonDominatedProducts.json'}).then(function(response) {
            var items = response.data;
            return items[randomService.getRandomInt(0, items.length - 1)];
        });
    }
}
