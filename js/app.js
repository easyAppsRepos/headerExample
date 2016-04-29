var map;
var nameApp = angular.module('starter', ['ionic','ngCordova','ngStorage','angularGeoFire','firebase','ngMessages','ion-gallery']);
 
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
      url: '/detail/:idPropuesta/:nickPropone/:pujaActual/:tiempoRestante/:descripcion',
      templateUrl: 'detail.html',
      controller: 'detailCtrl'
    })

     .state('pujas', {
      cache:false,
      url: '/pujas/:idPropuesta/:tiempoRestante/:pujaAlta',
      templateUrl: 'pujas.html',
      controller: 'pujasCtrl'
    })
          .state('filtros', {
      url: '/filtros',
      templateUrl: 'filtros.html',
      controller: 'ListCtrl'
    })

      .state('register', {
      url: '/register',
      templateUrl: 'register.html',
      controller:'registerController'
    })


                    .state('login', {
      url: '/login',
      templateUrl: 'login.html',
      controller: 'loginCtrl'
    })

      .state('miPerfil', {
        cache:false,
      url: '/miPerfil',
      templateUrl: 'miPerfil.html',
      controller: 'miPerfilCtrl'
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


 .state('fotosUsuario;', {
      url: '/fotosUsuario',
      templateUrl: 'fotosUsuario.html',
      controller: 'fotosUsuarioCtrl'
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
cache:false,
      url: '/misAlertas',
      templateUrl: 'misAlertas.html',
      controller: 'misAlertasCtrl'
    })   
      ;


if(localStorage.getItem('ngStorage-user') !== null && localStorage.getItem('ngStorage-user').length>5){

    $urlRouterProvider.otherwise("/");
}
else{
  // $urlRouterProvider.otherwise("/login");
    $urlRouterProvider.otherwise("/login");
}
});
 nameApp.constant('FURL', 'https://golddate.firebaseio.com/');
