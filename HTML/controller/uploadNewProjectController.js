StepAppStore.upload.controller("StepAppStore.upload.controller",['$scope', '$http','$window', 'formValidationService', function ($scope, $http, $window, formValidationService) {
    $.get("/personalDetails",function(data){
        $scope.isLoggedIn = data.isLoggedIn;
        $scope.username = data.username;
    });
    $window.validateFormData = formValidationService.validateFormData;
}]);