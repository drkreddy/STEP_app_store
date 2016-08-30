'use strict';

angular.module('StepAppStore.entrance')
    .factory('Projects', function($http){
        return {
            all: function(){
                return $http.get("/getAllProjects").then(function(res){
                    return res.data;

                })
            }
        };
    });