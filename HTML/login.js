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

            FB.api(
                '/282099168624476',
                'GET',
                {"fields": "members.limit(10000)"},
                function (res) {
                    FB.api(
                        '/me',
                        'GET',
                        {"fields": "id,name"},
                        function (response) {

                            var isAMember = isAGroupMember(res.members.data, response);
                            document.getElementById('login_btn').style.visibility = "hidden";
                            if (!isAMember) {
                                document.getElementById('login_status').textContent = 'aap GROUP me nahi ho... How sad :(!!';
                                return;
                            }
                            document.getElementById('login_status').textContent = 'aap GROUP me ho... Not Bad :)!!';
                        }
                    );
                }
            );
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: "email"
    });
};

var isAGroupMember = function (members, currentUser) {
    return members.some(function (member) {
        return member.id === currentUser.id && member.name === currentUser.name;
    })
};