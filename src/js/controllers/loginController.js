angular.module('ExtraAir')

    .controller('LoginController', function ($q, $scope, $rootScope, $filter, $http, GetService, $route, $window, jwtHelper, URL_FOR_REST) {

        $rootScope.mainTitle = "Account";
        $scope.submit = function() {
            $scope.failed = false;
            //sha256.convertToSHA256($scope.Password);
            var body = "grant_type=password&username=" + $scope.user.Email + "&password=" + $scope.user.Password + "&client=";
            console.log("intoSubmit body " + body);
            $http
                .post(URL_FOR_REST.urlForLogin + "Token", body, {
                    headers: {
                        'Content-Type': 'x-www-form-urlencoded'
                    }
                })
                .success(function(data, status, headers, config) {
                    if (data.access_token != undefined) {
                        localStorage.setItem('token', data.access_token);
                        console.log("data.access_token =  " + data.access_token);
                        $rootScope.isAuthorized = true;
                        var x = jwtHelper.decodeToken(data.access_token);
                       // $rootScope.canRegister = x.role == USER_ROLES.patient;
                        console.log("jwtHelper.decodeToken(data.access_token): " + x);


                        GetUser("clients/" + x.id)
                            .then(function (responce) {
                                console.log(responce);
                                console.log(responce.data);
                                $rootScope.currentUser = responce.data;
                                console.log("$rootScope.currentUser: " + $rootScope.currentUser);
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                                $window.location.href = "#/";

                            })
                            .catch(function (responce) {
                                console.log("error");
                            });




                    }
                })
                .error(function(data, status, headers, config) {
                    console.log("jwtHelper.decodeToken(data.access_token):error!!!! ");
                    localStorage.removeItem('token');
                    $rootScope.isAuthorized = false;
                    $rootScope.currentUser = undefined
                });
        };


        $scope.logout = function(){
            localStorage.removeItem('token');
            $rootScope.isAuthorized = false;
            $rootScope.currentUser = undefined;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $route.reload();
        }

        function GetUser(control) {
            return  $http.get(URL_FOR_REST.url + control)
                .then(function(responce) {
                    return $q.resolve(responce);
                })
                .catch(function(responce) {
                    return $q.reject(responce);
                });
        };


    });
