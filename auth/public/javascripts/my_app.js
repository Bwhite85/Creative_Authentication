angular.module('myApp', []).
controller('myController', ['$scope', '$http',
    function($scope, $http) {
        $scope.comments = [];
        $scope.getAll = function() {
            $http.get('/comment') {
                .success(function(data, status, headers, config) {
                    console.log("success in my_app");
                    console.log(data);
                    $scope.user = data;
                    $scope.error = "";
                }),
                error(function(data, status, headers, config) {
                    console.log("error in my_app");
                    $scope.user = {};
                    $scope.error = data;
                });
            }
            console.log("ran getAll function");
            return $http.get('/comment').success(function(data) {
                angular.copy(data, $scope.comments);
            });
        };
        $scope.getAll();
        $scope.create = function(product) {
            $http.post('/pushComment', product).success(function(data) {
                $scope.comments.push(data);
                console.log(data + "in the create part of add comment, see the data pushed to array");
            });
            $scope.getAll();
        };
        $scope.addComment = function() {
            console.log("in addComment function");
            var newObj = { comment: $scope.formContentComment };
            $scope.create(newObj);
            $scope.formContentComment = '';
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
            }),
        error(function(data, status, headers, config) {
            console.log("error in my_app");
            $scope.user = {};
            $scope.error = data;
        });
    }
]);
