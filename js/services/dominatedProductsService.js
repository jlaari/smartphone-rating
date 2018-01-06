'use strict';
angular.module('ratingApp').service('dominatedProductsService', dominatedProductsService);

dominatedProductsService.$inject = ['randomService', '$http'];

function dominatedProductsService(randomService, $http) {
    this.getThreeRandomly = function (notToBeIncludedBrand) {
        return $http({method: 'GET', url: 'data/dominatedProducts.json'}).then(function(response) {
            var products = response.data;
            var brands = getBrandsWithout(notToBeIncludedBrand);
            var allThreeProducts = [];
            for (var i = 0; i < brands.length; i++) {
                var brand = brands[i];
                var brandProducts = getProductsByBrand(products, brand);
                var randomPlace = randomService.getRandomInt(0, brandProducts.length - 1);
                allThreeProducts.push(brandProducts[randomPlace]);
            }
            return randomService.shuffle(allThreeProducts);
        })
    };

    function getBrandsWithout(brandToBeRemoved) {
        var brands = ["Samsung", "Sony", "LG", "Huawei"];
        var index = brands.indexOf(brandToBeRemoved);
        brands.splice(index, 1);
        return brands;
    }

    function getProductsByBrand(products, brand) {
        return products.filter(function(product) {
            return product.brand == brand;
        });
    }
}

