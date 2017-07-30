var express  = require("express");
var morgan   = require("morgan");
var cookieParser = require("cookie-parser");
var session  = require("express-session");
var passport = require("passport");
var flash    = require('connect-flash');
var cors = require('cors');
var app      = express();

var http = require("http").Server(app);
var io   = require("socket.io")(http);

var port = process.env.PORT;
var path = require("path");

//DB
var mongoose = require("mongoose");
var dbConfig = require("./server/config/database.js");

mongoose.Promise = Promise;
mongoose.connect(dbConfig.url);

//Routes api

var bodyParser = require("body-parser");

app.use(bodyParser({
  extended: true
}));

//app.use(morgan('dev'));
app.use(cors());

app.use(cookieParser());
app.use(session({secret:"anystringoftext", 
                 saveUninitialized:true,
                 resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session

var api = express.Router();
var auth = express.Router();
require("./server/config/passport")(passport);
require("./server/routes/api")(api, passport);
require("./server/routes/auth")(auth, passport);
require("./server/routes/routes")(app, passport);
app.use("/api",api); 
app.use("/auth",auth); 


require("./server/services/sockio")(io);



app.set('view engien', 'ejs');
app.set('views', path.resolve(__dirname,'client','views'));

app.use(express.static(path.resolve(__dirname,'client')));



http.listen(port, function(err){
    if(err)
        console.log("server error");
    console.log("server are runing on port : " + port);
})
