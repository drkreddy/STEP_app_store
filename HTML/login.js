var login = function () {
    FB.init({
        appId: '188475074847404',
        status: true,
        xfbml: true,
        version: 'v2.7'
    });

    FB.login(function (response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            jQuery.post("/login", {
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
