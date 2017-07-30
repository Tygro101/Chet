var User = require("../models/user");
module.exports = function(router, passport) {
	
	//Facebook
	
	router.get('/facebook' ,function(req, res, next) {
	    console.log("facebook");
	    passport.authenticate('facebook')(req, res, next);
	});


    router.get('/facebook/callback', function(req, res, next) {
        passport.authenticate('facebook', function(err, user, info) {
            if(!info || !info.message){
                req.session.user = user;
                res.redirect('https://chat-tygro.c9users.io/#!/chat')
                //res.json({user:user, 'function':'onSuccess', url:'https://chat-tygro.c9users.io/#!/profile'});
            }else{
                res.json(info);
            }
        })(req, res, next);
	});	
};