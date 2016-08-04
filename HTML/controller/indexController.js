website.controller("index",function($scope,$http){
    $http.get("/loginAs").then(function (res) {
        $scope.loginName = res.data.name
    })
});