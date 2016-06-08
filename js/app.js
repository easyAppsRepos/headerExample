var map;
var nameApp = angular.module('starter', ['ionic','ngCordova','ngStorage','angularGeoFire','firebase','ngMessages','ion-gallery', 'braintree-angular']);
 

 nameApp.constant('clientTokenPath', 'http://54.187.131.158:3000/client_token');
nameApp.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
 
$ionicConfigProvider.navBar.alignTitle('center');

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
      url: '/detail/:idPropuesta/:nickPropone/:pujaActual/:tiempoRestante/:descripcion/:idPropone/:fotoPropuesta/:categoriaN/:vip',
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
        cache:false,
      url: '/register',
      templateUrl: 'register.html',
      controller:'registerController'
    })


                    .state('login', {
                      cache:false,
      url: '/login',
      templateUrl: 'login.html',
      controller: 'loginCtrl'
    })

      .state('miPerfil', {
     cache: false,
      url: '/miPerfil',
      templateUrl: 'miPerfil.html',
      controller: 'miPerfilCtrl'
    })

            .state('filtrosVIP', {
              cache: false,
      url: '/filtrosVIP',
      templateUrl: 'filtrosVIP.html',
      controller: 'filtrosVIPCtrl'
    })

            .state('compartir', {
      url: '/compartir',
      templateUrl: 'compartir.html',
      controller: 'compartirCtrl'
    })



            .state('configuracion', {
      url: '/configuracion',
      templateUrl: 'configuracion.html',
      controller: 'ListCtrl'
    })

                        .state('administrador', {
              cache : false,
      url: '/administrador',
      templateUrl: 'administrador.html',
      controller: 'administradorCtrl'
    })



            .state('paypal', {
              cache : false,
      url: '/paypal/:pago/:idProponeP/:idP',
      templateUrl: 'paypal.html',
      controller: 'paypalCtrl'
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
              cache:false,
      url: '/misMensajes',
      templateUrl: 'misMensajes.html',
      controller: 'misMensajesCtrl'
    })
                 .state('UserMessages', {
                  cache:false,
      url: '/UserMessages/:kChat',
      templateUrl: 'UserMessages.html',
      controller: 'UserMessagesCtrl'
    })

      .state('modalNewP', {
        cache:false,
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

 nameApp.constant('shopSettings',{
   
   
   payPalSandboxId : 'sand box id here',
   payPalProductionId : 'production id here',
   payPalEnv: 'PayPalEnvironmentSandbox',   // for testing  production for production
   payPalShopName : 'MyShopName',
   payPalMerchantPrivacyPolicyURL : 'url to policy',
   payPalMerchantUserAgreementURL : ' url to user agreement '
   
   
   
    
});
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
         $state.go('login');
        // $location.path('/');

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


$scope.getFoto=function(s){
  if(s){
  return s.length < 40 ? 'https://s3.amazonaws.com/gggdate/'+s : s;
  }
}
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

 nameApp.controller('miPerfilCtrl', function ($scope, $ionicSideMenuDelegate, $rootScope, $ionicLoading, $cordovaCamera, $state, $localStorage, $location,$http,$ionicPopup, $firebaseObject, FotosUsuario, Auth, FURL, Utils) {
 $scope.perfil={};
$scope.cumple=$localStorage.user[0].fechaNacimiento;

console.log($scope.cumple);

 $scope.getFoto=function(s){
return s.length < 40 ? 'https://s3.amazonaws.com/gggdate/'+s : s;

}

$scope.editSobreMi=function(type){
   $scope.perfil.sobreMiEdit='';
var placehold='';

if(type==1){
  tituloV = 'Sobre mi';
  placehold = $scope.sobreMi;
}
else if(type==3){
  tituloV = 'Edad';
  placehold = $scope.edad;
}
  else{
    tituloV = 'Mis intereses';
     placehold = $scope.intereses;
  }
console.log('asd');
   var myPopup = $ionicPopup.show({
    cssClass: 'confirmarPedido',
     template: type==3 ? '<div class="ttp"><input type="number" placeholder="'+placehold+'" style="border: 2px solid lightgray;" ng-model="perfil.sobreMiEdit"></input>' : '<div class="ttp"><textarea placeholder="'+placehold+'" style="height: 110px; border: 2px solid lightgray;" ng-model="perfil.sobreMiEdit"></textarea>',
     title: '<div class="texD">'+tituloV+'</div>',
   //  subTitle: '<div class="ss"> RESUMEN PEDIDO</div><div>Total del pedido:<br>  <h2>S/.'+(parseInt($scope.getTotal())+8.9)+'</h2><br><h3>Con cuanto cancelas?</h3></div>',
     scope: $scope,
     buttons: [
       { text: 'Cancelar',
          type:'fgg' },
       {
         text: '<b>Editar</b>',
         type: 'button-positive',
         onTap: function(e) {
          console.log($scope.perfil.sobreMiEdit);

                 $ionicLoading.show({
      template: 'Cargando...'
    });
  
          console.log('cambiar ');
if(type==1){
                var photoRef = new Firebase('https://golddate.firebaseio.com/app/infoPerfil/'+$localStorage.user[0].uid);

    photoRef.update({ sobreMi: $scope.perfil.sobreMiEdit }, function(){
    $ionicLoading.hide();
    $scope.$applyAsync(function(){
    $scope.sobreMi=$scope.perfil.sobreMiEdit;
    });
    }); 

}

else if(type==3){
                var photoRef = new Firebase('https://golddate.firebaseio.com/app/infoPerfil/'+$localStorage.user[0].uid);

    photoRef.update({ edad: $scope.perfil.sobreMiEdit }, function(){
    $ionicLoading.hide();
    $scope.$applyAsync(function(){
    $scope.edad=$scope.perfil.sobreMiEdit;
    });
    }); 

}


  else{
                    var photoRef = new Firebase('https://golddate.firebaseio.com/app/infoPerfil/'+$localStorage.user[0].uid);

    photoRef.update({ intereses: $scope.perfil.sobreMiEdit }, function(){
    $ionicLoading.hide();
    $scope.$applyAsync(function(){
    $scope.intereses=$scope.perfil.sobreMiEdit;
    });
    }); 

  }


    



     
         }
       },
     ]
   });

}



  var infoPerfil = new Firebase('https://golddate.firebaseio.com/app/infoPerfil/'+$localStorage.user[0].uid);
  infoPerfil.once("value", function(snapshot) {
var a = snapshot.exists();
  if(a){
    $scope.sobreMi=snapshot.val().sobreMi ? snapshot.val().sobreMi : 'Aun no completas esta parte de tu perfil';
    $scope.intereses=snapshot.val().intereses ? snapshot.val().intereses : 'Aun no completas esta parte de tu perfil';
     $scope.edad = snapshot.val().edad ? snapshot.val().edad : '?';
       $scope.cuenta = snapshot.val().cuenta ? snapshot.val().cuenta : '0';
      }
  else{

    $scope.sobreMi='Aun no completas esta parte de tu perfil';
    $scope.intereses='Aun no completas esta parte de tu perfil';
    $scope.edad='?';
    $scope.cuenta = '0';

  }


  });
 

  var refCompletadas = new Firebase('https://golddate.firebaseio.com/app/propuestasTerminadas');
  refCompletadas.orderByChild("kPropone").equalTo($localStorage.user[0].uid).once("value", function(snapshot) {
  var a = snapshot.exists();
  if(a){

    $scope.publicadas=snapshot.numChildren();
     console.log('publicados:'+$scope.publicadas);
  }
  else{$scope.publicadas=0}

  });



  var refSubastando = new Firebase('https://golddate.firebaseio.com/app/propuestas');
  refSubastando.orderByChild("kPropone").equalTo($localStorage.user[0].uid).once("value", function(snapshot) {
  var a = snapshot.exists();
  if(a){

    $scope.subastando=snapshot.numChildren();
     console.log('publicados:'+$scope.subastando);
  }
  else{$scope.subastando=0}

  });





     $scope.nombreUsuario=$localStorage.user[0].name;
    $scope.fotoUsuario=$localStorage.user[0].photo;

    $scope.cambiarFotoPerfil = function(){


   var isOnline = true;
   if(isOnline){

    var options = {
      quality: 100,
      //destinationType: Camera.DestinationType.DATA_URL,
      destinationType: Camera.DestinationType.FILE_URI,
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
             $ionicLoading.show({
      template: 'Cargando...'
    });

      var idUser = $localStorage.user[0].uid;
         var nombreImage=idUser+'.jpg';
      FotosUsuario.addFoto(idUser,imageData,nombreImage).then(function(data){
    


    var photoRef = new Firebase('https://golddate.firebaseio.com/app/userInfo/'+idUser);
    // Modify the 'first' and 'last' children, but leave other data at fredNameRef unchanged
    photoRef.update({ userPic: nombreImage }, function(){

   console.log(data);
    $ionicLoading.hide();
    alert('listo');
    $scope.$applyAsync(function(){
      $scope.fotoUsuario=nombreImage;
      $localStorage.user[0].photo
      $rootScope.$broadcast('userInfoBroad', {userName:$localStorage.user[0].name,
                                        userPic:nombreImage});
      $localStorage.user[0].photo=nombreImage;

    });

    }); 

 
      });

      console.log("idasidasdo");

      }, function (err) {
              console.log("En error");
                console.log(err);
                alert(err);
                 $ionicLoading.hide();
       });
      } else{
                 $ionicLoading.hide();
                    $ionicPopup.alert({
              title: 'Error',
              content: 'Es necesaria conexión a internet'
            }).then(function(res) {
              console.log('necesaria conexion ainternet');
            });
      }

    
  



    };

});



 nameApp.controller('misAlertasCtrl', function ($scope, $ionicModal, $rootScope, $ionicSideMenuDelegate, $state, PushNoti,$localStorage, $location,$http,$ionicPopup, $firebaseObject, ChatsUsuario, PaypalService, Auth, FURL, Utils) {
 //$scope.notificaciones={};




$scope.pujantes=[];


$scope.crearChat= function(g,nombreP){

if(typeof g == 'undefined' || g == '' ){console.log('a3');return true;}


 var myPopup = $ionicPopup.show({
    template: '',
    title: 'Confirmacion',
    subTitle: 'Estas a punto de seleccionar a <b>'+nombreP+'</b> como ganador',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: 'Continuar',
        type: 'button-positive',
        onTap: function(e) {

            var ganador=g;
  var idPropuesta=$scope.idPropuestaSeleccionada;
  var idUserPropuesta=$localStorage.user[0].uid;

ChatsUsuario.addChat(idPropuesta,ganador,idUserPropuesta, nombreP,$localStorage.user[0].name);
                                      $ionicPopup.alert({
              title: 'Seleccion exitosa',
              content:'Se ha creado un chat con el ganador de tu propuesta'
            }).then(function(res) {
               //delete $scope.propuesta;
               $scope.closeModal();
               

            });



        }
      }
    ]
  });



 // console.log("Ganador: "+g+" IdPropuesta: "+idPropuesta+" idUserPropuesta: "+idUserPropuesta)
}


 $scope.borrarNoti = function(k){
var notif = new Firebase('https://golddate.firebaseio.com/app/notificaciones/'+$localStorage.user[0].uid+'/'+k);
notif.remove();
$scope.getNotificaciones();
//$rootScope.$broadcast('pushNuevo');

$rootScope.$broadcast('borrarNotiss');
console.log($scope.iconNoti);

 };

$scope.$on('borrarNotiss', function(event, args) {
$scope.$applyAsync(function(){$scope.iconNoti=$scope.iconNoti-1});
    // do what you want to do
});

 $scope.pagarPuja = function(k){
console.log(k);
var fnotif = new Firebase('https://golddate.firebaseio.com/app/propuestasTerminadas/'+k);
fnotif.once('value', function(s){
    var a = s.exists();
  if(a){
    console.log(s.val().kPropone);
    $state.go('paypal',{pago:s.val().pujaActual, idProponeP:s.val().kPropone,idP:0});
  }
    if(!a){

      var fnotif = new Firebase('https://golddate.firebaseio.com/app/propuestas/'+k);
fnotif.once('value', function(ss){
 
      $state.go('paypal',{pago:ss.val().pujaActual, idProponeP:ss.val().kPropone, idP:k})

    });}
});
/*
 PaypalService.initPaymentUI().then(function () {
                    PaypalService.makePayment(100, "Total").then(function(){
                      console.log('asda');

                    })
 });
*/

 }


 $scope.escogerGanador = function(k){

var refExiste = new Firebase("https://golddate.firebaseio.com/app/chats");


  refExiste.orderByChild("idPropuesta").equalTo(k).once("value", function(snapshot) {
  var a = snapshot.exists();

  if(a){alert('ya has escogido un ganador para esta propuesta')}
  else{



 $scope.pujantes=[];
var refPujas = new Firebase("https://golddate.firebaseio.com/app/pujas/"+k);

var ij=0;
refPujas.once("value", function(snap) {
$scope.idPropuestaSeleccionada=snap.key();
  console.log("terminadk");
  var tamanoArrego=Object.keys(snap.val()).length;

snap.forEach(function(item,index){
   $scope.pujantes.splice((tamanoArrego-index),0,{nombreP:item.val().pujante,
                                                  KPujante:item.val().KPujante,
                                               valorPuja:item.val().valorPuja,
                                                posicion:tamanoArrego-ij});
   ij++;
//$scope.$applyAsync();
  console.log(item.val());
});

$scope.openModal('fade-in-scale','seleccionarGanador.html');

});

  }
  console.log(a);

  });
 // console.log(snapshot.val());



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

if($localStorage.user){
if($localStorage.user.length>0){
$scope.getNotificaciones();}
}
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
  

  $scope.loguear = function(uid){
   
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
     var sessionPID= PushNoti.addPush(uid,pushState);
  

        }else{console.log("nopushK");}
//endPush


                  ref.child('app/userInfo/'+uid).once("value", function(snap) {

              $localStorage = $localStorage.$default({
  user: [],pruebaStorage: []
});
            $localStorage.user.push({ uid:uid,
                                      sessionPID:sessionPID || null,
                                      fechaNacimiento:snap.val().fechaNacimiento || null,
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


  };   
 $scope.loginFace = function(){



     var ref = new Firebase("https://golddate.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        alert("Ups, ha ocurrido un error inesperado :c");
      } else {
        console.log("Authenticated successfully with payload:", authData);



  var refUser = new Firebase('https://golddate.firebaseio.com/app/userInfo/'+authData.uid);
  refUser.once("value", function(snap) {
  var a = snap.exists();
  if(a){

    $scope.loguear(authData.uid);

  }
  else{


        var refUserNew = new Firebase('https://golddate.firebaseio.com/app/userInfo/'+authData.uid);
        refUserNew.set({email:authData.facebook.email, 
                        nombre:authData.facebook.displayName, 
                        userPic:authData.facebook.profileImageURL,
                        vip:false},$scope.loguear(authData.uid));
    


  }

  });
/*
           
                   $localStorage.user.push({email:authData.facebook.email,
                                     name:authData.facebook.displayName,
                                      photo:authData.facebook.profileImageURL,
                                      vip:false}); 


$rootScope.$broadcast('userInfoBroad', {userName:authData.facebook.displayName,
                                        userPic:authData.facebook.profileImageURL});

                  $location.path('/');
                  $state.go('list');
               */   


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
                                        fechaNacimiento:snap.val().fechaNacimiento || null,
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


nameApp.controller('yourCtrl', function($scope, $state, $braintree, $localStorage, $http, $ionicLoading) {
$scope.payCenter=true;




    var client;
    $scope.creditCard = {
      number: '',
      expirationDate: ''
    };

    var startup = function() {
      $braintree.getClientToken().success(function(token) {
        client = new $braintree.api.Client({
          clientToken: token
        });
      });
    }

    $scope.payButtonClicked = function(p,type,id,idP) {

 if($localStorage.user[0].vip == true && type == 1){

alert('Ya eres VIP');
return true;

 }
 

 $ionicLoading.show({
        template: 'Cargando...'
      });
var idPo=0;
if(type==1){
  var UserID=$localStorage.user[0].uid;

}

if(type==2){
  var UserID=id;
   idPo=idP;}

//console.log(document.getElementsByName("payment_method_nonce")[0].value);
if(typeof document.getElementsByName("payment_method_nonce")[0] !== 'undefined' ){
if(document.getElementsByName("payment_method_nonce")[0].value){
 var url = 'http://54.187.131.158:3000/checkout';
    $http
      .post(url, {idPropuesta: idPo, userID: UserID, type:type,pago:p,payment_method_nonce:document.getElementsByName("payment_method_nonce")[0].value})
      .success(function (response) {
        console.log(response);
        if(response==true){
           $ionicLoading.hide();
          alert('Transaccion Exitosa!');
          $localStorage.user[0].vip=true;
          $state.go('list');
        }
        else{
          $ionicLoading.hide();
          alert('Ha ocurrido un error');
        }  
      });

  console.log('paypal');
  return true;
}
}
if(typeof $scope.creditCard.number == "undefined" || $scope.creditCard.number == '' || typeof $scope.creditCard.expirationDate == "undefined" || $scope.creditCard.expirationDate == '' ){
$ionicLoading.hide();
alert('Datos incompletos');
return true;


}


      // - Validate $scope.creditCard
      // - Make sure client is ready to use

      client.tokenizeCard({
        number: $scope.creditCard.number,
        expirationDate: $scope.creditCard.expirationDate
      }, function (err, nonce) {
console.log(nonce);

   var url = 'http://54.187.131.158:3000/checkout';
   // $log.debug(url);
  
    $http
      .post(url, {idPropuesta: idPo, userID: UserID, type:type,pago:p,payment_method_nonce:nonce})
      .success(function (response) {
        console.log(response);
        if(response==true){
          $ionicLoading.hide();
          alert('Transaccion Exitosa!');
           $localStorage.user[0].vip=true;
          $state.go('list');
        }
        else{
          $ionicLoading.hide();
          alert('Ha ocurrido un error');
        }  
      });
        // - Send nonce to your server (e.g. to make a transaction)

      });
    };

    startup();
  });
nameApp.controller('paypalCtrl',function($scope,$rootScope,$ionicHistory,$location, $http, $state,$stateParams,$localStorage,$ionicModal,$ionicSlideBoxDelegate,$ionicSideMenuDelegate, Navigation, FotosUsuario)
{




$scope.sss=function(){console.log('sss');}
/*

FotosUsuario.getKP().then(function(data){
  console.log(data);
var clientToken = data;

braintree.setup(clientToken, "dropin", {
  container: "payment-form"
});

});

$scope.submitPay = function (form) {
    //if (!$scope.contactForm.$valid) return;
  console.log('asdasdasd22222222');
  console.log(form);
   // var url = form.attributes["target"];
   var url = 'http://54.187.131.158:3000/checkout';
   // $log.debug(url);
  
    $http
      .post(url)
      .success(function () {
        console.log(response);
      });

      return false;
    }

    */




$scope.pago={};
$scope.pago.cantidadAPagar=$stateParams.pago;
$scope.pago.idProponeP=$stateParams.idProponeP;
$scope.pago.idP=$stateParams.idP;
console.log($scope.pago);

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


nameApp.controller('seleccionarGanadorCtrl', function(){



});



nameApp.controller('administradorCtrl', function($scope, $timeout, $ionicLoading){

	         $ionicLoading.show({
        template: 'Cargando...'
      });


$scope.d={};
    var ref = new Firebase("https://golddate.firebaseio.com/app/userInfo");
    ref.once("value", function(snapshot) {
      var a = snapshot.numChildren();
      // a === 1 ("name")
     
      // b === 2 ("first", "last")

         $scope.$applyAsync(function(){
    
    $scope.d.totales=a;
   }); 

      // c === 0 (since "Fred" is a string)
      console.log(snapshot.val())
    });

        var refs = new Firebase("https://golddate.firebaseio.com/app/propuestas");
    refs.once("value", function(snapshot) {
      var a = snapshot.numChildren();
      // a === 1 ("name")
     
      // b === 2 ("first", "last")
      $scope.$applyAsync(function(){
     $scope.d.propuestas=a;
   }); 

      // c === 0 (since "Fred" is a string)
    });

        var rsefs = new Firebase("https://golddate.firebaseio.com/app/userInfo");
    rsefs.orderByChild("vip").equalTo(true).once("value", function(snapshot) {
      var a = snapshot.numChildren();
      // a === 1 ("name")
     
      // b === 2 ("first", "last")
      $scope.$applyAsync(function(){
  $scope.d.userVIP=a;
   }); 
  
    });



            var refss = new Firebase("https://golddate.firebaseio.com/app/propuestasTerminadas");
    refss.once("value", function(snapshot) {
      var a = snapshot.numChildren();
      // a === 1 ("name")
     
      // b === 2 ("first", "last")
   $scope.$applyAsync(function(){
   	$scope.d.propuestasT=a;
   	  $ionicLoading.hide();
   }); 
      // c === 0 (since "Fred" is a string)
    });



});


nameApp.controller('detailCtrl',function($scope, $ionicPopup, $rootScope,$location, $state,$stateParams,$localStorage,$ionicModal,$ionicSlideBoxDelegate,$ionicSideMenuDelegate, Navigation,FotosUsuario){









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
                                            pujante:$localStorage.user[0].name,
                                            KPujante:$localStorage.user[0].uid,
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


  $scope.showImages = function(index) {
    $scope.activeSlide = index;
    $scope.openModal('slide-in-up','fotosV.html');
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
$scope.fotoPropuesta=$stateParams.fotoPropuesta;
var idPropone=$stateParams.idPropone;
$scope.idPropone= $stateParams.idPropone;
$scope.categoriaN=$stateParams.categoriaN;
$scope.ivip=$stateParams.vip;


if($scope.idPropone){
if($scope.idPropone.indexOf('facebook') > -1){
//get value from firebase

var rdef = new Firebase("https://golddate.firebaseio.com/app/userInfo/"+idPropone);
rdef.once("value", function(snap) {
  console.log(snap.val());
  $scope.ff = snap.val().userPic;
});


}
else{

  $scope.ff= 'https://s3.amazonaws.com/gggdate/'+idPropone+'.jpg';
}
}
//
/*
$localStorage = $localStorage.$default({
  pruebaStorage: [0]
});

  $localStorage.pruebaStorage.push($localStorage.pruebaStorage+1);
  console.log( $localStorage.pruebaStorage);
*/
  var infoPerfill = new Firebase('https://golddate.firebaseio.com/app/infoPerfil/'+$scope.idPropone);
  infoPerfill.once("value", function(snapshot) {
var a = snapshot.exists();
  if(a){
    $scope.sobreMi=snapshot.val().sobreMi ? snapshot.val().sobreMi : 'incompleto';
    $scope.intereses=snapshot.val().intereses ? snapshot.val().intereses : 'incompleto';
     $scope.edad = snapshot.val().edad ? snapshot.val().edad : '?';
      }
  else{

    $scope.sobreMi='incompleto';
    $scope.intereses='incompleto';
$scope.edad='?';
  }


  });
 
console.log('ads333');

  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }
$scope.pages=[];

  FotosUsuario.getFotos(idPropone).then(function(data){
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            // console.log(key + " -> " + data[key].src);
            $scope.pages.push({background:"https://s3.amazonaws.com/gggdate/"+data[key].src, 
                               text:''});
        }
        $scope.$applyAsync();
      }
  console.log(data);
});

/*
    $scope.pages = [{"text":"1", "background": "https://s-media-cache-ak0.pinimg.com/236x/63/82/77/638277f0392e0ce87a821051734ab127.jpg"},
                  {"text":"2", "background": "#43cee6"},
                 
                 ]
  */
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


  nameApp.controller('MyController', function($scope,$rootScope,$ionicLoading, $ionicPopup,  $localStorage,$ionicModal,$controller) {

  	angular.extend(this, $controller('detailCtrl', {$scope: $scope}));



  	$scope.agregarPuja=function(we){

    	  	console.log('ala');
   if($localStorage.user[0].uid == $scope.idPropone){alert('No puedes pujar tu propia propuesta'); return true}
console.log($scope.idPropone);
console.log($localStorage.user[0].uid);

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
                                            pujante:$localStorage.user[0].name,
                                            KPujante:$localStorage.user[0].uid,
                                            fechaPuja:Date.now()});
                   $rootScope.$broadcast('actualizarPuja', {puja:$scope.inputSubasta});
                   $scope.pujaActual=$scope.inputSubasta;

  
  
      console.log('puja actuzlizada');
  
  
       $ionicLoading.hide();

                                  $ionicPopup.alert({
              title: 'Exito',
              content: 'Tu puja fue realizada con exito'
            }).then(function(res) {
              console.log('necesaria conexion ainternet');
               $scope.closeModal();

            });


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
    $rootScope.$broadcast('catFiltro', { cat: cat });
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



    nameApp.controller('crearPropuestaCtrl', function($scope, $rootScope, $localStorage, $state, $timeout, $ionicPopup, $ionicLoading, $cordovaCamera, $cordovaGeolocation,$firebaseArray, $ionicModal,FotosUsuario) {
//color #6239AB
$scope.propuesta = {};
$scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];
$scope.categoriaSeleccionada='Seleccionar categoria';
$scope.setCategoria=function(cat){
  console.log(cat);

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
/*
     var alertPopup = $ionicPopup.alert({
     title: 'Foto necesaria',
     template: 'Debes agregar una foto para continuar'
   });

   alertPopup.then(function(res) {
     return true;
   });

return true;
*/
       //$scope.imgURI='';
}
      	//obtener fecha actual
      	          $ionicLoading.show({
      template: 'Cargando...'
    });



        console.log($scope.propuesta);

        var ref = new Firebase('https://golddate.firebaseio.com/app');
 var lat;
 var long;
 var nombreImg;
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




var newPostRef = propuestaRef.push();
// Get the unique ID generated by push()
var postID = newPostRef.key();


        var pKey=newPostRef.set({
        categoria: $scope.propuesta.categoria,
        chico: $scope.propuesta.chico == undefined ? null :$scope.propuesta.chico,
        chica: $scope.propuesta.chica == undefined ? null :$scope.propuesta.chica,
        fechaCreacion: Date.now(),
        diasEnSubasta:$scope.propuesta.diasEnSubasta,
        duracion:$scope.propuesta.duracion,
        descripcion: $scope.propuesta.descripcion,
        tipo: $scope.propuesta.tipo,
        estado: true,
        pujaActual:$scope.propuesta.precio,
        idPropone: $localStorage.user[0].email,
        kPropone:$localStorage.user[0].uid,
        nickPropone:$localStorage.user[0].name,
        vip:$localStorage.user[0].vip,
        imgPropuesta:postID+'.jpg'
        },function(){

          nombreImg=postID+'.jpg';


           ref.child('pujas/'+postID).push({valorPuja:$scope.propuesta.precio,
                                          pujante:'Inicial',
                                          fechaPuja:Date.now()});

            geoFire.set(postID, [lat, long]).then(function() {
            console.log("ID:"+ postID + ": setiado en pos: [" + lat + "," + long + "]");
             // alert("agregado");
            });


      FotosUsuario.addFoto($localStorage.user[0].uid,$scope.imgURI,nombreImg).then(function(data){
    
    console.log(data);
    $ionicLoading.hide();

                                      $ionicPopup.alert({
              title: 'Exito',
              content: 'Tu propuesta fue creada con exito'
            }).then(function(res) {
               //delete $scope.propuesta;
               $state.go('list');

            });

 
      });

			     //     $ionicLoading.hide();
        

        });
        // la key de la propuesta creada es : pKey.key() 

        },function(err){
        			console.log("err4r44");
        			console.log(err);
              alert("Debes activar al GPS para continuar");
        				        $ionicLoading.hide();
    				} 
    				);
      }

/*
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
*/ 
  $scope.selectPicture = function () {
   var isOnline = true;
   if(isOnline){

    var options = {
      quality: 100,
      //destinationType: Camera.DestinationType.DATA_URL,
      destinationType: Camera.DestinationType.FILE_URI,
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
   
$scope.imgURI = imageData;
    

      console.log("idasidasdo");

      }, function (err) {
              console.log("En error");
                console.log(err);
                alert(err);
                 $ionicLoading.hide();
       });
      } else{
                 $ionicLoading.hide();
                    $ionicPopup.alert({
              title: 'Error',
              content: 'Es necesaria conexión a internet'
            }).then(function(res) {
              console.log('necesaria conexion ainternet');
            });
      }

    
  }



    });

    nameApp.controller('dashboardCtrl', function($scope, $rootScope,$location,$ionicSideMenuDelegate, $cordovaGeolocation,$firebaseArray, $timeout, $localStorage, $state,$ionicPopup, $firebaseObject, Auth, FURL, Utils){

$scope.getLo=function(){
if(localStorage.getItem('ngStorage-user') !== null && localStorage.getItem('ngStorage-user').length>5){
  return $localStorage.user[0].vip}


}
$scope.userVip=$localStorage.user[0].vip;
$scope.navTitle='<img class="title-image" src="img/logo.png" style="height: 100%; width: 100px;">';
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
         //  subasta.tiempoRestante='Finaliza en: '+Math.round(((parseInt(data.val().fechaCreacion)+parseInt(data.val().diasEnSubasta))-Date.now())/3600000)+'h';
           subasta.tiempoRestante='Duracion: '+data.val().duracion;
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
       alert('Debes activar el GPS del movil para el correcto funcionamiento del App'); 
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
      destinationType: Camera.DestinationType.FILE_URI,
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
             $ionicLoading.show({
      template: 'Cargando...'
    });

      var idUser = $localStorage.user[0].uid;
         var nombreImage=idUser+Date.now()+'.jpg';
      FotosUsuario.addFoto(idUser,imageData,nombreImage).then(function(data){
    
    console.log(data);
    $ionicLoading.hide();
    alert('listo');
      });

      console.log("idasidasdo");

      }, function (err) {
              console.log("En error");
                console.log(err);
                alert(err);
                 $ionicLoading.hide();
       });
      } else{
                 $ionicLoading.hide();
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
            $scope.items.push({src:"https://s3.amazonaws.com/gggdate/"+data[key].src, 
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



nameApp.controller('filtrosVIPCtrl', function($scope, $state, $stateParams, $cordovaSocialSharing, $localStorage, $timeout, $ionicScrollDelegate, ChatsUsuario) {

if($localStorage.user[0].vip == false){
  
  setTimeout(function(){
  alert('Lo sentimos, es necesario ser VIP para acceder');
$state.go('list');
}, 500);

  
}

$scope.enBusqueda=true;
$scope.busqueda={};
    $scope.propuestasValidas=[];
    $scope.arrayF=[];
$scope.$on('catFiltro', function(event, args) {

     $scope.busqueda.categoriaFiltro = args.cat;
    // do what you want to do
});


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
  

$scope.cancelarBusqueda = function(){
  
  $scope.enBusqueda=true;
   $scope.propuestasValidas=[];
    $scope.arrayF=[];
    
}
$scope.etiquetas=[];

  $scope.buscar=function(){
$scope.enBusqueda=false;
    $scope.propuestasValidas=[];
    $scope.arrayF=[];
    $scope.etiquetas=[];

$ionicScrollDelegate.scrollTop();


      var ref = new Firebase("https://golddate.firebaseio.com/app/propuestas");
     ref.once("value", function(snapshot) {
   
         snapshot.forEach(function(userSnapshot) {

          if(!(typeof $scope.busqueda.nombre == 'undefined' || $scope.busqueda.nombre=='' )){
          //filtro nombre
            
              var string = userSnapshot.val().nickPropone;
              var substring = $scope.busqueda.nombre;
             
              if(string.indexOf(substring) > -1){
                var s=userSnapshot.val();
                //s.tiempoRestante='Finaliza en: '+Math.round(((parseInt(userSnapshot.val().fechaCreacion)+parseInt(userSnapshot.val().diasEnSubasta))-Date.now())/3600000)+'h';
 s.tiempoRestante='Duracion: '+userSnapshot.val().duracion;
                $scope.propuestasValidas[userSnapshot.key()]=s;
                $scope.arrayF.push(userSnapshot.key());
              }
         
        
          }

          else{
                          var s=userSnapshot.val();
               // s.tiempoRestante='Finaliza en: '+Math.round(((parseInt(userSnapshot.val().fechaCreacion)+parseInt(userSnapshot.val().diasEnSubasta))-Date.now())/3600000)+'h';
                s.tiempoRestante='Duracion: '+userSnapshot.val().duracion;
             $scope.propuestasValidas[userSnapshot.key()] = s;

             $scope.arrayF.push(userSnapshot.key());
            //aun vacio

          }


          if($scope.busqueda.categoriaFiltro){
            console.log('FC');
          var catP = userSnapshot.val().categoria;
          var catF = $scope.busqueda.categoriaFiltro;
          if(catP!==catF){
            delete  $scope.propuestasValidas[userSnapshot.key()];
            var index = $scope.arrayF.indexOf(userSnapshot.key());
            if (index > -1) {
                    $scope.arrayF.splice(index, 1);
                }
          }
            //filtro cat ON

          }

          if($scope.chico == true){
   console.log('FCO');
          var chicoP = userSnapshot.val().chico;
          var chicoF = true;
          console.log(chicoP);
          console.log(chicoF);
          if(chicoP!==chicoF){
           
            delete  $scope.propuestasValidas[userSnapshot.key()];
                      var index = $scope.arrayF.indexOf(userSnapshot.key());
            if (index > -1) {
                    $scope.arrayF.splice(index, 1);
                }

          }
           
           // query1: sexo / tipo
          }


          if($scope.chica == true){
   console.log('FCA');
          var chicaP = userSnapshot.val().chica;
          var chicaF = true;
          if(chicaP!==chicaF){
            delete  $scope.propuestasValidas[userSnapshot.key()];
                      var index = $scope.arrayF.indexOf(userSnapshot.key());
            if (index > -1) {
                    $scope.arrayF.splice(index, 1);
                }
          }
           
           // query1: sexo / tipo
          }
if(!($scope.fijo == true && $scope.subasta == true))
{          if($scope.fijo == true){
            console.log('FF');
          var fP = userSnapshot.val().tipo;
          var fF = "2";
          if( fP !== fF){
            delete  $scope.propuestasValidas[userSnapshot.key()];
                      var index = $scope.arrayF.indexOf(userSnapshot.key());
            if (index > -1) {
                    $scope.arrayF.splice(index, 1);
                }
          }
           
           // query1: sexo / tipo
          }

          if($scope.subasta == true){
            console.log('FF');
          var sP = userSnapshot.val().tipo;
          var sF = "1";
          if( sP !== sF ){
            delete  $scope.propuestasValidas[userSnapshot.key()];
                      var index = $scope.arrayF.indexOf(userSnapshot.key());
            if (index > -1) {
                    $scope.arrayF.splice(index, 1);
                }
          }
           
           // query1: sexo / tipo
          }
}

                  



         });

         console.log($scope.propuestasValidas);
console.log($scope.arrayF);
$scope.$applyAsync();


});






if(typeof $scope.busqueda.edadDe == 'undefined' || $scope.busqueda.edadDe=='' || typeof $scope.busqueda.edadHasta == 'undefined' || $scope.busqueda.edadHasta=='' ){
    
console.log('no edad');
}

var query;

/*

queryField:
Categoria.
chico_chica_tipo
chico: 1
chicha:2
chico/chica:3

tipo subasta:1
tipo fijo:2


CATEGORIA_SEXO_TIPO
SEXO_TIPO


query1: sexo / tipo
*/

if($scope.chico == true || $scope.chica == true && $scope.subasta == true || $scope.fijo == true){
  console.log(' query1');
  query=1;
 // query1: sexo / tipo
}
else{
  if($scope.chico == true || $scope.chica == true ){
   

  }
    if( $scope.subasta == true || $scope.fijo == true ){
    //query solo por tipo
  }


}


if(!(typeof $scope.busqueda.nombre == 'undefined' || $scope.busqueda.nombre=='' )){$scope.etiquetas.push('nombre');} 
if($scope.chico == true){ $scope.etiquetas.push('chico');}
if($scope.chica == true){ $scope.etiquetas.push('chica');}
if($scope.subasta == true){$scope.etiquetas.push('subasta');}
if($scope.fijo == true){$scope.etiquetas.push('fijo');}
if($scope.busqueda.categoriaFiltro){$scope.etiquetas.push('categoria');}






/*
    ref.orderByChild("tipo").equalTo("2").once("value", function(snapshot) {
      console.log(snapshot.val());

          ref.orderByChild('descripcion').startAt("tomar").endAt("b\uf8ff").on("child_added", function(snapshot) {
  console.log(snapshot.key());
});
  
    });
    */


  }



});

nameApp.controller('compartirCtrl', function($scope, $state, $stateParams, $cordovaSocialSharing, $localStorage, $timeout, $ionicScrollDelegate, ChatsUsuario) {

$scope.compartirFace=function(){

    $cordovaSocialSharing
    .shareViaFacebook(null, null, 'https://play.google.com/store/apps/details?id=com.whatsapp&hl=es_41')
    .then(function(result) {
      // Success!
            console.log(result);
      console.log('ok');
    }, function(err) {
      console.log(err);
      console.log('error');
      // An error occurred. Show a message to the user
    });
}



$scope.compartirCorreo=function(){

    $cordovaSocialSharing
    .shareViaEmail('Prueba Goldate', 'Goldate', null, null, null, null)
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });

}
$scope.compartirOtro=function(){
  $cordovaSocialSharing
    .share(null, null, null, 'https://play.google.com/store/apps/details?id=com.whatsapp&hl=es_41') // Share via native share sheet
    .then(function(result) {
      console.log(result);
      // Success!
    }, function(err) {
       console.log(err);
      // An error occured. Show a message to the user
    });


}

$scope.compartirTwitter=function(){

  $cordovaSocialSharing
    .shareViaTwitter(null, null, 'https://play.google.com/store/apps/details?id=com.whatsapp&hl=es_41')
    .then(function(result) {
          console.log(result);
      console.log('ok');
      // Success!
    }, function(err) {
            console.log(err);
      console.log('error');
      // An error occurred. Show a message to the user
    });


}

$scope.compartirWhats=function(){

    $cordovaSocialSharing
    .shareViaWhatsApp(null, null, 'https://play.google.com/store/apps/details?id=com.whatsapp&hl=es_41')
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });

}

  });
 
nameApp.controller('UserMessagesCtrl', function($scope, $state,$stateParams, $localStorage, $timeout, $ionicScrollDelegate, ChatsUsuario) {
  $scope.messages=[];
$scope.chatSeleccionado=$stateParams.kChat;
console.log($scope.chatSeleccionado);



var chatsRef = new Firebase('https://golddate.firebaseio.com/app/mensajes/'+$scope.chatSeleccionado);

chatsRef.on("child_added", function(snapshot) {

console.log(snapshot.val());
$scope.$applyAsync(function(){

   $scope.messages.push({
      userId:  snapshot.val().userId,
      text:  snapshot.val().text,
      time:  snapshot.val().time
    });


});


});


  $scope.hideTime = true;

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function() {
    alternate = !alternate;

    var d = new Date();
  d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

var addMensajeRef = new Firebase('https://golddate.firebaseio.com/app/mensajes/'+$scope.chatSeleccionado);
addMensajeRef.push({
      userId: $localStorage.user[0].uid,
      text: $scope.data.message,
      time: d
    });
 /*
    $scope.messages.push({
      userId:  $localStorage.user[0].uid,
      text: $scope.data.message,
      time: d
    });

    /*
    $scope.messages.push({
      userId: alternate ? '12345' : '54321',
      text: $scope.data.message,
      time: d
    });
*/
    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);

  };


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = $localStorage.user[0].uid;
  $scope.messages = [];


});


nameApp.controller('misMensajesCtrl', function($scope, $state, $localStorage, $timeout, $ionicScrollDelegate, ChatsUsuario) {


$scope.getFoto=function(s){

  var string = s;
    substring = "facebook";
if(string.indexOf(substring) > -1){
//get value from firebase

var ref = new Firebase("https://golddate.firebaseio.com/app/userInfo/"+s);
ref.once("value", function(snap) {
  return snap.val().userPic;
});


}
else{
  return 'https://s3.amazonaws.com/gggdate/'+s+'.jpg';
}
}


$scope.kChats='';
$scope.misChats={};
$scope.misChatsGanados={};

  ChatsUsuario.getChats($localStorage.user[0].uid).then(function(data){
  $scope.misChats=data;
  console.log(data);
});

    ChatsUsuario.getChatsGanados($localStorage.user[0].uid).then(function(data){
  $scope.misChatsGanados=data;
//console.log(Object.keys($scope.misChatsGanados)[1]);
});


$scope.openChat=function(kChat,ganados){

  if(ganados==true){
   $scope.kChats= Object.keys($scope.misChatsGanados)[kChat];
  var kc = Object.keys($scope.misChatsGanados)[kChat];
  }

    if(ganados==false){
   $scope.kChats= Object.keys($scope.misChats)[kChat];
  var kc = Object.keys($scope.misChats)[kChat];
  }
  
/*
var chatsRef = new Firebase('https://golddate.firebaseio.com/app/mensajes/'+$scope.kChats);

chatsRef.on("child_added", function(snapshot) {

console.log(snapshot.val());

});
*/
$state.go('UserMessages',{kChat:kc});

//console.log(kChats);

}


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
        alert("Debes activar el GPS");    
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
                        nombre:user.nombre, 
                        userPic:'photoDefecto.png',
                        fechaNacimiento:(user.fechaNacimiento).toString(),
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
            msg = "Este email ya ha sido tomado."; break;
          case "INVALID_EMAIL":
            msg = "Invalid Email."; break;
          case "NETWORK_ERROR":
            msg = "Error de conexion."; break;
          case "INVALID_PASSWORD":
            msg = "Password invalido."; break;
          case "INVALID_USER":
            msg = "Usuario invalido."; break;
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
     var notis=[];
     itemsRef.once("value", function(snapshot) {
      //var nameSnapshot = snapshot.child("companyName");
      //var name = nameSnapshot.val();
                    snapshot.forEach(function(item,index){
                      var tempo={};
                      tempo=item.val();
                      tempo.keyNoti=item.key();
                
                notis.push(tempo);
                console.log(tempo);

              });

      console.log(notis);
      defer.resolve(notis); //this does not return the data
    });
    return defer.promise;

  }


}
});