nameApp.run(function($ionicPlatform,$rootScope) {
  
  $ionicPlatform.ready(function() {


//PUSH FUNCIONANDO

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
   //alert(data.registrationId);
   console.log('regsustr');
      localStorage.setItem('pushKeyGD', data.registrationId);
   //localStorage.setItem('pushKeyGD', data.registrationId);



});

push.on('notification', function(data) {

  //alert('Tienes una notificacion: '+data.title);
    $rootScope.$broadcast('pushNuevo');
console.log(data);
});

push.on('error', function(e) {
    console.log(e.message);

});
//push final 

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


nameApp.controller('registerController', function ($scope, $state, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
console.log("asdad22");
  $scope.register = function(user) {
    if(angular.isDefined(user)){
    Utils.show();
    Auth.register(user)
      .then(function() {
         Utils.hide();
         console.log("Antes de loguear:" + JSON.stringify(user));

         Utils.alertshow("Registro Exitoso","Usuario creado correctamente");

         $location.path('/');

      }, function(err) {
         Utils.hide();
         Utils.errMessage(err);
      });
    }
  };

}
);





 nameApp.controller('userInfoCtrl', function ($scope,$ionicSideMenuDelegate, $state, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
    $scope.userInfo={};

    $scope.$on('userInfoBroad', function(event, args) {

     $scope.userInfo.nombreUser  = args.userName;
     $scope.userInfo.userPic  = args.userPic;
    // do what you want to do
});



/*miPerfilCtrl
 if($localStorage.user[0]==undefined){
 console.log("Cargando la puta info del user");
 $scope.userInfo.userPic='img/user2.jpg'
}else{console.log("CASI TE TENGO");}

 });
*/
});

 nameApp.controller('miPerfilCtrl', function ($scope,$ionicSideMenuDelegate, $state, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
 

     $scope.nombreUsuario=$localStorage.user[0].name;
    $scope.fotoUsuario=$localStorage.user[0].photo;

});



 nameApp.controller('misAlertasCtrl', function ($scope, $ionicModal, $ionicSideMenuDelegate, $state, PushNoti,$localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
 //$scope.notificaciones={};



 $scope.escogerGanador = function(){
console.log('escoer ganarod');

 }


$scope.$on('pushNuevo', function(event, args) {
$scope.getNotificaciones();
    // do what you want to do
});


 $scope.iconNoti=0;
 $scope.noAlertas=false;
$scope.getNotificaciones = function(){

   PushNoti.getNotificaciones($localStorage.user[0].uid).then(function(data){
      console.log(data);
      

      if(data!==null && typeof data !== 'undefined'){
        $scope.noAlertas=false;
        $scope.notificaciones=data;
        console.log('asda');

            $scope.iconNoti=Object.keys(data).length;
      }
      else{

        $scope.iconNoti=0;
        $scope.noAlertas=true;
      }
   });
 }
if($localStorage.user.length>0){
$scope.getNotificaciones();}
console.log("En mis Alergas");


//modal




  $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];

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
 console.log("destruyendo modal");
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
//endModal

});







nameApp.controller('loginCtrl', function ($scope,$rootScope, $ionicSideMenuDelegate, $state, $localStorage, $location,$http,$ionicPopup, $firebaseObject,PushNoti, Auth, FURL, Utils) {
     
 $scope.loginFace = function(){

     var ref = new Firebase("https://golddate.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        alert("Ups, ha ocurrido un error inesperado :c");
      } else {
        console.log("Authenticated successfully with payload:", authData);
                   $localStorage.user.push({email:authData.facebook.email,
                                     name:authData.facebook.displayName,
                                      photo:authData.facebook.profileImageURL,
                                      vip:false}); 


$rootScope.$broadcast('userInfoBroad', {userName:authData.facebook.displayName,
                                        userPic:authData.facebook.profileImageURL});

                  $location.path('/');
                  $state.go('list');


      }
    },{scope:"email"});

 }


     $ionicSideMenuDelegate.canDragContent(false);//no side menu
$scope.forgot=function(){console.log($localStorage);}
$localStorage = $localStorage.$default({
  user: [],pruebaStorage: []
});
                 

  var ref = new Firebase(FURL);



  $scope.logout = function () {

       if(localStorage.getItem('pushKeyGD')){
    var hopperRef= ref.child("app/push/"+$localStorage.user[0].uid+'/'+$localStorage.user[0].sessionPID);
    hopperRef.update({
      'logout': Date.now()
    });
}
      Auth.logout();
      //$localStorage.$reset();
$localStorage.user=[];
$localStorage.pruebaStorage=[];


  }



  var ref = new Firebase(FURL);
  var userkey = "";
  $scope.signIn = function (user) {
    console.log("Enviado");
    if(angular.isDefined(user)){
    Utils.show();
    Auth.login(user)
      .then(function(authData) {
      //console.log("id del usuario:" + JSON.stringify(authData));

      ref.child('profile').orderByChild("id").equalTo(authData.uid).on("child_added", function(snapshot) {
        console.log(snapshot.key());
        userkey = snapshot.key();
        var obj = $firebaseObject(ref.child('profile').child(userkey));

 





        obj.$loaded()
          .then(function(data) {

console.log("enpat");

          //    $localStorage.pruebaStorage.push({idPropuesta:subasta.propuestaKey,
        //      img:subasta.imgPropuesta});
      //         console.log( $localStorage.pruebaStorage);
              Utils.hide();

//pusjj
        if(localStorage.getItem('pushKeyGD')){
        var pushKeyGD=  localStorage.getItem('pushKeyGD');
        var device= ionic.Platform.platform();
        var uuid=ionic.Platform.device().uuid;
  


        var pushState = { 
        pushK:pushKeyGD, 
        device:device,
        deviceId:uuid,
        login:Date.now()
        }

        console.log(pushState);
     var sessionPID= PushNoti.addPush(userkey,pushState);
  

        }else{console.log("nopushK");}
//endPush
                  ref.child('app/userInfo/'+userkey).once("value", function(snap) {
              console.log("userinfo");
              console.log(snap.val());
              $localStorage = $localStorage.$default({
  user: [],pruebaStorage: []
});
            $localStorage.user.push({ uid:userkey,
                                      sessionPID:sessionPID,
                                      email:snap.val().email,
                                     name:snap.val().nombre,
                                      photo:snap.val().userPic,
                                      vip:snap.val().vip}); 

$rootScope.$broadcast('userInfoBroad', {userName:snap.val().nombre,
                                        userPic:snap.val().userPic});
    $rootScope.$broadcast('pushNuevo');

                  $location.path('/');
                  $state.go('list',{reload:true});
            });

          //    $state.go('list');
       // $state.go('list', {}, { reload: true });

       
          })
          .catch(function(error) {
            console.error("Error:", error);
          });
      });


      }, function(err) {
        Utils.hide();
        alert(err);
         Utils.errMessage(err);
      });
    }
  };

});

