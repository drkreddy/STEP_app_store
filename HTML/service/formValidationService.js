'use strict';

var isEmpty = function (data) {
    return !data;
};

var validateFormData = function () {
    var siteLink = $("#siteLink").val();
    var sourceLink = $("#sourceLink").val();
    if ((isEmpty(siteLink) && isEmpty(sourceLink))) {
        alert("Please give information, at least about project source code link or project website link");
        return false;
    }
    var logo = $('#logo')[0].files[0];
    if (logo && logo.size > 307200) {
        alert("File size should be less than 300KB");
        return false;

    }
    return true;
};
