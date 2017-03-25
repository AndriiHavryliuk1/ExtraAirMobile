angular.module('ExtraAir')

    .controller('RegistrationController', function ($q, $scope, $rootScope, $filter, $http, $route, $window, jwtHelper, URL_FOR_REST) {

        $rootScope.mainTitle = "Registration";

        $scope.submit = function() {
            $scope.client.Deleted = false;
            $scope.client.Phone = "";
            $scope.client.UserClaimId = 2;

            $http.post(URL_FOR_REST.url + "clients", $scope.client, {
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .success(function(data, status, headers, config) {
                    $rootScope.isAuthorized = true;
                    $rootScope.currentUser = data;
                    console.log("$rootScope.currentUser: " + $rootScope.currentUser);
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                    $window.location.href = "#/";
                })
                .error(function(data, status, headers, config) {
                    //  SendConfirmMesErrorService.SendMailError(user.UserId);
                    localStorage.removeItem('token');
                    $rootScope.isAuthorized = false;

                    //  alert("We have some trouble with our server please try again!")
                });


        };



    });
