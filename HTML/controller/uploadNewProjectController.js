StepAppStore.upload.controller("StepAppStore.upload.controller",['$scope', '$http', function ($scope, $http) {
    $.get("/personalDetails",function(data){
        $scope.isLoggedIn = data.isLoggedIn;
        $scope.username = data.username;
    });
}]);