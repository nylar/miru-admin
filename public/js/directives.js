angular.module('directives', []).

directive('progressBar', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'partials/_progress-bar.html',
        scope: {
            progress: '=',
            items: '=',
            done: '=',
            status: '='
        }
    };
});
