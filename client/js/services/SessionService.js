myApp.service('userSession', function() {
  this.userData = {};
  this.localSigned = false;
  this.googleSigned = false;
  this.facebookSigned = false;

  this.user = function() {
        return this.userData;
  };

  this.setUser = function(userData) {
    this.userData = userData;
  };

  this.getUser = function() {
    return this.userData;
  };
  
  this.isLocalSigned = function(isIt){
    this.localSigned = isIt;
  }
});