nameApp.controller('pujasCtrl',function($scope,$rootScope,$ionicHistory,$location, $state,$stateParams,$localStorage,$ionicModal,$ionicSlideBoxDelegate,$ionicSideMenuDelegate, Navigation)
{

var pujaKey=$stateParams.idPropuesta;
$scope.tiempoR=$stateParams.tiempoRestante;
$scope.pujaAlta=$stateParams.pujaAlta;
console.log(pujaKey);
$scope.pujas=[];
  //$scope.pujas.push({nombreP:"sadasdasd3333",valorPuja:"as"});


var refPujas = new Firebase("https://golddate.firebaseio.com/app/pujas/"+pujaKey);
/*
refPujas.orderByChild("valorPuja").on("child_added", function(snapshot) {

 $scope.pujas.push({nombreP:snapshot.val().pujante,valorPuja:snapshot.val().valorPuja}); 
 console.log($scope.pujas);
 console.log(snapshot.val().pujante + " : " + snapshot.val().valorPuja);
 //$scope.$apply();
});
*/
var ij=0;
refPujas.once("value", function(snap) {

  console.log("terminadk");
  var tamanoArrego=Object.keys(snap.val()).length;

snap.forEach(function(item,index){


   $scope.pujas.splice((tamanoArrego-index),0,{nombreP:item.val().pujante,
                                               valorPuja:item.val().valorPuja,
                                                posicion:tamanoArrego-ij});
   ij++;
$scope.$applyAsync();
  console.log(item.val());

});

});

console.log("trayendo historial");



});
nameApp.controller('detailCtrl',function($scope,$rootScope,$location, $state,$stateParams,$localStorage,$ionicModal,$ionicSlideBoxDelegate,$ionicSideMenuDelegate, Navigation){


//des

    $scope.agregarPuja=function(we){

//if($scope.pujaActual==undefined){console.log("aqui estoy 33")}
 if(($scope.inputSubasta)<=parseInt($scope.pujaActual) || $scope.inputSubasta == undefined){alert("Tu puja debe ser mayor")}
  else{
         $ionicLoading.show({
        template: 'Cargando...'
      });
  
        console.log($scope.propuestaKey)
        var refPuja=new Firebase('https://golddate.firebaseio.com/app');
        var UpdatePuja = new Firebase('https://golddate.firebaseio.com/app/propuestas/'+$scope.propuestaKey+'/pujaActual');
      UpdatePuja.transaction(function(currentData) {
        return $scope.inputSubasta;
      }, function(error, committed, snapshot) {
      if (error) {
      console.log('Transaction failed abnormally!', error);
       $ionicLoading.hide();
      } else if (!committed) {
      console.log('We aborted the transaction (because nothing).');
       $ionicLoading.hide();
      } else {
                   refPuja.child('pujas/'+$scope.propuestaKey).push({valorPuja:$scope.inputSubasta,
                                            pujante:$localStorage.user[0].email,
                                            fechaPuja:Date.now()});
                   $rootScope.$broadcast('actualizarPuja', {puja:$scope.inputSubasta});
                   $scope.pujaActual=$scope.inputSubasta;

  
  
      console.log('puja actuzlizada');
  
  
       $ionicLoading.hide();
      }
      console.log("puja", snapshot.val());
      });
  
  
      }}





  $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];

$scope.inputSubasta= parseInt($scope.pujaActual);
$scope.subirPuja=function(){$scope.inputSubasta=$scope.inputSubasta+1};
$scope.bajarPuja=function(){
  if(($scope.inputSubasta-1)<parseInt($scope.pujaActual)){$scope.inputSubasta=parseInt($scope.pujaActual)}
   else{ 
     $scope.inputSubasta=$scope.inputSubasta-1;}
  //$scope.pujaActual=200;
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
 console.log("destruyendo modal");
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
  

//des

    $scope.$on('actualizarPuja', function(event, args) {

     $scope.pujaActual  = args.puja;

      console.log(args.puja);
});



var fotoIndex;
fotoIndex=$localStorage.pruebaStorage.findIndex(function traerFoto(lStorace) {
    
            return lStorace.idPropuesta == $stateParams.idPropuesta;
        });
if(fotoIndex>0){

$scope.imgPropuesta=$localStorage.pruebaStorage[fotoIndex].img;
}

//console.log($stateParams.idPropuesta);
//console.log($stateParams.nickPropone);
//console.log($stateParams.pujaActual);

$scope.propuestaKey=$stateParams.idPropuesta;
$scope.nickPropone=$stateParams.nickPropone;
$scope.pujaActual=$stateParams.pujaActual;
$scope.tiempoRestante=$stateParams.tiempoRestante;
$scope.descripcion=$stateParams.descripcion;

//
/*
$localStorage = $localStorage.$default({
  pruebaStorage: [0]
});

  $localStorage.pruebaStorage.push($localStorage.pruebaStorage+1);
  console.log( $localStorage.pruebaStorage);
*/



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


});
 

