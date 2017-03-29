// Déclaration de mes modules en ajoutant un $rootScope pour utiliser mon tableau sur tout mes contrôleurs
var appRoute = angular.module('appRoute', ['ngRoute'])
        .run(function ($rootScope) {
            $rootScope.subjects = [];
        });
// Déclaration de mes routes
appRoute.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/home', {
                    templateUrl: 'partials/home.html',
                    controller: 'emailCtrl'
                })
                .when('/viewmail/:Id', {
                    templateUrl: 'partials/viewmail.html',
                    controller: 'viewCtrl'
                })
                .otherwise({
                    redirectTo: '/home'
                });
    }]);
// Déclaration de mon contrôleur email avec les modèles et les regex ainsi que la fonction du bouton pour ajouter les données saisies à un tableau
appRoute.controller('emailCtrl', ['$scope', function ($scope) {
        $scope.username = {
            model: 'Username',
            regex: /^[A-z- \\áàâäãçéèêëíìîïñóòôöõúùûüÁÀÂÄÇÉÈÊËÍÌÎÏÓÒÔÖÚÙÛÜ\s]{1,90}$/
        };
        $scope.email = {
            model: 'example@mail.com',
            regex: /^[\w\-\.]+[a-z0-9]@[\w\-\.]+[a-z0-9]\.[a-z]{2,}$/
        };
        $scope.subject = {
            regex: /^[\d\D]{2,44}$/,
            model: 'Objet'
        };
        $scope.someText = {
            regex: /^[\d\D]{1,}$/,
            model: 'Entrez votre texte'
        };
        $scope.buttonClick = function () {
            $scope.subjects.push({
                username: $scope.username.model,
                email: $scope.email.model,
                subject: $scope.subject.model,
                someText: $scope.someText.model
            });
        };
    }]);
// Déclaration de mon contrôleur view avec un $routeParams pour récupérer l'Id et s'en servir avec des fonctions pour afficher les données demandées
appRoute.controller('viewCtrl', ['$routeParams', '$scope', function ($routeParams, $scope) {
        $scope.username = function () {
            return $scope.subjects[$routeParams.Id].username;
        };
        $scope.subject = function () {
            return $scope.subjects[$routeParams.Id].subject;
        };
        $scope.someText = function () {
            return $scope.subjects[$routeParams.Id].someText;
        };
        $scope.email = function () {
            return $scope.subjects[$routeParams.Id].email;
        };
    }]);
