function GoogleLogin() {
    var url = "/api/Account/ExternalLogins?returnUrl=http%3A%2F%2Flocalhost%3A51421%2Foauth-success.html&generateState=true";

    $.get(url, function (data) {
        ShowDialogLoginGoogle(data[0].Url)
    });
}

function ShowDialogLoginGoogle(externalProviderUrl) {
    var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
}

function GoogleLoginCallback(fragment) {
    var token = fragment.access_token;
    UserInfo(token);
}

function UserInfo(token) {
    $.ajax({
        url: "/api/Account/UserInfo",
        dataType: 'json',
        method: "get",
        success: function (data) {
            if (data.HasRegistered) {
                console.log("UserInfo. Token: " + token);
            }
            else {
                SignupExternal(token);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('UserInfo. Ha ocurrido un error');
            console.log(xhr.responseText);
        },
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        }
    });
}

function SignupExternal(token) {
    $.ajax({
        url: "/api/Account/RegisterExternal",
        dataType: 'json',
        method: "post",
        success: function (data) {
            console.log("RegisterExternal. Token: " + data.access_token);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('RegisterExternal. Ha ocurrido un error');
            console.log(xhr.responseText);
        },
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        }
    });
}