nameApp.controller('ListCtrl', function($scope, $localStorage, $ionicModal, $http, Movies, $state,$ionicSlideBoxDelegate, $ionicSideMenuDelegate, Navigation) {
console.log("adasdas en MENU SIDE");



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


  nameApp.controller('MyController', function($scope,$rootScope,$ionicLoading, $localStorage,$ionicModal,$controller) {

  	angular.extend(this, $controller('detailCtrl', {$scope: $scope}));



  	$scope.agregarPuja=function(we){

//if($scope.pujaActual==undefined){console.log("aqui estoy 33")}
 if(($scope.inputSubasta)<=parseInt($scope.pujaActual) || $scope.inputSubasta == undefined){alert("Tu puja debe ser mayor")}
  else{
         $ionicLoading.show({
        template: 'Cargando...'
      });
  
        console.log($scope.propuestaKey)
        var refPuja=new Firebase('https://golddate.firebaseio.com/app');
        var UpdatePuja = new Firebase('https://golddate.firebaseio.com/app/propuestas/'+$scope.propuestaKey+'/pujaActual');
      UpdatePuja.transaction(function(currentData) {
        return $scope.inputSubasta;
      }, function(error, committed, snapshot) {
      if (error) {
      console.log('Transaction failed abnormally!', error);
       $ionicLoading.hide();
      } else if (!committed) {
      console.log('We aborted the transaction (because nothing).');
       $ionicLoading.hide();
      } else {
                   refPuja.child('pujas/'+$scope.propuestaKey).push({valorPuja:$scope.inputSubasta,
                                            pujante:$localStorage.user[0].email,
                                            fechaPuja:Date.now()});
                   $rootScope.$broadcast('actualizarPuja', {puja:$scope.inputSubasta});
                   $scope.pujaActual=$scope.inputSubasta;

  
  
      console.log('puja actuzlizada');
  
  
       $ionicLoading.hide();
      }
      console.log("puja", snapshot.val());
      });
  
  
      }}


  $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];

$scope.inputSubasta= parseInt($scope.pujaActual);
$scope.subirPuja=function(){$scope.inputSubasta=$scope.inputSubasta+1};
$scope.bajarPuja=function(){
  if(($scope.inputSubasta-1)<parseInt($scope.pujaActual)){$scope.inputSubasta=parseInt($scope.pujaActual)}
   else{ 
     $scope.inputSubasta=$scope.inputSubasta-1;}
  //$scope.pujaActual=200;
}

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
 console.log("destruyendo modal");
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

    nameApp.controller('crearPropuestaCtrl', function($scope, $localStorage, $timeout, $ionicPopup, $ionicLoading, $cordovaCamera, $cordovaGeolocation,$firebaseArray, $ionicModal) {
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

if($scope.propuesta.categoria == undefined || $scope.propuesta.diasEnSubasta == undefined 
   || $scope.propuesta.descripcion == undefined  || $scope.propuesta.tipo == undefined
   || $scope.propuesta.precio == undefined ){
	

   var alertPopup = $ionicPopup.alert({
     title: 'Espacios sin rellenar',
     template: 'Todos los espacios deben ser rellenados'
   });

   alertPopup.then(function(res) {
     return true;
   });

return true;

	
}

if($scope.imgURI == undefined){
       $scope.imgURI='';
}
      	//obtener fecha actual
      	          $ionicLoading.show({
      template: 'Cargando...'
    });



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
        idPropone: $localStorage.user[0].email,
        kPropone:$localStorage.user[0].uid,
        nickPropone:$localStorage.user[0].name,
        vip:true,
        imgPropuesta:$scope.imgURI
        },function(){

           ref.child('pujas/'+pKey.key()).push({valorPuja:$scope.propuesta.precio,
                                          pujante:'Valor inicial',
                                          fechaPuja:Date.now()});

            geoFire.set(pKey.key(), [lat, long]).then(function() {
            console.log("ID:"+ pKey.key() + ": setiado en pos: [" + lat + "," + long + "]");
              alert("agregado");
            });

			          $ionicLoading.hide();
        

        });
        // la key de la propuesta creada es : pKey.key() 

        },function(err){
        			console.log("err4r44");
        			console.log(err);
        				        $ionicLoading.hide();
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

    nameApp.controller('dashboardCtrl', function($scope, $rootScope,$location,$ionicSideMenuDelegate, $cordovaGeolocation,$firebaseArray, $timeout, $localStorage, $state,$ionicPopup, $firebaseObject, Auth, FURL, Utils){
console.log("en dash");



$rootScope.$broadcast('userInfoBroad', {userName:$localStorage.user[0].name,
                                        userPic:$localStorage.user[0].photo});




console.log($localStorage);
  var ref = new Firebase(FURL);







  var lat;
  var ref = new Firebase('https://golddate.firebaseio.com/app');
        var geoRef = ref.child('geo');
        var geoFire = new GeoFire(geoRef);
        var geoQuery;
console.log("afuera");
console.log(lat);
$scope.cargarDatos = function(){
	if($scope.cargandoPropuestas){console.log("pull en carga");return true;}
	$scope.subastas=[];
	$scope.cargandoPropuestas = true;
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

var actualizacion;
var storageFoto;
    var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location) {	
console.log("enKeyEntered");
      console.log(key + " entered the query. Hi " + key + "!");
        ref.child('propuestas/'+key).on("value", function(data) {
console.log(data.val());
           var subasta=  data.val();
           subasta.descripcionCorta=data.val().descripcion.substring(0,37)+'...';
           subasta.tiempoRestante='Finaliza en: '+Math.round(((parseInt(data.val().fechaCreacion)+parseInt(data.val().diasEnSubasta))-Date.now())/3600000)+'h';
           subasta.propuestaKey=data.key();
           // subasta.imgPropuesta="data:image/jpeg;base64,"+ data.val().imgPropuesta;
            //$scope.imgURI = "data:image/jpeg;base64," + imageURI;
         //  console.log(subasta);

//guarar imagen


//
        //  $scope.subastas.push({key:data.key(), subasta:subasta});
       // console.log(subasta);

          actualizacion=$scope.subastas.findIndex(function checkAdult(propuesta) {
     									
													    return propuesta.propuestaKey == data.key();
													});
          if(actualizacion<0){



                 storageFoto=$localStorage.pruebaStorage.findIndex(function checkFoto(storage) {
                      
                              return storage.idPropuesta == data.key();
                          });


                  if(storageFoto<0){

                    $localStorage.pruebaStorage.push({idPropuesta:subasta.propuestaKey,img:subasta.imgPropuesta});
                  }
               else{ console.log(storageFoto);console.log($localStorage)}

          //    $localStorage.pruebaStorage.push({idPropuesta:subasta.propuestaKey,
        //      img:subasta.imgPropuesta});
      //         console.log( $localStorage.pruebaStorage);

          	$scope.subastas.push(subasta);
 			$scope.$applyAsync(); //poner un timeout here

     
          }
          else{
          	console.log(actualizacion);
          	$scope.subastas[actualizacion].pujaActual = data.val().pujaActual;
              $scope.$applyAsync();
          	//$scope.$apply();
          }
        });


    });


    var onReadyRegistration = geoQuery.on("ready", function() {
      console.log("*** 'ready' event fired - cancelling query ***");
    //  geoQuery.cancel();
  
     $scope.cargandoPropuestas = false;
      $scope.$broadcast('scroll.refreshComplete');

    });

  }, function(err) {
      console.log("err22");
        console.log(err); 
    });
}
 $scope.cargarDatos();  	

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

 nameApp.controller('fotosUsuarioCtrl', function($scope, $cordovaCamera, $ionicPopup, $ionicLoading,$localStorage, FotosUsuario) {
$scope.items = [];


    $scope.takePhoto = function () {
   var isOnline = true;
   if(isOnline){

    var options = {
      quality: 100,
      //destinationType: Camera.DestinationType.DATA_URL,
      destinationType: Camera.DestinationType.DATA_URL,
      correctOrientation: true,
 sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth:  500,
      targetHeight: 500,
      popoverOptions: CameraPopoverOptions
  };

      $cordovaCamera.getPicture(options).then(function (imageData) {
      //    $scope.imgURI = "data:image/jpeg;base64," + imageData;
     // $scope.imgURI=imageData;
      var idUser = $localStorage.user[0].uid;

      FotosUsuario.addFoto(idUser,imageData).then(function(data){
    console.log(data);
    alert('listo');
      });

      console.log("idasidasdo");

      }, function (err) {
              console.log("En error");
                console.log(err);
       });
      } else{
                    $ionicPopup.alert({
              title: 'Error',
              content: 'Es necesaria conexión a internet'
            }).then(function(res) {
              console.log('necesaria conexion ainternet');
            });
      }

    
  }

console.log($localStorage);


var idUser = $localStorage.user[0].uid;
  FotosUsuario.getFotos(idUser).then(function(data){
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            // console.log(key + " -> " + data[key].src);
            $scope.items.push({src:"https://s3.eu-central-1.amazonaws.com/goldate/"+data[key].src+'.jpeg', 
                               sub:'sub',
                               key: key});
        }
      }
  console.log(data);
});

  $scope.addPhoto = function(){

      FotosUsuario.addFoto(idUser,imagen).then(function(data){
    console.log(data);
      });
  }

/*
$scope.items = [
  {
    src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
    sub: 'This is a <b>subtitle</b>'
  },
  {
    src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
    sub: '' 
  },
  {
    src:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
    thumb:'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
  }
]

/* Not showed */

 });

    nameApp.controller('GeolocationCtrl', function($scope, $ionicLoading, $cordovaGeolocation) {
    	

        $ionicLoading.show({
      template: 'Cargando...'
    });

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
          var lat  = position.coords.latitude
          var long = position.coords.longitude
      
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
          $ionicLoading.hide();      

      }, function(err) {
        // error
        $ionicLoading.hide();      
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


}) ;

    nameApp.factory('Auth', function(FURL, $firebaseAuth, $firebaseArray, $firebaseObject, Utils) {

  var ref = new Firebase(FURL);
  var auth = $firebaseAuth(ref);

  var Auth = {
    user: {},

    createProfile: function(uid, user) {
      var profile = {
        id: uid,
        email: user.email,
        registered_in: Date()
      };

      var profileRef = $firebaseArray(ref.child('profile'));
      return profileRef.$add(profile).then(function(ref) {
        var id = ref.key();
 
        console.log(id);
        //console.log("added record with id " + id);
        var name = profile.email.match(/^([^@]*)@/)[1];
        var refUserNew = new Firebase('https://golddate.firebaseio.com/app/userInfo/'+id);
        refUserNew.set({email:profile.email, 
                        nombre:name, 
                        userPic:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADaElEQVRoge2Wy2sTURSHbyOC3bhTqGhaWo0iFHci1cTMuWma2NxYaqKCgqLoP6BiQcUB0YhtKYhoNiIFcTRatZuZ7txIFyLuxNfCByq1vhDxUZvk58JGk5CmSebOjIsc+EE2597vmzk3dxirV73+jwoGg4uJaDfnfJiI7hPReyL6RUQoDuc85jTv3yKitUQ0MhvsLHkXDAYXOwre2dm5hIhSVUAX57pj8JzzEBF9MAGfy1NFUQb9fv86O+H3ElFaAnxBFEUxAoFAu9XwO4goKxs+Lz+IKG4JPBF1ENGUhfC5ZDnnu6TCh8PhhUT03Ab4XL4pirJGmgARDdgIn8u4FHiv19tk0+iUSti0ABGddggeRHTLFLyqqi4ieuOgwM9wOLzQzNP3yYbaszWA4WMhvLjcjVsnQwhwC8eIiI7KhoYhCjJ+bhO6Q7xc//GaBTjnt62ALs6z4W5s2zyrRO3fTET00Cro4kymIti/PVBq3XtmBD5bCV2c76MRHNnXWbA+5/ytGYGS3/gyoYuT0QXOHuzK3++HGQFboEslf28pAnZA1wXyC1rbsh09G9NOC+zs8WVwefnS6gWurrzxOrkaIuR3TECE/HidXA1oK6q/C6B5vkLz4MFgOwK8tMCj816c6nXjVK8bjy/4KoarpC/ACQ8G2wHNA2ieLzULQPNgNBEquUliixt9XU3o62pCItZcsUAlfaOJUA6+ZoGbfxcwAWKq75/AteoFrnhWQfN8Kifw+IIPiS1uJGLNeJLcWLFAxX1/4D/WdIj/vIW2ZdBWXIcRsf0QQ48AmidVM3yBiCEmbRcwxDvT4HkC4w4I3JUnoIsBBwT65QmMdXvtPwPR9fIEUvF50MWEffBiAqrqkibAGGPQxWEbBQ5KhWeMMaTijTDEq3IbZy62YHqAlU3mYstcAi9wx79AugBjjEGPxGCIbFmJS62YHmgoAd+AzKXWueCzMKK9lsD/kxAn5xqB7EgH0slFmB6aj+mh+UgnFyE70lHB+ERPWArPGGMAa4AhUtLnfkxcBViD5QKMMQZVdc28ibLjVGGyMKInbIMvENEjMejipYl/m5fQRY/t4AUSqXgjjMihqu4JXUxgLHoAqXijo/D5BVV1wRAbYIh+GGJ8RmgKhpia+X0XRvQM9Oh66ZdUvepVe/0G8Z+FcEFDCTMAAAAASUVORK5CYII=',
                        vip:false});
    
        //
        profileRef.$indexFor(id); // returns location in the array
      });
    },

    login: function(user) {
      return auth.$authWithPassword(
        {email: user.email, password: user.password}
      );
    },

    register: function(user) {
      return auth.$createUser({email: user.email, password: user.password})
        .then(function() {
          // authenticate so we have permission to write to Firebase
          return Auth.login(user);
        })
        .then(function(data) {
          // store user data in Firebase after creating account
          //console.log("datos del usuario:" + JSON.stringify(data));
          console.log('3333333333   +'+data);
              console.log(data);
          return Auth.createProfile(data.uid, user);
        });
    },

    logout: function() {
      auth.$unauth();
      console.log("Usuario Sale.");
    },

    resetpassword: function(user) {
      return auth.$resetPassword({
          email: user.email
        }).then(function() {
          Utils.alertshow("Exito.","La clave fue enviada a su correo.");
          //console.log("Password reset email sent successfully!");
        }).catch(function(error) {
          Utils.errMessage(error);
          //console.error("Error: ", error.message);
        });
    },

    changePassword: function(user) {
      return auth.$changePassword({email: user.email, oldPassword: user.oldPass, newPassword: user.newPass});
    },

    signedIn: function() {
      return !!Auth.user.provider; //using !! means (0, undefined, null, etc) = false | otherwise = true
    }
  };

  auth.$onAuth(function(authData) {
    if(authData) {
      angular.copy(authData, Auth.user);
      Auth.user.profile = $firebaseObject(ref.child('profile').child(authData.uid));

    } else {
      if(Auth.user && Auth.user.profile) {
        Auth.user.profile.$destroy();

      }

      angular.copy({}, Auth.user);
    }
  });

  

  return Auth;

});


