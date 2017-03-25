
angular.module("ExtraAir").factory('GetService', ['$q','URL_FOR_REST', '$http',
    function ($q, $http,URL_FOR_REST ){

        var GetObjects = function (control) {
            return  $http.get(URL_FOR_REST.url + control)
                .then(function(responce) {
                    return $q.resolve(responce);
                })
                .catch(function(responce) {
                    return $q.reject(responce);
                });
        };
        return {
            GetObjects : GetObjects
        };
    }]);