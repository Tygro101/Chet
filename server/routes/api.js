var User = require("../models/user");
module.exports = function(router, passport) {
    
    
    router.post('/users' ,function(req ,res){
        if(req.body && req.body.name && req.body.password){
            var user = new User();
            user.local.username = req.body.name;
            user.save(function(err, data){
               if(err){
                   throw err;
               }
              res.json(user);
            });
        }else{
            res.json({error:true});
        }
    });

    router.get('/users' ,function(req ,res){
        User.find({}, function(err, data){
            res.json(data);
        });
    });

     router.get('/users' ,function(req ,res){
        User.find({}, function(err, data){
            res.json(data);
        });
    });

    router.delete('/users' ,function(req ,res){
        User.remove({}, function(err){
            res.json({result: err ? 'error':'ok'});
        });
    });




    router.post('/users/:id' ,function(req ,res){
        User.findOne({_id: req.params.id}, function(err, data){
            var user = data;
            console.log(user);
            user.username = req.body.name;
            user.save(function(err1, data){
               if(err1){
                   throw err1;
               }
              res.json(user);

            });
        });
    });




	///// OAUT

	router.post('/signup', function(req, res , next) {
        passport.authenticate('local-signup', function(err, user, info) {
            console.log(user);
            if(!info || !info.message){
                res.json({user:user, 'function':'onSuccess', url:'https://chat-tygro.c9users.io/#!/profile'});
            }else{
                console.log(info);
                res.json(info);
            }
         })(req, res, next);
    });


	router.get('/profile', function(req, res) {
	    res.json({'function':'redirect', 'url':'/userapi'});
	});		

	router.get('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {

            if(!info || !info.message){
                res.json({user:user, 'function':'onSuccess', url:'https://chat-tygro.c9users.io/#!/chat'});
            }else{
                console.log(info);
                res.json(info);
            }
         })(req, res, next);
	});	

	
	router.get('/session', function(req, res, next) {
	    res.json(req.session);
	});	
	
	
	//function isLoggedIn(req, res, next) {
	//    if(req.isAuthenticated()){
	//    	return next();
	//    }
    //	res.redirect('/login');
    //}
	
}