angular.module('ExtraAir')

    .controller('searchresultController', function ($q, $scope, $rootScope, $window, CrossingService, $filter, $http, initService,URL_FOR_REST ,
                                            $timeout, TYPE_OF_GET) {

        $rootScope.mainTitle = "Choose tour";

        $scope.loading = true;
        $scope.SearchTour = CrossingService.getTour();

        $scope.failed = false;
        getSearchResult();

        function getSearchResult() {
            getList(TYPE_OF_GET.tours + "/bysearch?airportFromId="+ $scope.SearchTour.FromId
                + "&airportToId=" + $scope.SearchTour.ToId)
                .then(function (responce) {
                    $scope.searchResult = responce.data;
                    if ($scope.SearchTour.TourClass === 'Economy')
                        correctData(1.15);
                    if ($scope.SearchTour.TourClass === 'Business')
                        correctData(2.15);

                    $scope.loading = false;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }

                })
                .catch(function (responce) {
                    console.log("error");
                });
        }

        function correctData(coef){
            for (var i = 0; i < $scope.searchResult.length; i++){
                $scope.searchResult[i].timeStart = $filter('date')($scope.searchResult[i].DateStart, 'HH:mm');
                $scope.searchResult[i].timeFinish = $filter('date')($scope.searchResult[i].DateFinish, 'HH:mm');
                $scope.searchResult[i].dateStartR = $filter('date')($scope.SearchTour.Date, 'yyyy-MM-dd');
                $scope.searchResult[i].Price = ($scope.searchResult[i].Price * coef).toFixed(0);
            }
        }

        function getList(url){
            return  $http.get(URL_FOR_REST.url + url)
                .then(function(responce) {
                    return $q.resolve(responce);
                })
                .catch(function(responce) {
                    return $q.reject(responce);
                });
        }

        function getTourById(id){
            for (var i = 0; i < $scope.searchResult.length; i++){
                if ($scope.searchResult[i].TourId === id){
                    return $scope.searchResult[i];
                }
            }
        }

        $scope.GoToTourDetail = function(id){
            if (!$rootScope.isAuthorized){
                $scope.failed = true;
                return;
            }
            var tour = getTourById(id);
            tour.CountPassenger = $scope.SearchTour.CountPassenger;
            tour.TourClass = $scope.SearchTour.TourClass;
            CrossingService.setTourDetail(tour);
            $window.location.href = "#/tourdetail";
        }
    });
