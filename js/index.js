angular.module('starter', ['ionic'])

.controller('MyCtrl', function($scope, $ionicScrollDelegate, $rootScope) {
  $rootScope.slideHeader = false;
  $rootScope.slideHeaderPrevious = 0;
})

.directive('scrollWatch', function($rootScope) {
  return function(scope, elem, attr) {
    var start = 0;
    var threshold = 150;
    
    elem.bind('scroll', function(e) {
      if(e.detail.scrollTop - start > threshold) {
        $rootScope.slideHeader = true;
      } else {
        $rootScope.slideHeader = false;
      }
      if ($rootScope.slideHeaderPrevious >= e.detail.scrollTop - start) {
        $rootScope.slideHeader = false;
      }
     //probar: $rootScope.slideHeaderPrevious = e.detail.scrollTop - start + -10;
     $rootScope.slideHeaderPrevious = e.detail.scrollTop - start;
     console.log("appy");
      $rootScope.$apply();

         


    });
  };
});