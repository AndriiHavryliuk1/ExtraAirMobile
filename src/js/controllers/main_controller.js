angular.module('ExtraAir')

    .controller('MainController', function ($q, $scope, $rootScope,$window,  CrossingService, $filter, $http, $route, initService,URL_FOR_REST ,
                                            $timeout, TYPE_OF_GET, TABLES, GetService, QUERIES, dbAdapterService, SharedState) {
        $scope.airportsFrom = [];
        $scope.failed = false;
        $scope.loading = true;
        getAirportsFrom();

        $rootScope.mainTitle = "Search flight";

        $scope.passengersCount = [1,2,3,4,5,6,7,8,9,10,11];

        $scope.tourClass = ["Business", "Economy"];


        function getAirportsFrom() {
            getList(TYPE_OF_GET.airports)
                .then(function (responce) {
                    $scope.loading = false;
                    $scope.airportsFrom = responce.data;
                    $scope.failed = false;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }

                })
                .catch(function (responce) {

                    alert("Server error! Check connection to internet!");
                });
        }


        function getAirportsTo() {
            getList(TYPE_OF_GET.airports + "/byid/"+ $scope.SearchTour.FromId )
                .then(function (responce) {
                    console.log(responce);
                    console.log(responce.data);
                    $scope.airportsTo = responce.data;
                    $scope.failed = false;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }

                })
                .catch(function (responce) {
                    console.log("error");
                    alert("Server error! Check connection to internet!");
                });
        }

		$rootScope.closeSideBar=function(event) {
			SharedState.turnOff('uiSidebarLeft');
		};

        $rootScope.openSideBar=function(event) {
            SharedState.turnOn('uiSidebarLeft');
        };

        $scope.GetAirports = function(){
            console.log("!$scope.airportsFrom = "+!$scope.airportsFrom);
            if (!!$scope.airportsFrom) {
                getAirportsFrom();
            }
            console.log("!$scope.SearchTour.FromId = "+!$scope.SearchTour.FromId);
            console.log("$scope.SearchTour.FromId = "+$scope.SearchTour.FromId);

            if ($scope.SearchTour.FromId !== undefined || $scope.SearchTour.FromId !== null){
                getAirportsTo();
            }
            console.log("From getfuntion"+$scope.airportsFrom);
            console.log("From getfuntion"+$scope.airportsTo);
        };

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

        $scope.GotoSearchResult = function(){
            window.MacAddress.getMacAddress(
                function(macAddress) {
                    $scope.SearchTour.macAddress = macAddress;
                    console.log("macAddress" + macAddress);
                },function(fail)
                {
                    console.log("fail" + fail);
                }
            );


            if ($scope.SearchTour.FromId === undefined || $scope.SearchTour.ToId === undefined
                || $scope.SearchTour.Date === undefined || $scope.SearchTour.CountPassenger === undefined){
                $scope.failed = true;

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                return;
            }
            $scope.SearchTour.AirportFromCity = customFind($scope.airportsFrom,$scope.SearchTour.FromId);
            $scope.SearchTour.AirportToCity = customFind($scope.airportsTo,$scope.SearchTour.ToId);

            CrossingService.setTour($scope.SearchTour);

            function customFind(array, id){
                for (var i = 0; i < array.length; i++){
                    if (array.AirportId === id){
                        return array.City;
                    }
                }
            }

            $window.location.href = "#/searchresult";
        }
        
        $scope.onReload = function () {
            $route.reload();
        }

    });
