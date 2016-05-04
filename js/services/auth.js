angular.module('starter').factory('Auth', function(FURL, $firebaseAuth, $firebaseArray, $firebaseObject, Utils) {

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
			  //console.log("added record with id " + id);
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
          return true;
        })
        .then(function(data) {
          // store user data in Firebase after creating account
					//console.log("datos del usuario:" + JSON.stringify(data));
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
