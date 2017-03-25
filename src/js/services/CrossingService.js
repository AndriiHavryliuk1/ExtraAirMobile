
var app = angular.module('ExtraAir');

app.service('CrossingService', function($rootScope) {
    // private variable
    var tour = {};
    var tourDetail = {};

    return {
        getTour: function() {
            return tour;
        },
        setTour: function(value) {
            tour = value;
        },
        getTourDetail: function(){
            return tourDetail;
        },
        setTourDetail: function(value){
            tourDetail = value;
        }
    };
})