nameApp.factory('Utils', function($ionicLoading,$ionicPopup) {

  var Utils = {

    show: function() {
      $ionicLoading.show({
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200,
        showDelay: 500,
        template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
      });
    },

    hide: function(){
      $ionicLoading.hide();
    },

    alertshow: function(tit,msg){
      var alertPopup = $ionicPopup.alert({
        title: tit,
        template: msg
      });
      alertPopup.then(function(res) {
        //console.log('Registrado correctamente.');
      });
    },

    errMessage: function(err) {

      var msg = "Unknown Error...";

      if(err && err.code) {
        switch (err.code) {
          case "EMAIL_TAKEN":
            msg = "This Email has been taken."; break;
          case "INVALID_EMAIL":
            msg = "Invalid Email."; break;
          case "NETWORK_ERROR":
            msg = "Network Error."; break;
          case "INVALID_PASSWORD":
            msg = "Invalid Password."; break;
          case "INVALID_USER":
            msg = "Invalid User."; break;
        }
      }
      Utils.alertshow("Error",msg);
  },


  };

  return Utils;

});

nameApp.factory('PushNoti', function($http, $q) {




return{

        addPush:function(idUser,pushArray){  

    /*        var onComplete = function(error) {
  if (error) {
    console.log('Synchronization failed');
    return -1;
  } else {
    console.log('Synchronization succeeded');
    return 1;
  }
};
*/
var pushRef = new Firebase('https://golddate.firebaseio.com/app/push/'+idUser);
var newpushRef = pushRef.push();
    newpushRef.set(pushArray);
    return newpushRef.key();

//return  itemsRef.push(pushArray);

  
  },

  getNotificaciones:function(idUser){

    var itemsRef = new Firebase('https://golddate.firebaseio.com/app/notificaciones/'+idUser);
     var defer = $q.defer();
     itemsRef.once("value", function(snapshot) {
      //var nameSnapshot = snapshot.child("companyName");
      //var name = nameSnapshot.val();
      console.log(snapshot.val());
      defer.resolve(snapshot.val()); //this does not return the data
    });
    return defer.promise;

  }


}
});

