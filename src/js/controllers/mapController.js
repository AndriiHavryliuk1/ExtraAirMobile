angular.module('ExtraAir')

    .controller('mapController', function ($scope, $rootScope, TABLES) {
		$rootScope.mainTitle = "Map";
        $scope.map;
        var div = document.getElementById("map_canvas");
        const LP = new plugin.google.maps.LatLng(49.835453, 24.014388);
        $scope.map = plugin.google.maps.Map.getMap(div,
            {
                'camera': {
                    'latLng': LP,
                    'zoom': 17
                }
            });

        $scope.addMarker = function (latlng, title) {
            $scope.map.addMarker({
                'position': latlng,
                'title': title,
                'markerClick': function (marker) {
                    marker.showInfoWindow();
                },
                'infoClick': function (marker) {
                    marker.getPosition(function (latlng) {
                        var query = "DELETE FROM " + TABLES.markers + " WHERE  [latLng]='" + latlng.toString() + "'";
                        $rootScope.DB.transaction(function (tr) {
                            tr.executeSql(query, [], function () {
                                console.log("Success. Deleting marker from db");
                                marker.remove();
                            }, function (error) {
                                console.log("Error  execute sql (mapController)." + error)
                            });
                        }, function (error) {
                            console.log("Error (mapController). Error deleting marker from DB." + error);
                        });
                    });
                }
            }, function (marker) {
                // marker.showInfoWindow();
            });

        };

        $scope.loadMarkersFromDb = function () {
            $rootScope.DB.transaction(function (tr) {
                var query = "SELECT [id],[latLng],[title] FROM " + TABLES.markers;
                tr.executeSql(query, [], function (tx, result) {
                    if (result.rows.length > 0) {
                        for (var i = 0; i < result.rows.length; i++) {
                            var mar = result.rows.item(i);
                            var res = mar.latLng.split(",");
                            var latlng1 = new plugin.google.maps.LatLng(res[0], res[1]);
                            $scope.addMarker(latlng1, mar.title);
                        }
                    } else {
                        console.log("mapController. No markers in DB.");
                    }
                }, function (error) {
                    console.log("Error (mapController). ExecuteSql. " + error);
                });

            }, function (error) {
                console.log("Error (mapController). Selecting markers from DB. " + error);
            });
        };

        $scope.map.addEventListener(plugin.google.maps.event.MAP_READY, function () {
            $scope.loadMarkersFromDb();
        });

        //

        $scope.newMarkerName;
        $scope.tapMarkerPosition;
        $scope.btClick = function (result) {
            $scope.map.setClickable(true);
            if (result.buttonIndex != 0 && result.buttonIndex != 2) {
                $scope.newMarkerName = result.input1;

                $scope.addMarker($scope.tapMarkerPosition, $scope.newMarkerName);

                $rootScope.DB.transaction(function (tr) {
                    console.log("TABLE==" + TABLES.days);
                    var query = "INSERT INTO " + TABLES.markers + "(latLng,title) VALUES ('" + $scope.tapMarkerPosition.toString() + "','" + $scope.newMarkerName + "')";
                    tr.executeSql(query, [], function (tx, result) {
                        console.log("Success. Marker inserting");
                    }, function (error) {
                        console.log("Error execute sql (mapController).Inserting marker" + error);
                    });

                }, function (error) {
                    console.log("Error(mapController).Inserting marker" + error);
                });
            }

        };



          var onSuccess = function (location) {
         var msg = ["Current your location:\n",
         "latitude:" + location.latLng.lat,
         "longitude:" + location.latLng.lng,
         "speed:" + location.speed,
         "time:" + location.time,
         "bearing:" + location.bearing].join("\n");
		  $scope.map.setCenter(location.latLng);
         $scope.map.addMarker({
         'position': location.latLng,
         'title': msg
         }, function (marker) {
         marker.showInfoWindow();
         });
         };

         var onError = function (msg) {
         alert("error: " + msg);
         };

         $scope.findMe=function() {
			 $scope.map.getMyLocation(onSuccess, onError);
		 };

        var evtName = plugin.google.maps.event.MAP_LONG_CLICK;

        $scope.map.on(evtName, function (latLng) {
            $scope.map.setClickable(false);
            $scope.tapMarkerPosition = latLng;
            navigator.notification.prompt('Введіть назву', $scope.btClick, 'Додати нову відмітку', ['Додати', 'Закрити'], 'Назва');
        });


    });




