var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var configAuth = require("./authConfig");
var User = require("../models/user");

module.exports = function(passport){
  
  passport.serializeUser(function(user, done){
    //console.log("serializeUser");
  	done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done){
    //console.log("deserializeUser");
  	User.findById(id, function(err, user){
  		done(err, user);
  	});
  });


  passport.use('local-signup', new LocalStrategy({
  	usernameField: 'username',
  	passwordField: 'password',
  	passReqToCallback: true
  },
  function(req, username, password, done){
  	process.nextTick(function(){
  		User.findOne({'username': username}, function(err, user){
  			if(err)
  				return done(err);
  			if(user){
  			  if(user.validPassword(password))
  				  return done(null, true, {'function':'onFailure', 'message':'Username already exist'});
  			} 
  			else {
  				var newUser = new User();
  				newUser.local.username = username;
  				newUser.local.password = newUser.generateHash(password);
  				console.log(newUser);
  				newUser.save(function(err){
  					if(err)
  						throw err;
  				  return done(null, newUser, {'function':'onSuccess',id:newUser.id, url:'https://chat-tygro.c9users.io/#!/profile'});
  				});
  			}
  		})
  	});
  }));
  
  
  
  passport.use('local-login', new LocalStrategy({
  	usernameField: 'username',
  	passwordField: 'password',
  	passReqToCallback: true
  },
  function(req, username, password, done){
  	process.nextTick(function(){
  		User.findOne({'local.username': username}, function(err, user){
  			if(err)
  				return done(err);
  			if(user){
  				return done(null, user, {'function':'onSuccess',id:user.id, url:'https://chat-tygro.c9users.io/#!/chat'});
  			} 
  			else {
  			  return done(null, true, {'function':'onFailure', 'message':'Wrong Username or password'});
  			}
  		})
  	});
  }));
  
  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    process.nextTick(function(){
       User.findOne({ 'facebook.id': profile.id }, function (err, user) {
          if(err){
            return cb(err);
          }
          if(user){
            return cb(null, user);
          }
          else{
            //console.log(profile);
            var newUser = new User();
            newUser.facebook.id = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.name = profile.displayName;
            //return cb(null, newUser);
            newUser.save(function(err){
              if(err)
                throw err;
              return cb(null, newUser);
            })
          }
      });
    })}
  ));
  
  
} 
