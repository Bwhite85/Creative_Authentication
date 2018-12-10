angular.module('myApp', []).
controller('myController', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/user/profile')
            .success(function(data, status, headers, config) {
                console.log("success in my_app");
                console.log(data);
                $scope.user = data;
                $scope.error = "";
            }).
        error(function(data, status, headers, config) {
            console.log("error in my_app");
            $scope.user = {};
            $scope.error = data;
        });
    }
]);