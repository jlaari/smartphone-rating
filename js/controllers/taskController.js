'use strict';
angular.module('ratingApp').controller('taskController', taskController);

taskController.$inject = ['$scope', 'productsService', '$stateParams', '$state', 'db'];

function taskController($scope, productsService, $stateParams, $state, db) {
    $scope.model = {};
    $scope.model.taskNumber = parseInt($stateParams.taskNumber);
    $scope.model.verify = $stateParams.verify === "true";
    $scope.model.products = null;

    $scope.purchase = purchaseClick;
    $scope.getScope = getScope;

    getProductsToScope();

    function getProductsToScope() {
        if ($scope.model.verify) {
            // Get same products than in task
            var products = productsService.lastProducts;
            updateProductsToScope(products);
        } else {
            switch ($scope.model.taskNumber) {
                case -1:
                    // Test
                    productsService.getProducts({minRating: 0, maxRating: 5, minProperties: 3, maxProperties: 10}).then(function(products) {
                        updateProductsToScope(products);
                    });
                    break;
                case 0:
                    // Test
                    productsService.getProducts({minRating: 0, maxRating: 5, minProperties: 3, maxProperties: 10}).then(function(products) {
                        updateProductsToScope(products);
                    });
                    break;
                case 1:
                    // Easy
                    productsService.getProducts({minRating: 4.4, maxRating: 5, minProperties: 3, maxProperties: 5}).then(function(products) {
                        updateProductsToScope(products);
                    });
                    break;
                case 2:
                    // Hard
                    productsService.getProducts({minRating: 0, maxRating: 3, minProperties: 8, maxProperties: 10}).then(function(products) {
                        updateProductsToScope(products);
                    });
                    break;
                case 3:
                    // Easy
                    $scope.model.products = productsService.getProducts({minRating: 3.5, maxRating: 5, minProperties: 3, maxProperties: 5}).then(function(products) {
                        updateProductsToScope(products);
                    });
                    break;
                case 4:
                    // Hard
                    productsService.getProducts({minRating: 0, maxRating: 3, minProperties: 8, maxProperties: 10}).then(function(products) {
                        updateProductsToScope(products);
                    });
                    break;
                case 5:
                    // Easy
                    productsService.getProducts({minRating: 0, maxRating: 3, minProperties: 3, maxProperties: 5}).then(function(products) {
                        updateProductsToScope(products);
                    });
                    break;
                case 6:
                    // Hard
                    productsService.getProducts({minRating: 3.5, maxRating: 4.4, minProperties: 8, maxProperties: 10}).then(function(products) {
                        updateProductsToScope(products);
                    });
                    break;
                case 7:
                    // Easy
                    productsService.getProducts({minRating: 0, maxRating: 3, minProperties: 3, maxProperties: 5}).then(function(products) {
                        updateProductsToScope(products);
                    });
                    break;
                case 8:
                    // Hard
                    productsService.getProducts({minRating: 3.5, maxRating: 5, minProperties: 8, maxProperties: 10}).then(function(products) {
                        updateProductsToScope(products);
                    });
                    break;
                case 9:
                    // Easy
                    productsService.getProducts({minRating: 0, maxRating: 3, minProperties: 3, maxProperties: 5}).then(function(products) {
                        updateProductsToScope(products);
                    });
                    break;
                case 10:
                    // Hard
                    productsService.getProducts({minRating: 0, maxRating: 3, minProperties: 8, maxProperties: 10}).then(function(products) {
                        updateProductsToScope(products);
                    });
                    break;
                case 11:
                    // Easy
                    productsService.getProducts({minRating: 3.5, maxRating: 4.4, minProperties: 3, maxProperties: 5}).then(function(products) {
                        updateProductsToScope(products);
                    });
                    break;
                case 12:
                    // Hard
                    productsService.getProducts({minRating: 4.4, maxRating: 5, minProperties: 8, maxProperties: 10}).then(function(products) {
                        updateProductsToScope(products);
                    });
                    break;
                case 13:
                    $state.go("end");
                    break;
                default:
                    throw Error("Unexpected task number: " + $scope.model.taskNumber);
            }
        }
    }

    function purchaseClick(selectedProduct) {
        if ($scope.model.verify) {
            // After task is verified, go to next task
            $state.go("task", {taskNumber: $scope.model.taskNumber+1, verify: false}, { reload: true });
        }
        else {
            // After task we save information to db and verify task
            if ($scope.model.taskNumber > 0) {
                var product = selectedProduct.brand +" " + selectedProduct.model;
                db.savePurchase({'task': $scope.model.taskNumber, 'product': product, 'rating': selectedProduct.rating})
            }
            $state.go("task", {taskNumber: $scope.model.taskNumber, verify: true}, { reload: true });
        }
    }

    function getScope() {
            return $scope;
    }

    function updateProductsToScope(products) {
        $scope.model.products = products;
    }
}


