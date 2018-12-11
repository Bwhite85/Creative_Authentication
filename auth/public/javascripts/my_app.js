angular.module('myApp', []).
controller('myController', ['$scope', '$http',
    function($scope, $http) {
        $scope.comments = [];
        $scope.getAll = function() {
            console.log("ran getAll function");
            return $http.get('/comment').success(function(data) {
                console.log(data + "made it to data in getAll");
                angular.copy(data, $scope.comments);
            });
        };
        $scope.getAll();
        $scope.addComment = function(product) {
            $http.post('/pushComment', product).success(function(data) {
                $scope.comments.push(data);
                
            });
            $scope.getAll();
        };
        $scope.delete = function(product) {
            console.log("Deleting Name ID " + comment._id);
            $http.delete('/comment/' + comment._id)
                .success(function(data) {
                    console.log("delete worked");
                });
            $scope.getAll();
        };
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
