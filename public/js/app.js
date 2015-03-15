angular.module('miruAdmin', ['ngRoute', 'controllers', 'directives']).

config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
    when("/", {
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardController'
    }).

    when("/queues", {
        templateUrl: 'partials/queue-list.html',
        controller: 'QueueListController'
    }).

    when("/queue/:id", {
        templateUrl: 'partials/queue-view.html',
        controller: 'QueueViewController'
    }).

    when("/sites", {
        templateUrl: 'partials/site-list.html',
        controller: 'SiteListController'
    }).

    when("/site/add", {
        templateUrl: 'partials/site-add.html',
        controller: 'SiteAddController'
    }).

    when("/404", {
        templateUrl: 'partials/404.html',
        controller: 'FourOhFourController'
    }).

    otherwise({
        redirectTo: "/404"
    });
}]);
