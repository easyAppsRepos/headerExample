var map;
var nameApp = angular.module('starter', ['ionic','ngCordova','angularGeoFire','firebase']);
 
nameApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
 


  $ionicConfigProvider.views.transition('none');
 
  $stateProvider
    .state('list', {
      url: '/',
      templateUrl: 'list.html',
      controller: 'dashboardCtrl'
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

            .state('filtrosVIP', {
      url: '/filtrosVIP',
      templateUrl: 'filtrosVIP.html',
      controller: 'ListCtrl'
    })


            .state('configuracion', {
      url: '/configuracion',
      templateUrl: 'configuracion.html',
      controller: 'ListCtrl'
    })


            .state('paypal;', {
      url: '/paypal',
      templateUrl: 'paypal.html',
      controller: 'ListCtrl'
    })

      .state('mapaUsuario;', {
      url: '/mapaUsuario',
      templateUrl: 'mapaUsuario.html',
      controller: 'GeolocationCtrl'
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
      .state('modalNewP', {
      url: '/modalNewP',
      templateUrl: 'modalNewP.html',
      controller: 'crearPropuestaCtrl'
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


//PUSH FUNCIONANDO
/*
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
*/ 

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
      $cordovaStatusbar.overlaysWebView(true);
      $cordovaStatusbar.styleHex('#546f7b');
    }


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
 
 

nameApp.controller('ListCtrl', function($scope, $ionicModal, $http, Movies, $state,$ionicSlideBoxDelegate, $ionicSideMenuDelegate, Navigation) {



$scope.chico = false;
$scope.chica = false;
$scope.subasta = false;
$scope.fijo = false;
$scope.mas = false;
$scope.menos = false;
$scope.selected='';
$scope.selected2='';
$scope.selected3='';
$scope.selected4='';
$scope.selected6='';
$scope.selected5='';

  $scope.activeButton = function(item) {
    if(item=='chico'){$scope.chico = !$scope.chico; if($scope.chico==true){$scope.selected='Select'}else{$scope.selected=''}}
    if(item=='chica'){$scope.chica = !$scope.chica; if($scope.chica==true){$scope.selected2='Select'}else{$scope.selected2=''}}
     if(item=='subasta'){$scope.subasta = !$scope.subasta; if($scope.subasta==true){$scope.selected3='Select'}else{$scope.selected3=''}}
    if(item=='fijo'){$scope.fijo = !$scope.fijo; if($scope.fijo==true){$scope.selected4='Select'}else{$scope.selected4=''}}
      if(item=='mas'){$scope.mas = !$scope.mas; if($scope.mas==true){$scope.selected5='Select'}else{$scope.selected5=''}}
    if(item=='menos'){$scope.menos = !$scope.menos; if($scope.menos==true){$scope.selected6='Select'}else{$scope.selected6=''}}
    }
  



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


  nameApp.controller('MyController', function($scope, $ionicModal) {
  $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];




$scope.categoriaSeleccionada='Seleccionar categoria';

$scope.setCategoria=function(cat){
$scope.categoriaSeleccionada=cat;
   $scope.modal.hide();
     $scope.modal.remove();
}

  $scope.openModal = function(animation, modalHtml) {
    $ionicModal.fromTemplateUrl(modalHtml, {
      scope: $scope,
      animation: animation
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };


  $scope.closeModal = function() {
    $scope.modal.hide();
     $scope.modal.remove();

  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
});

    nameApp.controller('crearPropuestaCtrl', function($scope, $cordovaCamera, $cordovaGeolocation,$firebaseArray, $ionicModal) {
//color #6239AB
$scope.propuesta = {};
$scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];
$scope.categoriaSeleccionada='Seleccionar categoria';
$scope.setCategoria=function(cat){
$scope.categoriaSeleccionada=cat;
$scope.propuesta.categoria=cat;
   $scope.modal.hide();
     $scope.modal.remove();
}

  $scope.openModal = function(animation, modalHtml) {
    $ionicModal.fromTemplateUrl(modalHtml, {
      scope: $scope,
      animation: animation
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };


  $scope.closeModal = function() {
    $scope.modal.hide();
     $scope.modal.remove();

  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


      $scope.agregarPropuesta = function(){

      	//obtener fecha actual



        console.log($scope.propuesta);

        var ref = new Firebase('https://golddate.firebaseio.com/app');
 var lat;
 var long;
    var propuestaRef = ref.child('propuestas');
        var geoRef = ref.child('geo');
        var geoFire = new GeoFire(geoRef);
        var geoQuery;


        var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
           lat  = position.coords.latitude
           long = position.coords.longitude


        var pKey=propuestaRef.push({
        categoria: $scope.propuesta.categoria,
        chica: $scope.propuesta.chico == undefined ? null :$scope.propuesta.chico,
        chica: $scope.propuesta.chica == undefined ? null :$scope.propuesta.chica,
        fechaCreacion: Date.now(),
        diasEnSubasta:$scope.propuesta.diasEnSubasta,
        descripcion: $scope.propuesta.descripcion,
        tipo: $scope.propuesta.tipo,
        estado: true,
        pujaActual:$scope.propuesta.precio,
        idPropone: 'pedro@pedro.com',
        nickPropone:'Pedro',
        vip:true,
        imgPropuesta:$scope.imgURI
        },function(){


            geoFire.set(pKey.key(), [lat, long]).then(function() {
            console.log("ID:"+ pKey.key() + ": setiado en pos: [" + lat + "," + long + "]");
              alert("agregado");
            });

        

        });
        // la key de la propuesta creada es : pKey.key() 

        },function(err){
        			console.log("err4r44");
        			console.log(err);

    				} 
    				);
      }

        $scope.selectPicture = function() { 
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY
		};

	  $cordovaCamera.getPicture(options).then(
		function(imageURI) {
			$scope.imgURI = "data:image/jpeg;base64," + imageURI;
					},
		function(err){
			console.log("error cargando la imagen");
		})
	};



    });

    nameApp.controller('dashboardCtrl', function($scope,$cordovaGeolocation,$firebaseArray){

var lat;
$scope.subastas=[];

  var ref = new Firebase('https://golddate.firebaseio.com/app');
        var geoRef = ref.child('geo');
        var geoFire = new GeoFire(geoRef);
        var geoQuery;
console.log("afuera");
console.log(lat);
       var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
          var lat  = position.coords.latitude
          var long = position.coords.longitude


console.log("marcandoCentro");
    var geoQuery = geoFire.query({
      center: [lat,long],
      radius: 3000
    });


    var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location) {
console.log("enKeyEntered");
      console.log(key + " entered the query. Hi " + key + "!");
        ref.child('propuestas/'+key).once("value", function(data) {
           var subasta=  data.val();
           subasta.descripcionCorta=data.val().descripcion.substring(0,37)+'...';
           subasta.tiempoRestante='Finaliza en: '+Math.round(((parseInt(data.val().fechaCreacion)+parseInt(data.val().diasEnSubasta))-Date.now())/3600000)+'h';
           // subasta.imgPropuesta="data:image/jpeg;base64,"+ data.val().imgPropuesta;
            //$scope.imgURI = "data:image/jpeg;base64," + imageURI;
           console.log(subasta);
          $scope.subastas.push(subasta);
        });

    });

    var onReadyRegistration = geoQuery.on("ready", function() {
      console.log("*** 'ready' event fired - cancelling query ***");
      geoQuery.cancel();
    });

  }, function(err) {
      console.log("err22");
        console.log(err); 
    });

   	

/*
       //Tiene q ir al factory esta parte
$scope.subastas=[


     {
  idSubasta:3,
  nickPropone:"Luis Mora",
  idPonente:3,
  tipo:"Entretenimiento",
  tipoSubasta:"subasta",
  pujaActual:25,
  vip:true,
    estado:"estadoInactivo",
  fechaPublicacion:"25/03/2015 02:02",
  tiempoEnSubasta:"10h 47min",
  image:'img/user4.png',
  descripcion:"Acompanante para spa - masaje",
  pujas: [{idPujante:2,valorPuja:30},{idPujante:2,valorPuja:50}]

 }];
*/
});
    nameApp.controller('GeolocationCtrl', function($scope, $cordovaGeolocation) {


    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
          var lat  = position.coords.latitude
          var long = position.coords.longitude
          alert(lat + " --- " + long);
                map = new GMaps({
        div: '#map',
        lat: lat, 
        lng: long,
        zoom: 10,
        zoomControl : true,
        zoomControlOpt: {
            style : 'SMALL',
            position: 'TOP_RIGHT'
        },
        panControl : true,
        streetViewControl : true,
        mapTypeControl : false
      });

      }, function(err) {
        // error
        console.log("23rerrr");
        console.log(err);
    });
    
   
/*
   var options = {timeout: 10000, enableHighAccuracy: false};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 console.log("position is: Latitud: "+position.coords.latitude+" Longitud: "+ position.coords.longitude);
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
  }, function(error){
    console.log("Could not get location"+error);
  });
  */


}) 