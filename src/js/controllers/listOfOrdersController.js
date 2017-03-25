angular.module('ExtraAir')

    .controller('listOfOrdersController', function ($q, $scope, $rootScope, $window,  CrossingService, $filter, $http, $route, initService,URL_FOR_REST ,
                                            $timeout, TYPE_OF_GET, TABLES, GetService, QUERIES, dbAdapterService, SharedState) {


        if (!$rootScope.isAuthorized){
            $window.location.href = "#/login";
        }

        $scope.loading = true;
        $rootScope.mainTitle = "Your trips";
        $scope.OrderType = 'All';
        getOrdersInner();

        $scope.getOrders = function() {
            getOrdersInner();
        }

        console.log("orders"+$scope.OrderType);
        console.log("orders"+$scope.orders);



        function getOrdersInner() {
            getList(TYPE_OF_GET.orders + "/?userId=" + $rootScope.currentUser.UserId + "&type=" + $scope.OrderType)
                .then(function (responce) {
                    console.log(responce);
                    console.log(responce.data);
                    $scope.orders = responce.data;
                    $scope.failed = false;
                    setDate();
                    console.log();
                    $scope.loading = false;
                    if (!$scope.$$phase) {
                        $scope.$apply($scope.orders);
                    }
                })
                .catch(function (responce) {
                    alert("Server error! Check connection to internet!");
                    console.log("error");
                });
        }


        function setDate(){
            for( var i = 0; i < $scope.orders.length; i++){
                $scope.orders[i].timeStart = $filter('date')($scope.orders[i].DateStart, 'HH:mm');
                $scope.orders[i].timeFinish = $filter('date')($scope.orders[i].DateFinish, 'HH:mm');
                $scope.orders[i].dateStartR = $filter('date')($scope.orders[i].DateStart, 'yyyy-MM-dd');
                $scope.orders[i].dateFinishR = $filter('date')($scope.orders[i].DateFinish, 'yyyy-MM-dd');
                $scope.orders[i].dayStart = getDay(new Date($scope.orders[i].DateStart));
                $scope.orders[i].dayFinish = getDay(new Date($scope.orders[i].DateFinish));
            }

        }


        function getDay(date){
            var weekday = new Array(7);
            weekday[0] =  "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";

            return weekday[date.getDay()];
        }




        console.log("From root controller"+$scope.airportsFrom);


        function getList(url){
            return  $http.get(URL_FOR_REST.url + url)
                .then(function(responce) {
                    return $q.resolve(responce);
                })
                .catch(function(responce) {
                    return $q.reject(responce);
                });
        }

        $scope.GoToMain = function(){
            $window.location.href = "#/";
        }

        $scope.onReload = function () {
            $route.reload();
        }

    });