nameApp.factory('ChatsUsuario', function($http, $q) {
return {
 

    getChatsGanados:function(idUser){

var chatsRef = new Firebase('https://golddate.firebaseio.com/app/chats');
     var defer = $q.defer();
console.log('enChatUser');
     chatsRef.orderByChild("idGanador").equalTo(idUser.toString()).once("value", function(snapshot) {
 // console.log(snapshot.val());
  defer.resolve(snapshot.val());
});

    return defer.promise;
  

  
  },



    getChats:function(idUser){

var chatsRef = new Firebase('https://golddate.firebaseio.com/app/chats');
     var defer = $q.defer();
console.log('enChatUser');
     chatsRef.orderByChild("idPropietario").equalTo(idUser.toString()).once("value", function(snapshot) {
 // console.log(snapshot.val());
  defer.resolve(snapshot.val());
});

    return defer.promise;
  

  
  },

  addChat:function(idPropuesta,idGanador,idUserPropone, name, nameP){


var itemsRef = new Firebase('https://golddate.firebaseio.com/app/chats');

    

     
    return itemsRef.push({idPropuesta:idPropuesta,
                          idGanador:idGanador,
                          idPropietario:idUserPropone,
                          nombreGanador: name,
                          nombrePropietario:nameP});


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

    getKP:function(){
      var deferred = $q.defer();
 var signingURI = "http://54.187.131.158:3000/client_token";

 $http({
  method: 'GET',
  url: signingURI
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    console.log(response);
     deferred.resolve(response.data);
  }, function errorCallback(response) {
        console.log(response);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });



              

   return deferred.promise;

  },


  addFoto:function(id,imageURI,fileName){
 var signingURI = "http://54.187.131.158:3000/signing";
       var deferred = $.Deferred(),
            ft = new FileTransfer(),
            options = new FileUploadOptions();
 
        options.fileKey = "file";
        options.fileName = fileName;
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
 
        $.ajax({url: signingURI, data: {"fileName": fileName}, dataType: "json", type: "POST"})
            .done(function (data) {
                options.params = {
                    "key": fileName,
                    "AWSAccessKeyId": data.awsKey,
                    "acl": "public-read",
                    "policy": data.policy,
                    "signature": data.signature,
                    "Content-Type": "image/jpeg"
                };
 
                ft.upload(imageURI, "https://" + data.bucket + ".s3.amazonaws.com/",
                    function (e) {
                    	console.log('footosybuda');

var itemsRef = new Firebase('https://golddate.firebaseio.com/app/images/'+id);
itemsRef.push({src: fileName,state: 1 });

                        deferred.resolve(e);
                    },
                    function (e) {
                    	console.log(e);
                        alert("Upload failed");
                        deferred.reject(e);
                    }, options);
 
            })
            .fail(function (error) {
                console.log(JSON.stringify(error));
            });
 
        return deferred.promise();


  },
  asddFoto:function(idUser,imagen){

 
     var defer = $q.defer();

var name=idUser.toString()+Date.now().toString()+'.jpg';
var image=imagen;
console.log(imagen)
  var bucket = new AWS.S3({params: {Bucket: 'goldate'}});
  var params = {Key: name, ContentType: 'image/jpeg', Body: image,   ContentEncoding: 'base64', ACL: 'public-read'};
  bucket.upload(params, function(err, data){
    if(err){ alert(err); return 'error' }
    console.log('asd subida');
      console.log(data);

     
    defer.resolve();

  });


return defer.promise;

  
  }
}
});


nameApp.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
});






