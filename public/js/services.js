angular.module('services', []).

factory('MiruApiService', ['$http', function($http) {
    var factory = {};

    factory.statuses = ['active', 'paused', 'finished'];

    factory.fetch = function(url) {
        return $http.get(url).then(function(result) {
            return result.data;
        });
    };

    return factory;
}]);
