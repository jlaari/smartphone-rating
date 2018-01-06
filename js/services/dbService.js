'use strict';
angular.module('ratingApp').service('db', dbService);

dbService.$inject = ['$http', '$q', '$log', 'mLabApiKey', 'mLabDatabase', 'mLabCollection'];

function dbService($http, $q, $log, mLabApiKey, mLabDatabase, mLabCollection) {
    this.savePurchase = function(data) {
        if (!verifySettings())
            return;
        $http({
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify( {"timestamp":  new Date().toISOString(), "task": data.task, "product": data.product, "rating": data.rating}),
            url: 'https://api.mlab.com/api/1/databases/'+mLabDatabase+'/collections/'+mLabCollection+'?apiKey='+mLabApiKey
        }).then(handlePurchaseResponse, handleError);
    };

    this.exportPurchases = function() {
        if (!verifySettings())
            return;
        var defer = $q.defer();
        $http({
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            url: 'https://api.mlab.com/api/1/databases/'+mLabDatabase+'/collections/'+mLabCollection+'?f={"_id": 0}&apiKey='+mLabApiKey
        }).then(function(response) {
            defer.resolve(response.data);
        }, function(response) {
            defer.reject();
            throw new Error("Error exporting purchases from database: " + angular.toJson(response));
        });
        return defer.promise;
    };

    this.emptyDatabase = function() {
        if (!verifySettings())
            return;
        $http({
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify([]),
            url: 'https://api.mlab.com/api/1/databases/'+mLabDatabase+'/collections/'+mLabCollection+'?&apiKey='+mLabApiKey
        }).then(function(response) {
            if (response.status === 200)
                alert("Database erased")
            else {
                handleError(response);
            }
        }, function(response) {
            throw new Error("Error erasing database: " + angular.toJson(response));
        });
    };

    function verifySettings() {
        if (mLabApiKey.length == 0 || mLabDatabase.length == 0 || mLabCollection.length == 0) {
            $log.warn("Please fill database settings");
            return false;
        }
        return true;
    }

    function handlePurchaseResponse(response) {
        if (response.status != 200)
            handleError(response);
    }

    function handleError(response) {
        throw new Error("Error saving purchase to database: " + angular.toJson(response));
    }
}
