'use strict';

/* Controllers */

var phonecatApp = angular.module('todoApp', []);

phonecatApp.controller('todoController', ['$scope', '$filter', function($scope, $filter) {
  $scope.todos = [
      {
        'title': 'Build a to do app',
        'done':true
      }];

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
