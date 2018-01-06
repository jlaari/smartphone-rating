'use strict';
angular.module('ratingApp').factory('$exceptionHandler', exceptionHandler);

exceptionHandler.$inject = ['$log'];

function exceptionHandler ($log) {
    return function (exception, cause) {
        alert(exception.message);
        $log.error(exception);
    };
}