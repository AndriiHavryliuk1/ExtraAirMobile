angular.module('ExtraAir')

    .controller('tourDetailController', function ($rootScope, $q, $scope,  $window, CrossingService, $filter, $http, initService,
                                                  URL_FOR_REST) {

        if (!$rootScope.isAuthorized){
            $window.location.href = "#/login";
        }

        $rootScope.mainTitle = "Tour detail";
        $scope.success = false;
        $scope.failed = false;
        $scope.Tour = CrossingService.getTourDetail();
        console.log("detail:" + $scope.Tour);
        console.log($scope.Tour);
        console.log("$scope.Tour.Price : " + $scope.Tour.Price);
        console.log("$scope.Tour.CountPassenger : " + $scope.Tour.CountPassenger)

        $scope.Tour.Price *=  $scope.Tour.CountPassenger;
        setDate();

        function setDate(){
            $scope.Tour.dayStart = getDay(new Date($scope.Tour.dateStartR));
            $scope.Tour.dayFinish = getDay(new Date($scope.Tour.dateStartR));
        }

        console.log($scope.Tour);

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

        $scope.onReload = function () {
            $route.reload();
        }

        $scope.postOrder = function() {
            var tour = {
                "UserId": $rootScope.currentUser.UserId,
                "Paid": false,
                "Price": $scope.Tour.Price,
                "Date": new Date(),
                "DateStartTour": $scope.Tour.dateStartR + "T" + $scope.Tour.timeStart,
                "DateFinishTour": $scope.Tour.dateStartR + "T" + $scope.Tour.timeFinish,
                "Tours": [{
                    "TourId": $scope.Tour.TourId
                }]
            };

            $http.post(URL_FOR_REST.url + "orders", tour, {
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .success(function (data, status, headers, config) {
                    $scope.success = true;
                })
                .error(function (data, status, headers, config) {
                    $scope.failed = true;

                });
        }
    });
