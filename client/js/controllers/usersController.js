myApp.controller('usersController', ['$scope', 'Api', '$log', '$http', function($scope ,Api, $log, $http){
    $scope.form = {};
    $scope.users = [];
    $scope.pageSize = 5;
    $scope.currentPage = 1;
    
    
    Api.User.query({},function (data, err) {
        $scope.users = data; // retruns a list
    })
    
    $scope.GetPicture = function(id){
        if(id){
            return "https://graph.facebook.com/"+id+"/picture?type=large&redirect=true&width=500&height=500";
        }
        else
        return "https://upload.wikimedia.org/wikipedia/en/6/61/Supermushroom.png";
    }
    
    $scope.addUser = function(){
        
        //Api.User.save($scope.form,function(res){
        //    $scope.form = {};
        //    
        //    if(res){
        //        $scope.users.push(res)
        //    }
        //});
        
        $http({
            url: 'https://chat-tygro.c9users.io/api/signup',
            method: "POST",
            data: { 'username' : $scope.form.name, 'password' :$scope.form.password }
        })
        .then(function(res) {
            console.log({username:res.data.username,password:res.data.password});
            $scope.form = {};
            
            if(res){
                $scope.users.push({username:res.data.username,password:res.data.password})
            }
        }, 
        function(res) { // optional
                console.log(res);
        });
    }
    
    $scope.delete = function(index){
        bootbox.confirm("Are you sure you want to delete this user?", function(answer){
            if(answer == true){
                Api.User.delete({id:$scope.users[index]._id},function(data){
                    $scope.users.splice(index,1);
                });
            }
        })

    }
}]);