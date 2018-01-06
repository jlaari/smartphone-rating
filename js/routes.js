'use strict';
angular.module('ratingApp').config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/start");
    $stateProvider
         .state('start', {
            url: "/start",
            templateUrl: "views/start.html"
      })
        .state('task', {
            url: "/task/:taskNumber?verify",
            controller: "taskController",
            templateUrl: "views/task.html"
      })
        .state('end', {
            url: "/end",
            templateUrl: "views/end.html",
            controller: "endController"
      })
        .state('db', {
            url: "/db",
            templateUrl: "views/db.html",
            controller: "dbController"
        })

}
