StepAppStore.default.controller("StepAppStore.default", ['$scope', '$http', function ($scope, $http) {
    $http.get("/personalDetails").then(function (res) {
        $scope.username = res.data.username;
        $scope.isLoggedIn = res.data.isLoggedIn;
    });
}]);