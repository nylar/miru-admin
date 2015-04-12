angular.module('controllers', ['services']).

controller('NavigationController', ['$scope', '$location',
    function($scope, $location) {
        $scope.navigation = function(page) {
            var current = $location.path().substring(1);
            return page == current ? "active" : "";
        };
    }
]).

controller('FourOhFourController', ['$scope',
    function($scope) {}
]).

controller('DashboardController', ['$scope',
    function($scope) {
        $scope.title = "Dashboard";
    }
]).

controller('QueueListController', ['$scope', '$timeout', 'MiruApiService',
    function($scope, $timeout, MiruApiService) {
        $scope.statuses = MiruApiService.statuses;
        $scope.queues = [];

        function poll() {
            var fetchPromise = MiruApiService.fetch("http://localhost:8036/api/queues/");
            fetchPromise.then(function(result) {
                $scope.queues = result.data;
                $timeout(poll, 1000);
            });
        }
        poll();

        $scope.title = "Queue List";
    }
]).

controller('QueueViewController', ['$scope', '$routeParams', '$timeout', 'MiruApiService',
    function($scope, $routeParams, $timeout, MiruApiService) {
        var queueId = $routeParams.id;
        $scope.title = "Queue for " + queueId;

        $scope.queue = {};

        function poll() {
            var fetchPromise = MiruApiService.fetch("http://localhost:8036/api/queue/" + queueId);
            fetchPromise.then(function(result) {
                $scope.queue = result.data;
                $scope.itemCount = $scope.queue.items == null ? 0 : $scope.queue.items.length;
                var doneItems = function() {
                    if ($scope.queue.status == "finished") {
                        return $scope.queue.items;
                    }
                    var done = _.filter($scope.queue.items, function(item) {
                        return item.done == true
                    });
                    return done;
                }();
                $scope.doneCount = doneItems.length;

                $scope.progress = $scope.itemCount == 0 ? 0 : Math.round(($scope.doneCount / $scope.itemCount) * 100);
                $timeout(poll, 1000);
            });
        }
        poll();
    }
]).

controller('SiteListController', ['$scope', '$timeout', 'MiruApiService',
    function($scope, $timeout, MiruApiService) {
        $scope.sites = [];

        function poll() {
            var fetchPromise = MiruApiService.fetch("http://localhost:8036/api/sites");
            fetchPromise.then(function(result) {
                $scope.sites = result.data;
                $timeout(poll, 1000);
            });
        }
        poll();

        $scope.title = "Site List";
    }
]).

controller('SiteAddController', ['$scope', '$location', 'MiruApiService',
    function($scope, $location, MiruApiService) {
        $scope.addSite = function() {
            var url = $scope.url;
            url = encodeURIComponent(url);

            var fetchPromise = MiruApiService.fetch("http://localhost:8036/api/crawl?url=" + url);
            fetchPromise.then(function(result) {
                $location.path("queues");
                $scope.apply();
            });
        };

        $scope.title = "Add Site";
    }
]);