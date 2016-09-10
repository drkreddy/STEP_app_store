StepAppStore.upload.controller("StepAppStore.upload.controller",['$scope', '$http', function ($scope, $http) {
    var isEmpty = function(data){
        return !data;
    };

    var validateFormData = function () {
        var siteLink = $("#siteLink").val();
        var sourceLink = $("#sourceLink").val();
        console.log(siteLink, sourceLink, (isEmpty(siteLink) && isEmpty(sourceLink)));
        if((isEmpty(siteLink) && isEmpty(sourceLink))){
            alert("Please give information, at least about project source code link or project website link");
            return false;
        }
        return true;
    };

    $.get("/personalDetails",function(data){
        $scope.isLoggedIn = data.isLoggedIn;
        $scope.username = data.username;
    });
    $scope.validateFormData = validateFormData;
}]);