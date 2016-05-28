angular.module('starter').factory('Utils', function($ionicLoading,$ionicPopup) {

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
	          msg = "Este correo ya ha sido tomado."; break;
	        case "INVALID_EMAIL":
	          msg = "Email invalido."; break;
          case "NETWORK_ERROR":
	          msg = "Network Error."; break;
	        case "INVALID_PASSWORD":
	          msg = "Contrasena invalida."; break;
	        case "INVALID_USER":
	          msg = "Nombre de usuario invalido."; break;
	      }
	    }
			Utils.alertshow("Error",msg);
	},


  };

	return Utils;

});
