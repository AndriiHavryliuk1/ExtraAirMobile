angular.module('ExtraAir', [
	'ngRoute',
	'mobile-angular-ui',
	'swipe',
	'angular-jwt',
	'mgcrea.pullToRefresh'
])
	.config(function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'MainController',
			reloadOnSearch: false
		});
        $routeProvider.when("/login",{
            templateUrl:'LoginPage.html',
            controller:'LoginController'
        });
        $routeProvider.when("/registration",{
            templateUrl:'RegistrationPage.html',
            controller:'RegistrationController'
        });
        $routeProvider.when("/tourdetail",{
            templateUrl:'TourDetailPage.html',
            controller:'tourDetailController'
        });
        $routeProvider.when("/listoforders",{
            templateUrl:'ListOfOrdersPage.html',
            controller:'listOfOrdersController'
        });
        $routeProvider.when("/help",{
            templateUrl:'HelpPage.html'
        });



	}).controller("appController",function($scope,$rootScope) {
		$rootScope.mainTitle="ExtraAir"
});