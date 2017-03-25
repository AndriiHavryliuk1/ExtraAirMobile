/**
 * Created by mykhailo.semeniuk on 11/15/2016.
 */

var app = angular.module('ExtraAir');

app.directive('onLongPress', function ($timeout) {
    return {
        restrict: 'A',
        scope:
        {
            onLongProgressCall:"&"
        },
        link: function ($scope, $elm, $attrs) {
            var flag = true;
            $elm.bind('mousedown', function (evt) {
                flag=true;
                $timeout(function () {
                    if(flag)
                    {
                  		$scope.$apply(function() {
							$scope.onLongProgressCall();
						});
                    }

                }, 1000);
            });

            $elm.bind('mouseup', function (evt) {
                  flag=false;

            });
        }

    };
});