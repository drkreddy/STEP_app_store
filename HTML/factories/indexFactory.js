'use strict';

angular.module('StepAppStore.entrance')
    .factory('Projects', function ($http) {
        return {
            all: function () {
                return $http.get("/getAllProjects").then(function (res) {
                    return res.data;

                })
            },
            getDetails: function (uuid) {
                return $http.get("/project/" + uuid).then(function (res) {
                    return res.data[0];
                })
            }
        };
    });