StepAppStore.entrance.controller("StepAppStore.entrance.index", ['$scope', '$http', 'Projects', function ($scope, $http, Projects) {
    $scope.projects = [];
    Projects.all().then(function (projects) {
        projects.forEach(function (project) {
            project.uploadedon = moment(new Date(project.uploadedon).toISOString()).tz('Asia/Kolkata').format('DD-MM-YYYY hh:mma');
            project.projectlogo = project.projectlogo || "images/logos/defaultLogo.jpg";
        });
        $scope.projects = projects;
    });
    $.get("/personalDetails", function (data) {
        $scope.isLoggedIn = data.isLoggedIn;
        $scope.username = data.username;
        $scope.userId = data.userId;
    });
    $scope.getDetails = function (uuid) {
        Projects.getDetails(uuid).then(function (details) {
            details.uploadedon = moment(new Date(details.uploadedon).toISOString()).tz('Asia/Kolkata').format('DD-MM-YYYY hh:mma');
            $scope.details = details;
        });
    }
}]);