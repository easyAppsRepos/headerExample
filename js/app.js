var nameApp = angular.module('starter', ['ionic']);
 
nameApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
 
  $ionicConfigProvider.views.transition('none');
 
  $stateProvider
    .state('list', {
      url: '/',
      templateUrl: 'list.html',
      controller: 'ListCtrl'
    })
    .state('view', {
      url: '/movie/:movieid',
      templateUrl: 'view.html',
      controller: 'ViewCtrl'
    })
     .state('detail', {
      url: '/detail',
      templateUrl: 'detail.html',
      controller: 'ListCtrl'
    })

     .state('pujas', {
      url: '/pujas',
      templateUrl: 'pujas.html',
      controller: 'ListCtrl'
    })
          .state('filtros', {
      url: '/filtros',
      templateUrl: 'filtros.html',
      controller: 'ListCtrl'
    })

      .state('miPerfil', {
      url: '/miPerfil',
      templateUrl: 'miPerfil.html',
      controller: 'ListCtrl'
    })

      .state('userFotos', {
      url: '/userFotos',
      templateUrl: 'userFotos.html',
      controller: 'ListCtrl'
    })

            .state('misMensajes', {
      url: '/misMensajes',
      templateUrl: 'misMensajes.html',
      controller: 'ListCtrl'
    })
            .state('misAlertas', {
      url: '/misAlertas',
      templateUrl: 'misAlertas.html',
      controller: 'ListCtrl'
    })   
      ;
 
 
  $urlRouterProvider.otherwise("/");
 
});
 
nameApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

 var push = PushNotification.init({
    "android": {
        "senderID": "332867885048"
    },
    "ios": {
        "alert": "true",
        "badge": "true",
        "sound": "true"
    },
    "windows": {}
});

push.on('registration', function(data) {
    
   //alert("alert1");
   alert(data.registrationId);
   //localStorage.setItem('pushKey', data.registrationId);



});

push.on('notification', function(data) {

  alert('Tienes una notificacion: '+data.title);

});

push.on('error', function(e) {
    console.log(e.message);

}); 

    // then override any default you want
    window.plugins.nativepagetransitions.globalOptions.duration = 500;
    window.plugins.nativepagetransitions.globalOptions.iosdelay = 350;
    window.plugins.nativepagetransitions.globalOptions.androiddelay = 350;
    window.plugins.nativepagetransitions.globalOptions.winphonedelay = 350;
    window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 4;
    // these are used for slide left/right only currently
    window.plugins.nativepagetransitions.globalOptions.fixedPixelsTop = 0;
    window.plugins.nativepagetransitions.globalOptions.fixedPixelsBottom = 0;
 
  });
});
 
nameApp.factory('Movies', function($http) {
  var cachedData;
  var movieName;
 
  function getData(moviename, callback) {
 
    var url = 'http://api.themoviedb.org/3/',
      mode = 'search/movie?query=',
      name = '&query=' + encodeURI(moviename),
      key = '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
 
    movieName = moviename;
 
    $http.get(url + mode + key + name).success(function(data) {
 
      cachedData = data.results;
      callback(data.results);
    });
  }
 
  return {
    list: getData,
    find: function(name, callback) {
      console.log(name);
 
      var movie = cachedData.filter(function(entry) {
        return entry.id == name;
      })[0];
      callback(movie);
    }
  };
 
});
 
nameApp.service('Navigation', function($state) {
  //directly binding events to this context
  this.goNative = function(view, data, direction) {
    $state.go(view, data);
    window.plugins.nativepagetransitions.slide({
        "direction": direction
      },
      function(msg) {
        console.log("success: " + msg)
      }, // called when the animation has finished
      function(msg) {
        alert("error: " + msg)
      } // called in case you pass in weird values
    );
  };
});
 
 nameApp.controller('nuevaPropuestaCtrl',function($scope, $timeout, $filter) { 
  
  $scope.users = [
    {id: 1, name: "Valentina", selected: true},
    {id: 2, name: "Juan David", selected: false},
    {id: 3, name: "Osman", selected: false},
    {id: 4, name: "Silva", selected: false}
  ];
  
  $scope.groups = [
    {Id: 1, Name: "Admin", Selected: false},
    {Id: 2, Name: "Developers", Selected: false},
    {Id: 3, Name: "Testers", Selected: false},
    {Id: 4, Name: "Users", Selected: false}
  ];
  
  $scope.getOptionsSelected = function(options, valueProperty, selectedProperty){
    var optionsSelected = $filter('filter')(options, function(option) {return option[selectedProperty] == true; });
    return optionsSelected.map(function(group){ return group[valueProperty]; }).join(", ");
  };
});


