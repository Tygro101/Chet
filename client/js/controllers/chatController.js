myApp.controller('chatController',['$scope', '$http', '$location', 'Socket' ,function($scope, $http, $location, Socket){
    
    Socket.connect();
    $scope.users = [];
    $scope.messages = [];
    $scope.date = new Date();
    
    
    Socket.emit('request-users');
    $scope.GetPicture = function(id){
        if(id){
            return "https://graph.facebook.com/"+id+"/picture?type=large&redirect=true&width=200&height=200";
        }
        else
            return "https://upload.wikimedia.org/wikipedia/en/6/61/Supermushroom.png";
    }
    
    $scope.SendMessage = function(message){
        SendMessageToServer(message);
    }
    
    $scope.EnterPressed = function(message, event){
        if(event.which === 13)
            SendMessageToServer(message);
    }
    
    $scope.isMe = function(user){
        if(!user)
            return false;
        if(user._id === $scope.currentUser._id)
            return true;
        return false;
    }
    
    $http.get("https://chat-tygro.c9users.io/api/session")
        .then(function(res){
            if(res.data.user && res.data.user.facebook && res.data.user.facebook.id){
                $scope.currentUser = res.data.user;
                ManageChatClient();
            }
            else{
                $location.path('/login');
            }
    });
        
        
    function ManageChatClient(){
        Socket.emit('add-user',$scope.currentUser);
    };
        // on functions
    Socket.on('receive-users', function(data){
        $scope.users = data.users;
    });

    Socket.on('add-user', function(data){
        var ele = $scope.users.find(x => x._id ==data.user._id);
        if(!$scope.users.find(x => x._id ==data.user._id)){
            $scope.users.push(data.user);
            //$scope.messages.push({username: user, message:'has enter the channel'});
        }
    })
    
    Socket.on('test', function(user){
         console.log('test')
    });
    
    Socket.on('user-removed', function(user){
        DeleteUserFromList(user);
    })
    
     Socket.on('new-message', function(msg){
        $scope.messages.push(msg)
    })
       
    
    $scope.$on('$locationChangeStart', function(event){
        Socket.emit('remove-user', $scope.currentUser);
        Socket.disconnect(true);
    });
    
    
    function SendMessageToServer(msg){
        var msg = {'text':msg, 'user':$scope.currentUser};
        Socket.emit('new-message',msg);
        $scope.testMsg = null;
    }
    
    
    
    function DeleteUserFromList(user){
        for (var i = 0, len = $scope.users.length; i < len; i++) {
            console.log($scope.users[i]);
            if($scope.users[i]){
                if($scope.users[i]._id == user._id){
                   $scope.users.splice(i,1);
                   return true;
                }
                
            }
                
        }
        return false;
    }
    
    

}]);