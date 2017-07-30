var User = require("../models/user");
module.exports = function(app, passport){
	
	app.get('/', function(req, res){
		res.render('index.ejs');
	});
	
	app.get('/login', function(req, res){
		res.redirect('/#!/login');
	});
	app.get('/chat', function(req, res){
		res.redirect('/#!/chat');
	});
	
	//app.get('/*', function(req, res) {
	//    res.redirect('/');
	//})
	//
	//app.get('*',function(req, res, next) {
	//    console.log("test");
	//    req.headers["Access-Control-Allow-Origin"] = "*";
	//    req.headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, OPTIONS, DELETE";
	//    req.headers["Access-Control-Allow-Headers"] = "x-requested-with, content-type";
	//    
    //    res.setHeader("Access-Control-Allow-Origin", "*");
    //    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    //    res.setHeader("Access-Control-Max-Age", "3600");
    //    res.setHeader("Access-Control-Allow-Headers", "x-requested-with, content-type");
    //    res.setHeader("Origin",'https://chat-tygro.c9users.io:8080');
	//    next();
	//})
	
}