//directiva para la seleccion multiple
 nameApp.directive('ionMultipleSelect', ['$ionicModal', '$ionicGesture', function ($ionicModal, $ionicGesture) {
  return {
    restrict: 'E',
    scope: {
      options : "="
    },
    controller: function ($scope, $element, $attrs) {
      $scope.multipleSelect = {
        title:            $attrs.title || "Select Options",
        tempOptions:      [],
        keyProperty:      $attrs.keyProperty || "id",
        valueProperty:    $attrs.valueProperty || "value",
        selectedProperty: $attrs.selectedProperty || "selected",
        templateUrl:      $attrs.templateUrl || 'templates/multipleSelect.html',
        renderCheckbox:   $attrs.renderCheckbox ? $attrs.renderCheckbox == "true" : true,
        animation:        $attrs.animation || 'slide-in-up'
      };

      $scope.OpenModalFromTemplate = function (templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
          scope: $scope,
          animation: $scope.multipleSelect.animation
        }).then(function (modal) {
          $scope.modal = modal;
          $scope.modal.show();
        });
      };
      
      $ionicGesture.on('tap', function (e) {
       $scope.multipleSelect.tempOptions = $scope.options.map(function(option){
         var tempOption = { };
         tempOption[$scope.multipleSelect.keyProperty] = option[$scope.multipleSelect.keyProperty];
         tempOption[$scope.multipleSelect.valueProperty] = option[$scope.multipleSelect.valueProperty];
         tempOption[$scope.multipleSelect.selectedProperty] = option[$scope.multipleSelect.selectedProperty];
         
         return tempOption;
       });
        $scope.OpenModalFromTemplate($scope.multipleSelect.templateUrl);
      }, $element);
      
      $scope.saveOptions = function(){
        for(var i = 0; i < $scope.multipleSelect.tempOptions.length; i++){
          var tempOption = $scope.multipleSelect.tempOptions[i];
          for(var j = 0; j < $scope.options.length; j++){
            var option = $scope.options[j];
            if(tempOption[$scope.multipleSelect.keyProperty] == option[$scope.multipleSelect.keyProperty]){
              option[$scope.multipleSelect.selectedProperty] = tempOption[$scope.multipleSelect.selectedProperty];
              break;
            }
          }
        }
        $scope.closeModal();
      };
      
      $scope.closeModal = function () {
        $scope.modal.remove();
      };
      $scope.$on('$destroy', function () {
          if ($scope.modal){
              $scope.modal.remove();
          }
      });
    }
  };
}]);

nameApp.controller('ListCtrl', function($scope, $ionicModal, $http, Movies, $state,$ionicSlideBoxDelegate, $ionicSideMenuDelegate, Navigation) {

   $ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });  

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }
  

    $scope.pages = [{"text":"1", "background": "#4a87ee"},
                  {"text":"2", "background": "#43cee6"},
                 
                 ]
  
  $scope.trickOn = true;
  
  
  $scope.slideVisible = function(index){
    if(  index < $ionicSlideBoxDelegate.currentIndex() -1 
       || index > $ionicSlideBoxDelegate.currentIndex() + 1){
      return false;
    }
    
    return true;
  }
  
  $scope.toogleTrick = function(){
    $scope.trickOn = $scope.trickOn;
    
  }
 
  $scope.movie = {
    name: 'Batman'
  }
 
  $scope.obj = {
    prop: "world"
  };
 
 //Tiene q ir al factory esta parte