nameApp.factory('FotosUsuario', function($http, $q) {
return {

  getFotos:function(idUser){

var itemsRef = new Firebase('https://golddate.firebaseio.com/app/images/'+idUser);
     var defer = $q.defer();
     itemsRef.once("value", function(snapshot) {
      //var nameSnapshot = snapshot.child("companyName");
      //var name = nameSnapshot.val();
      console.log(snapshot.val());
      defer.resolve(snapshot.val()); //this does not return the data
    });
    return defer.promise;
  

  
  },


  addFoto:function(idUser,imagen){

var itemsRef = new Firebase('https://golddate.firebaseio.com/app/images/'+idUser);

 AWS.config.update({
    accessKeyId: "AKIAIKCUQ3YRYPUQ7FWQ",
    secretAccessKey: "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",
    "region": "eu-central-1"   
});

 
     var defer = $q.defer();

var name=idUser.toString()+Date.now().toString()+'.jpg';
var image=imagen;
console.log(imagen);
  var bucket = new AWS.S3({params: {Bucket: 'goldate'}});
  var params = {Key: name, ContentType: 'image/jpeg', Body: image,   ContentEncoding: 'base64', ACL: 'public-read'};
  bucket.upload(params, function(err, data){
    if(err){ alert(err); return 'error' }
    console.log('asd subida');
      console.log(data);

     
    defer.resolve(itemsRef.push({src: name,state: 1 }));

  });


return defer.promise;

  
  }
}
});
