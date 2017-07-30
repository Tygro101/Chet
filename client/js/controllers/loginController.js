myApp.controller('loginController',['$scope', '$http', '$location', 'userSession' ,function($scope, $http, $location, userSession){
    $scope.LogIn = function(){
        $scope.signinError = false; 
        $http({
            url: 'https://chat-tygro.c9users.io/api/login',
            method: "GET",
            params: { 'username' : $scope.form.name, 'password' :$scope.form.password }
        })
        .then(function(res) {
            console.log(res.data);
            if(res){
                console.log(res.data);
                switch (res.data.function) {
                    case 'onFailure':
                        $scope.loginMessage = res.data.message;
                        $scope.signinError = true; 
                        break;
                    case 'onSuccess':
                        console.log("onSuccess");
                        userSession.isLocalSigned(true);
                        userSession.setUser(res.data.user);
                        RedirectPage("/profile");
                        return;
                    default:
                        // code
                }
            }
        }, 
        function(res) { // optional
                console.log(res);
        });
    };
    
    
    $scope.FacebookLogIn = function(){
        $scope.signinError = false; 
        window.location.href = "https://chat-tygro.c9users.io/auth/facebook";
        //$http({
        //    url: 'https://chat-tygro.c9users.io/api/auth/facebook',
        //    method: "GET",
        //    headers:{
        //        'Access-Control-Allow-Origin':'https://chat-tygro.c9users.io:8080',
        //        "Origin": 'https://chat-tygro.c9users.io:8080',
        //        "Access-Control-Request-Headers":"x-requested-with"
        //        //'Content-Type':'text/plain'
        //    }
        //})
        //.then(function(res) {
        //    console.log(res.data);
        //    if(res){
        //        console.log(res.data);
        //        switch (res.data.function) {
        //            case 'onFailure':
        //                $scope.loginMessage = res.data.message;
        //                $scope.signinError = true; 
        //                break;
        //            case 'onSuccess':
        //                console.log("onSuccess");
        //                userSession.isLocalSigned(true);
        //                userSession.setUser(res.data.user);
        //                RedirectPage("/profile");
        //                return;
        //            default:
        //                // code
        //        }
        //    }
        //}, 
        //function(res) { // optional
        //        console.log(res);
        //});
        

        
        //var xhr = createCORSRequest('GET', 'https://chat-tygro.c9users.io/api/auth/facebook');
        //if (!xhr) {
        //  throw new Error('CORS not supported');
        //}
        //xhr.setRequestHeader("Access-Control-Allow-Origin", 'https://chat-tygro.c9users.io:8080');
        //xhr.setRequestHeader("Origin", 'https://chat-tygro.c9users.io:8080');
        //xhr.setRequestHeader("Cache-Control", 'no-cache');
        //xhr.setRequestHeader("Pragma","no-cache");
        //xhr.setRequestHeader("Access-Control-Request-Headers","x-requested-with");
        //xhr.send();
    };
        
        
        
        function RedirectPage(url){
            $location.path(url);
        };
        
        
        function createCORSRequest(method, url) {
          var xhr = new XMLHttpRequest();
          if ("withCredentials" in xhr) {
        
            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);
        
          } else if (typeof XDomainRequest != "undefined") {
        
            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        
          } else {
        
            // Otherwise, CORS is not supported by the browser.
            xhr = null;
        
          }
          return xhr;
        }
        
}])




