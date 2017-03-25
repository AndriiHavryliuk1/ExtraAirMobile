var app = angular.module('ExtraAir');


app.constant('URL_FOR_REST', {
    url: 'http://extraairapi.azurewebsites.net/api/',
    urlForLogin: 'http://extraairapi.azurewebsites.net/'
});

app.constant('TYPE_OF_GET', {
    airports: 'airports',
    clients: 'clients',
    planes: 'planes',
    tours: 'tours',
    orders: 'orders'
});

