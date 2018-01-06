'use strict';
angular.module('ratingApp').controller('dbController', dbController);

dbController.$inject = ['$scope', 'db'];

function dbController($scope, db) {
    $scope.purchases = db.exportPurchases;
    $scope.emptyDatabase = function() {
        var answer = confirm("Are you sure? All data will be lost");
        if (answer == true) {
            db.emptyDatabase();
        } else {
            alert("Operating canceled");
        }
    }
}