nameApp.factory('PaypalService', ['$q', '$ionicPlatform', 'shopSettings', '$filter', '$timeout', function ($q, $ionicPlatform, shopSettings, $filter, $timeout) {



        var init_defer;
        /**
         * Service object
         * @type object
         */
        var service = {
            initPaymentUI: initPaymentUI,
            createPayment: createPayment,
            configuration: configuration,
            onPayPalMobileInit: onPayPalMobileInit,
            makePayment: makePayment
        };


        /**
         * @ngdoc method
         * @name initPaymentUI
         * @methodOf app.PaypalService
         * @description
         * Inits the payapl ui with certain envs. 
         *
         * 
         * @returns {object} Promise paypal ui init done
         */
        function initPaymentUI() {

            init_defer = $q.defer();
            $ionicPlatform.ready().then(function () {

                var clientIDs = {
                    "PayPalEnvironmentProduction": shopSettings.payPalProductionId,
                    "PayPalEnvironmentSandbox": shopSettings.payPalSandboxId
                };
                PayPalMobile.init(clientIDs, onPayPalMobileInit);
            });

            return init_defer.promise;

        }


        /**
         * @ngdoc method
         * @name createPayment
         * @methodOf app.PaypalService
         * @param {string|number} total total sum. Pattern 12.23
         * @param {string} name name of the item in paypal
         * @description
         * Creates a paypal payment object 
         *
         * 
         * @returns {object} PayPalPaymentObject
         */
        function createPayment(total, name) {
                
            // "Sale  == >  immediate payment
            // "Auth" for payment authorization only, to be captured separately at a later time.
            // "Order" for taking an order, with authorization and capture to be done separately at a later time.
            var payment = new PayPalPayment("" + total, "EUR", "" + name, "Sale");
            return payment;
        }
        /**
         * @ngdoc method
         * @name configuration
         * @methodOf app.PaypalService
         * @description
         * Helper to create a paypal configuration object
         *
         * 
         * @returns {object} PayPal configuration
         */
        function configuration() {
            // for more options see `paypal-mobile-js-helper.js`
            var config = new PayPalConfiguration({merchantName: shopSettings.payPalShopName, merchantPrivacyPolicyURL: shopSettings.payPalMerchantPrivacyPolicyURL, merchantUserAgreementURL: shopSettings.payPalMerchantUserAgreementURL});
            return config;
        }

        function onPayPalMobileInit() {
            $ionicPlatform.ready().then(function () {
                // must be called
                // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
                PayPalMobile.prepareToRender(shopSettings.payPalEnv, configuration(), function () {

                    $timeout(function () {
                        init_defer.resolve();
                    });

                });
            });
        }

        /**
         * @ngdoc method
         * @name makePayment
         * @methodOf app.PaypalService
         * @param {string|number} total total sum. Pattern 12.23
         * @param {string} name name of the item in paypal
         * @description
         * Performs a paypal single payment 
         *
         * 
         * @returns {object} Promise gets resolved on successful payment, rejected on error 
         */
        function makePayment(total, name) {


            var defer = $q.defer();
            total = $filter('number')(total, 2);
            $ionicPlatform.ready().then(function () {
                PayPalMobile.renderSinglePaymentUI(createPayment(total, name), function (result) {
                    $timeout(function () {
                        defer.resolve(result);
                    });
                }, function (error) {
                    $timeout(function () {
                        defer.reject(error);
                    });
                });
            });

            return defer.promise;
        }

        return service;
    }]);