$scope.subastas=[

   {
  idSubasta:1,
  nombrePonente:"Maria",
  idPonente:1,
  tipo:"Cena",
  tipoSubasta:"subasta",
  valorInicial:30,
  vip:true,
  estado:"estadoActivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"3h 23min",
  image:'img/user1.jpg',
  descripcion:"Cena en restaurante vegetariano/hindu",
  col:'left-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 },

    {
  idSubasta:2,
  nombrePonente:"Pedro J.",
  idPonente:2,
  tipo:"Entretenimiento",
  tipoSubasta:"subasta",
  valorInicial:15,
  vip:false,
    estado:"estadoActivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"5h 10min",
  image:'img/user2.jpg',
  descripcion:"Salida por la tarde al cine",
  col:'right-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 },

     {
  idSubasta:3,
  nombrePonente:"Luis Mora",
  idPonente:3,
  tipo:"Entretenimiento",
  tipoSubasta:"subasta",
  valorInicial:25,
  vip:false,
    estado:"estadoInactivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"10h 47min",
  image:'img/user4.png',
  descripcion:"Acompanante para spa - masaje",
  col:'left-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 },

      {
  idSubasta:4,
  nombrePonente:"Paul G.",
  idPonente:4,
  tipo:"Cena",
  tipoSubasta:"subasta",
  valorInicial:15,
  vip:true,
    estado:"estadoActivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"11h 47min",
  image:'img/user5.jpg',
  descripcion:"Cena norcturna, lugar a escoger",
  col:'right-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 },
   {
  idSubasta:1,
  nombrePonente:"Maria",
  idPonente:1,
  tipo:"Cena",
  tipoSubasta:"subasta",
  valorInicial:30,
  vip:true,
  estado:"estadoActivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"3h 23min",
  image:'img/user1.jpg',
  descripcion:"Cena en restaurante vegetariano/hindu",
  col:'left-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 },

    {
  idSubasta:2,
  nombrePonente:"Pedro J.",
  idPonente:2,
  tipo:"Entretenimiento",
  tipoSubasta:"subasta",
  valorInicial:15,
  vip:false,
    estado:"estadoActivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"5h 10min",
  image:'img/user2.jpg',
  descripcion:"Salida por la tarde al cine",
  col:'right-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 },

     {
  idSubasta:3,
  nombrePonente:"Luis Mora",
  idPonente:3,
  tipo:"Entretenimiento",
  tipoSubasta:"subasta",
  valorInicial:25,
  vip:false,
    estado:"estadoInactivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"10h 47min",
  image:'img/user4.png',
  descripcion:"Acompanante para spa - masaje",
  col:'left-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 },

      {
  idSubasta:4,
  nombrePonente:"Paul G.",
  idPonente:4,
  tipo:"Cena",
  tipoSubasta:"subasta",
  valorInicial:15,
  vip:true,
    estado:"estadoActivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoLimite:"11h 47min",
  image:'img/user5.jpg',
  descripcion:"Cena norcturna, lugar a escoger",
  col:'right-column',
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 }
   ];

 //
  $scope.searchMovieDB = function() {
 
    Movies.list($scope.movie.name, function(movies) {
      $scope.movies = movies;
    });
 
  };
 
  $scope.changePage = function(id) {
    //Navigation.goNative('view', {movieid:id}, 'up');  
  };
 
  $scope.searchMovieDB();
 
});
 
nameApp.controller('ViewCtrl', function($scope, $http, $stateParams, Movies) {
  Movies.find($stateParams.movieid, function(movie) {
    $scope.movie = movie;
  });
});
 
nameApp.directive('goNative', ['$ionicGesture', '$ionicPlatform', function($ionicGesture, $ionicPlatform) {
  return {
    restrict: 'A',
 
    link: function(scope, element, attrs) {
 
      $ionicGesture.on('tap', function(e) {
 
        var direction = attrs.direction;
        var transitiontype = attrs.transitiontype;
 
        $ionicPlatform.ready(function() {
 
          switch (transitiontype) {
            case "slide":
              window.plugins.nativepagetransitions.slide({
                  "direction": direction
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;
            case "flip":
              window.plugins.nativepagetransitions.flip({
                  "direction": direction
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;
               
            case "fade":
              window.plugins.nativepagetransitions.fade({
                   
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;
 
            case "drawer":
              window.plugins.nativepagetransitions.drawer({
                  "origin"         : direction,
                  "action"         : "open"
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;
               
            case "curl":
              window.plugins.nativepagetransitions.curl({
                  "direction": direction
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
              break;              
               
            default:
              window.plugins.nativepagetransitions.slide({
                  "direction": direction
                },
                function(msg) {
                  console.log("success: " + msg)
                },
                function(msg) {
                  alert("error: " + msg)
                }
              );
          }
 
 
        });
      }, element);
    }
  };
}]);


  nameApp.directive('countdown', [
        'Util',
        '$interval',
        function (Util, $interval) {
            return {
                restrict: 'A',
                scope: { date: '@' },
                link: function (scope, element) {
                    var future;
                    future = new Date(scope.date);
                    $interval(function () {
                        var diff;
                        diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                        return element.text(Util.dhms(diff));
                    }, 1000);
                }
            };
        }
    ]);

  nameApp.factory('Util', [function () {
            return {
                dhms: function (t) {
                    var days, hours, minutes, seconds;
                    days = Math.floor(t / 86400);
                    t -= days * 86400;
                    hours = Math.floor(t / 3600) % 24;
                    t -= hours * 3600;
                    minutes = Math.floor(t / 60) % 60;
                    t -= minutes * 60;
                    seconds = t % 60;
                    return [
                        days + 'd',
                        hours + 'h',
                        minutes + 'm',
                        seconds + 's'
                    ].join(' ');
                }
            };
        }]);