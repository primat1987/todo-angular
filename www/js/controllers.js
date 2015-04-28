'use strict';

/* Controllers */

var phonecatApp = angular.module('todoApp', []);

phonecatApp.controller('todoController', ['$scope', function($scope) {
  $scope.todos = [
      {
        'title': 'Build a to do app',
        'done':true
      }];

  $scope.addToDo = function(){
    $scope.todos.push({'title': $scope.newtodo, 'done' : false});
    $scope.newtodo = '';
  };

  $scope.clearCompleted = function(){
    $scope.todos = $scope.todos.filter(function(item){
      return !item.done;
    })
  };
}]);
