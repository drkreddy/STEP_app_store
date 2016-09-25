window.onload = function () {
    $("#login-message").hide();
};

var parseQueryString = function (qs) {
    var result = {};
    var pairs = qs.split('&');
    pairs.forEach(function (pair) {
        var data = pair.split('=');
        var key = data[0];
        result[key] = decodeURIComponent(data[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
};

var login = function () {
    FB.init({
        appId: '188475074847404',
        status: true,
        xfbml: true,
        version: 'v2.7'
    });

    FB.login(function (response) {
        if (response.authResponse) {
            $('#login_btn').hide();
            $('#myModalLabel').hide();
            $("#login-message").show();
            console.log('Welcome!  Fetching your information.... ');
            var qs = $(location).attr("search").slice(1);
            var url = "/login";
            if (parseQueryString(qs).action)
                url += "?action=" + parseQueryString(qs).action;
            jQuery.post(url, {
                accessToken: response.authResponse.accessToken,
                userId: response.authResponse.userID
            }, function (response) {
                if (response.redirectTo)
                    window.location = response.redirectTo;
                else window.alert(response.errorMessage);
            });
        } else {
            window.alert("You are not authorize to access this page. Please try again later");
        }
    }, {
        scope: "email"
    });
};
