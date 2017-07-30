var myApp = angular.module("myApp",[
    'ngRoute', 'ui.bootstrap','ngResource', 'ngAnimate', 'btford.socket-io'])
    .config(['$routeProvider','$locationProvider', '$httpProvider' , function($routeProvider,$locationProvider,$httpProvider){
        //$locationProvider.hashPrefix('');
        
        $routeProvider.when('/home',{templateUrl: 'partials/home.html', controller:'homeController'});
        $routeProvider.when('/login',{templateUrl: '/partials/projects/login.html', controller:'loginController'});
         
        $routeProvider.when('/userapi', {templateUrl:'/partials/projects/userapi.html', controller:'usersController'})
        $routeProvider.when('/chat', {templateUrl:'/partials/projects/chat.html', controller:'chatController'})
        //$routeProvider.when('/', {controller:'defaultController'})
        
        $routeProvider.otherwise({redirectTo:'/home'});
        
        $locationProvider.html5Mode({enabled: true, requireBase: false});
    }]).filter('startFrom', function(){
        return function(data, start){
            return data.slice(start);
        }
    });