/*
 author xiaoyi
 date 2014-11-11
 */



/*-- if no cookie---*/
if (!navigator.cookieEnabled) {
    alert("Your browser does not support cookie, please change your browser settings after use!");
}


/*Random Number*/
function getRndStr() {
    var sRnd;
    sRnd = "-" + Math.random();
    sRnd = sRnd.replace("-0.", "");
    return sRnd;
};


/*getParameterByName*/
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

/*CheckIsLogin*/
function CheckIsLogin() {
    var fbname = $.cookie("fbname");
    if (fbname != "" && typeof (fbname) != "undefined" && fbname != "null") {
        return true;
    }
    return false;
};

/*Re-login*/
var reLogin = function () {
    $.cookie("fbname", null);
    window.location.href = pg_config.fb_redirect_uri;
};

/*set login-*/
function setLoginInfo(result) {

    if (isFBLogin()) {
        $.cookie("userName", result.data.user.userName);
        $.cookie("token", result.data.token);
        loadGameZones();
        //hide login interface
        $('.texNav').css('display', 'none');
        // show gameZone and playerZone
        $('.select--game select').show();
        $('.selectlist').show();
        $('#fade').show();
        //show play button
        $('.cancel').show();
    }
    else {
        $("#gamePlayer").empty();
        var dom2 = '<option>Chọn nhân vật</option>';
        $('#gamePlayer').append(dom2);
        $('#fade').show();
        alert(pg_config.status[result.code]);
    }
};


/* Determine whether the FB login page callback*/
function CheckFBCallback() {
    var FB_CODE = $.trim(getParameterByName("code"));
    if (FB_CODE == "" || isLogin() || !isFBLogin()) {
        return;
    }
    var JSONURL = pg_config.login_url + "?code=" + FB_CODE + "&client_id=" + pg_config.fb_app_id + "&redirect_uri=" + pg_config.fb_redirect_uri + "&r=" + getRndStr();
    $.ajax({
        type: "GET",
        async: true,
        url: JSONURL,
        dataType: "jsonp",
        jsonp: "jsonCallback",
        jsonpCallback: "fbLogin_jsonpCallback",
        success: function (result) {
            if (result.code == 200) {
                $.cookie("isLogin", true);
                setLoginInfo(result);
            }
            else {
                $("#gamePlayer").empty();
                var dom2 = '<option>Chọn nhân vật</option>';
                $('#gamePlayer').append(dom2);
                $('#fade').show();
                alert(pg_config.status[result.code]);
            }
        },
        error: function () {
            alert('fail');
        }
    });
};
$(function () {
    if (!isLogin() && isFBLogin()) {
        $('#bar').show();
    }
    CheckFBCallback();
    CheckIsLogin();
    $('#fbLogin').click(function () {
        if (!isLogin() && isFBLogin()) {
            var loginURL = "";
            LoginURL = "https://www.facebook.com/v2.2/dialog/oauth?client_id=" + pg_config.fb_app_id
                + "&redirect_uri=" + encodeURIComponent(pg_config.fb_redirect_uri) + "&state=" + getRndStr()
                + "&scope=public_profile,email,read_stream";
            window.location.href = LoginURL;
        }
    });
});


