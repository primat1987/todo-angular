'use strict';

/* Controllers */

var phonecatApp = angular.module('todoApp', ['ngRoute']);

phonecatApp.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
  
  // $locationProvider.html5Mode(true);
  // $locationProvider.hashPrefix('!');

  var routeConfig = {
    controller: 'todoController',
    //templateUrl: 'todo-index.html'
    templateUrl:'view/template.html'
  };

  $routeProvider
      .when('/', routeConfig)
      .when('/:status', routeConfig)
      .otherwise({
        redirectTo: '/'
      });


  
}]);

phonecatApp.controller('todoController', ['$scope', '$filter', '$routeParams', function($scope, $filter, $routeParams) {
  $scope.todos = [
      {
        'title': 'Build a to do app',
        'done':true
      },
      {
        'title': 'active',
        'done': false
      },
      {
        'title': 'completed',
        'done': true
      }];

    $scope.$on('$routeChangeSuccess', function () {
      var status = $scope.status = $routeParams.status || '';
      console.log("routeParams = " + $routeParams.status);

      var sF = $scope.statusFilter = (status === 'active') ? {done: false} : (status === 'completed') ? {done: true} : '';
      console.log("statusFilter = " + sF);
    });

  $scope.$watch('todos', function (newValue, oldValue) {
      console.log(oldValue[oldValue.length-1]);
      $scope.remainingCount = $filter('filter')($scope.todos, { 'done': false }).length;
      //$scope.completedCount = todos.length - $scope.remainingCount;
      //$scope.allChecked = !$scope.remainingCount;
    }, true);

  $scope.addToDo = function(){
    //if($scope.newtodo)
    var newItem = {
      'title': $scope.newtodo,
      'done': false
    };

    if(!newItem.title){
      return;
    }
    
    $scope.todos.push(newItem);
    $scope.newtodo = '';
  };

  $scope.removeToDo = function(todo){
    var index = $scope.todos.indexOf(todo);
    if(index > -1) {
      $scope.todos.splice(index, 1);
    };
  };

  $scope.clearCompleted = function(){
    $scope.todos = $scope.todos.filter(function(item){
      return !item.done;
    })
  };

  $scope.editToDo = function(todo){
    $scope.editedTodo = todo;
    $scope.originalTodo = angular.extend({}, todo);
    
  };
}]);
