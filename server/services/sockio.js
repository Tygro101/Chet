var User = require("../models/user");


module.exports = function(io) {
    var users = [];
    io.on('connection', function(socket){
        console.log("a user as connected"); 
        
        var currentUser = {};
        socket.on('disconnect', function(){
            if(currentUser && (currentUser.local || currentUser.facebook)){
                if(currentUser.facebook)
                    console.log(currentUser.facebook.name||currentUser.local.username + " has disconnected");
                users.splice(users.indexOf(currentUser),1);
                io.emit('remove-user', {currentUser})
            }else{
                console.log("user has disconnected");
            }
        })
        
        socket.on('add-user',function(data) {
            io.emit('test', {'test':'test'});
            if(data){
                User.findById(data._id, function(err, user){
                    if(err)
                        console.log(err);
                    if(!users.find(x => x._id ==data._id)){
                        currentUser = user;
                        users.push(user);
                        io.emit('add-user', {user});
                    }
                    else{
                        socket.emit('prompt-username', {message:'username aleardy exist'})
                    }
  	            });
            }
        })
        
        socket.on('request-users', function(){
            socket.emit('receive-users', {users:users});
        })
        
        socket.on('remove-user',function(data) {
            if(data){            
                console.log('user '+data.facebook.name + " leaved the room");
                io.emit('user-removed', data);
                DeleteUserFromList(data);
            }
        })
        
        socket.on('new-message',function(data) {
            io.emit('new-message',data);
        })
        
    })
    
    function DeleteUserFromList(user){
        for (var i = 0, len = users.length; i < len; i++) {
            console.log(users[i]);
            if(users[i]){
                if(users[i]._id == user._id){
                   users.splice(i,1);
                   return true;
                }
                
            }
                
        }
        return false;
    }
}