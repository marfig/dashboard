var server_url = "http://localhost:51421";

function ExternalLogin(provider) {
    var redirectUri = 'http%3A%2F%2Flocalhost%3A3000%2Foauth-success.html';

    var url = "/api/Account/ExternalLogin?provider=" + provider + "&response_type=token&client_id=self&redirect_uri=" + redirectUri;

    ShowDialogLogin(url);
}

function ShowDialogLogin(externalProviderUrl) {
    var oauthWindow = window.open(server_url + externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
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