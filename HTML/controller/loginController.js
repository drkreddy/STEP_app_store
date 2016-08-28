window.onload = function(){
    $("#login-message").hide();
};
var waiting = function(){
    var count = 0;
    return function(){
        $('#dot_'+count).removeClass("selected_waiting_dot");
        count = (count+1)%3;
        $('#dot_'+count).addClass("selected_waiting_dot");
    };
}();

var login = function () {
    FB.init({
        appId: '188475074847404',
        status: true,
        xfbml: true,
        version: 'v2.7'
    });

    FB.login(function (response) {
        if (response.authResponse) {

            setInterval(waiting, 500);
            $('#container').hide();
            $("#login-message").show();
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
