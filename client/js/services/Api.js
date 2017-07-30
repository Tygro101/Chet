myApp.factory('Api', ['$resource',function($resource){
    return  {
        User: $resource('/api/users/:id', {id: '@id'}),
        Signup: $resource('/api/signup/', {username: '@username',password:'@password'}),
    }
}])