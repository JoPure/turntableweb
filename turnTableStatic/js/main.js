/**
 * Created by jo.chan on 15-7-23.
 */


/*
 *global variable
 */


var appKey = '1c0de4a5-b7c5-4d6a-8c5a-b80066449df3';       //appkey
var actId = 1439906829173;
var awardCode;                                              //winning code
var awardName;                                              //winning gift
var awardImg;                                               //winning picture

/*
 *Moving the mouse removed from the event
 */
function check() {
    with (event.srcElement)   //current event，
        if (value == defaultValue) value = ""  //If the current event is the default value is empty
}
function res() {
    with (event.srcElement)
        if (value == "") value = defaultValue  //current event is empty, then show the beginning of the default values
}


/* rotateFunc (Three parameters: awards, Angle, and winning )
 * getGift function-->rotateFunc
 * callback :show winning box
 * （The winning content and activation code ）
 * */
var timeOut = function () {
    $("#goBtn").rotate({
        angle: 0,
        duration: 10000,
        animateTo: 2160,
        callback: function () {
            alert('Network timeout ')
        }
    });
};

var rotateFunc = function (awards, angle, text) {
    $('#goBtn').stopRotate();
    $("#goBtn").rotate({
        angle: 0,
        //rotating times
        duration: 5000,
        animateTo: angle + 3600,
        callback: function () {
            $("#btn_run").attr('disabled', false).css("cursor", "pointer");
            $('.container').addClass('fade');
            $('.alert-window').fadeToggle();
            showResult();
        }
    });
};


/*
 *Binding is the login box click on the switch, two li, switch to each other
 */


$("#normalLogin").click('click', function () {
    if (isLogin() && isFBLogin()) {
        alert(" Xin lỗi, bạn đã đăng nhập bằng tài khoản Facebook,mời bạn thoát ra đã;");
        return;
    }
    $("#fbDiv").hide();
    $("#normalDiv").show();
    $(".selectlist").hide();

});

$("#fbLogin").bind('click', function () {
    if (isLogin() && !isFBLogin()) {
        alert(" Xin lỗi, bạn đã đăng nhập bằng tài khoản phổ thông, mời bạn thoát ra đã;");
        return;
    }
    $.cookie("login_fb", true);
    $("#normalDiv").hide();
    $("#fbDiv").show();
});

/**
 * Draw method, draw number greater than 0 or shall have the right to draw
 */

function getGift() {
    var canCount = parseInt($.cookie("canCount"));
    if (canCount > 0) {
        var url = pg_config.api_url + "user/draw?token=" + $.cookie("token") + "&actId=" + actId;
        var ajax = $.ajax({
            type: "GET",
            dataType: "jsonp",
            jsonp: "jsonCallback",
            async: true,
            url: url,
            beforeSend: loading,// before  ajax loading function until the ajax is call success
            success: function (result) {
                if (result.code == 200) {
                    awardCode = result.data.code;                   //activation code
                    awardName = result.data.name;                   //activation gift
                    awardImg = result.data.image;                   //activation image
                    rotateFunc(1, result.data.angle, awardCode);    // rotateFunc method
                    canCount--;
                    $.cookie("canCount", canCount);
                    showCount();
                    Response;

                }
                else if (result.code == 403) {                      //login failed
                    $('#bar').show();                           // show login interface
                }
                else {
                    alert(pg_config.status[result.code]);
                }
            },
            error: function (err) {
                timeOut();
            }
        });
    }
    else {
        alert('Hi bạn, số lần quay của bạn đã hết rồi');                                          //Lottery number out
        $("#btn_run").attr('disabled', false).css("cursor", "pointer");
    }
}


/**
 * before loading
 */
//
function loading() {
    $('.cancel img').show();
    $('#Lottery').hide();
    $('#return').hide();
}
function Response() {
    $('.cancel img').hide();
    $('#Lottery').show();
    $('#return').show();

}
/**
 * Submit the form, the ajax callback interface
 * Log in successfully loaded the game area
 */
$(".confirm").live('click', function () {
    var userName = $('.username').val();
    var passWord = md5($('.password').val());
    var url = pg_config.api_url + "user/login?userName=" + userName + "&password=" + passWord;
    if (userName !== '' || passWord !== '') {
        var ajax = $.ajax({
            type: "GET",
            dataType: "jsonp",
            jsonp: "jsonCallback",
            async: true,
            url: url,
            beforeSend: loading,
            success: function (result) {
                if (result.code == 200) {
                    $.cookie("userName", userName);
                    $.cookie("token", result.data.token);                           //sessionID
                    loadGameZones();                                                //loady playGamezone
                    $('.texNav').css('display', 'none');                             //hide login interface
                    $('.select--game select').show();                               // show GameZone and playerZone
                    $('.selectlist').show();
                    $('.cancel').show();
                    Response();
                }
                else if (result.code == 403) {
                    $('#bar').show();

                }
                else {
                    alert(pg_config.status[result.code]);                     //login fail ,alert result message
                }
            },
            error: function (err) {
                alert(JSON.stringify(err));
            }
        });
    }
    else {

        alert('plase inter your message');
    }
});

/*
 *load gameZone
 *
 * */


function loadGameZones() {
    var gameZone = $("#gameZone").val();
    var url = pg_config.api_url + "conf/zones?appKey=" + appKey + "&token=" + $.cookie("token");
    var ajax = $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonp: "jsonCallback",
        async: true,
        url: url,
        beforeSend: loading,
        success: function (result) {
            if (result.code == 200) {
                var list = result.data;
                recentGameZones(list);
                loadPlayer();
            }
            else if (result.code == 403) {
                $('#bar').show();
                $('#gameZone').empty();
                var dom = ' <option>Chọn Server</option>';
                $('#gameZone').append(dom);
            }
            else {
                $('#gameZone').empty();
                var dom = ' <option>Chọn Server</option>';
                $('#gameZone').append(dom);
                alert(pg_config.status[result.code]);
            }
            Response();
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });

}

/*
 * -selectList
 * */
var recentGameZones = function (list) {
    var dom = null, gameZone = null;
    var savedZoneId = parseInt($.cookie("gameZoneId"));
//    $("#gameZone").empty();
    for (var i = 0; i < list.length; i++) {
        gameZone = list[i];
        if (savedZoneId == gameZone.zoneId) {
            dom += '<option selected="true" value="' + gameZone.zoneId + '">' + gameZone.localName + '</option>';
        } else {
            dom += '<option value="' + gameZone.zoneId + '">' + gameZone.localName + '</option>';
        }
    }
    $("#gameZone").append(dom);
};


/*
 *load gamePlayer
 * */
$("#gameZone").change(function () {                 //gameZone load player
    if ($('#gameZone').val()) {
        $.cookie("gameZoneId", $('#gameZone').val());
    }
    loadPlayer();
});

function loadPlayer() {
    var zoneID = $("#gameZone").val();                  //get gameZone.value just can
    var url = pg_config.api_url + "user/players?appKey=1c0de4a5-b7c5-4d6a-8c5a-b80066449df3&zoneId=" + zoneID + "&token=" + $.cookie("token");
    var ajax = $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonp: "jsonCallback",
        async: true,
        url: url,
        beforeSend: loading,
        success: function (result) {
            if (result.code == 200) {
                var list = result.data;
                playerList(list);                               //get the player list
                lotteryCount();                                 //show the count what user can draw times
            }
            else {
                $("#gamePlayer").empty();
                var dom2 = '<option>Chọn nhân vật</option>';
                $('#gamePlayer').append(dom2);
            }
            Response();
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });
}

/*
 *gamelayerList
 *
 * */
var playerList = function (list) {
    var dom = '', gamePlayer = null;
    $("#gamePlayer").empty();
    for (var i = 0; i < list.length; i++) {
        gamePlayer = list[i];
        dom = dom + '<option value="' + gamePlayer.playerId + '">' + gamePlayer.playerName + '</option>';
    }
    $("#gamePlayer").append(dom);
}

/*
 *btn_run rotate and click function
 *
 * */

$('#btn_run').rotate({
    bind: {
        click: function () {
            if (isLogin()) {
                $("#btn_run").attr('disabled', true).css("cursor", "pointer");
                showLogin();
                getGift();
            }
            else {
                $('.container').addClass('fade');
                $("#bar").css('display', 'block');
            }
        }
    }
});


/**
 * load
 */

function lotteryCount() {
    //load playerID，is Game characters
    var playerID = $("#gamePlayer").val();
    var url = pg_config.api_url + "user/draw/count?token=" + $.cookie("token") + "&appKey=" + appKey + "&actId=" + actId + "&playerId=" + playerID;
    var ajax = $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonp: "jsonCallback",
        async: true,
        url: url,
        beforeSend: loading,
        success: function (result) {
            if (result.code == 200) {
                //cancount
                $.cookie("isLogin", true);
                $.cookie("canCount", result.data.lotteryCount);
            }
            else if (result.code == 102) {
                $.cookie("isLogin", true);
                $.cookie("canCount", 0);
                alert(pg_config.status[result.code]);
            }
            else {
                alert(pg_config.status[result.code]);
            }
            Response;
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });
}

/*
 *  After log in successfully, the game role load (click the play button)
 * */
$("#Lottery").live('click', function () {
        if (isLogin()) {
            // TODO do something after login
            if ($('#gameZone').val() > 0 && $('#gamePlayer').val() > 0) {
                $.cookie("zoneName", $('#gameZone option:checked').text());
                $.cookie("playerName", $("#gamePlayer option:checked").text());
                showLogin();
            }
            else {
                alert('Chưa có nhân vật trong server này, mau vào game để tạo nhé!');
            }
        } else {
            // TODO else
            alert('Xin chọn Server');
        }
    }
)
;

/**
 * After logging in, shut down is the user's information through the floating window is displayed, login to hide
 */

$('.close_').bind({
    click: function () {
        if (isLogin()) {
            $.cookie("zoneName", $('#gameZone option:checked').text());
            $.cookie("playerName", $("#gamePlayer option:checked").text());
            showLogin();
        } else {
            $('.container').removeClass('fade');
            $("#bar").hide();
        }
    }
});

/*
 * show user information
 * */

function showLogin() {
    $("#bar").css('display', 'none');
    $(".showlogin").css('display', 'block');
    $(".fade").hide();
    //save the zoneName and playerName when user refresh the page
    var zoneName = $.cookie("zoneName");
    var playerName = $.cookie("playerName");
    var dom = null;
    dom = '<p class="seemessage">' + $.cookie("userName") + '</p>' + '<p class="seemessage">' + zoneName + '</p>' + '<p class="seemessage_e">' + playerName + '</p>';
    $(".showMessage").empty();
    //add dom to showMessage div
    $(".showMessage").append(dom);
    //load
    showCount();
    if (!zoneName || !playerName) {
        alert('sorry');
    }
}


function showCount() {
    $(".showCount").empty();
    var showCount = null;
    showCount = '<p class="seemessage">' + $.cookie("canCount") + '</p>';
    //append dom
    $(".showCount").append(showCount);
}


/**
 *show the award message
 */
function showResult() {
    $(".alert-window").empty();
    var dom = null;
    var dom = '<div class="result">' + '<div class="img">' + '<img src=' + awardImg + '>' + '</div>' +
        '<p class="p">' + awardName + '</p>' + '</div>' + '<div class="show">' + awardCode + '</div>'
        + '<button class="button" id="copy">' + "Chép" + '</button>' + '<div class="shutdown">' + '</div>';
    $(".alert-window").append(dom);
    close();
    copy();
}

/**
 *close the award message div
 */
function close() {
    $(".shutdown").tap(function () {
        $(".alert-window").hide();
        $('.container').addClass('fade');
    });
}


/**
 *
 *logout function
 */
function init() {
    //empty
    $(".showMessage").empty();
    $(".showCount").empty();
    //show login interface
    $("#bar").show();
    $('.texNav').show();
    $('.confirm').show();
    //close the div what is user information
    $(".showlogin").hide();
    $.cookie("zoneName", null);
    $.cookie("PlayerName", null);
    $('.selectlist').hide();
    $('.cancel').hide();
    $('.container').addClass('fade');
    clearCookie();
}


/**
 * logout button
 */
$('#clear').click(function () {
    var url = pg_config.api_url + "user/logout?token=" + $.cookie("token");
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        jsonp: "jsonCallback",
        async: true,
        url: url,
        success: function (result) {
            if (result.code == 200) {
                //logout function
                init();
            }
            else if (result.code == 102) {
                alert(pg_config.status[result.code]);
            }
            else {
                alert(pg_config.status[result.code]);
            }
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });
});


/**
 * return login interface
 */
$('#return').click(function () {
    init();
})


/**
 *login and save the cookies，
 * @returns {boolean}
 */
function isLogin() {
    var isLogin = $.cookie("isLogin");
    if ((typeof isLogin == 'string' && isLogin == "true") || (typeof isLogin == 'boolean' && isLogin)) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * login and save the fb_cookies，
 * @returns {boolean}
 */
function isFBLogin() {
    var login_fb = $.cookie("login_fb");
    if ((typeof login_fb == 'string' && login_fb == "true") || (typeof login_fb == 'boolean' && login_fb)) {
        return true;
    }
    return false;
}


/**
 *Need to convert a string to number that canCount be  int type
 *(Lottery number decreasing )
 * @returns {number}
 */
function getCanCount() {
    var canCount = parseInt($.cookie("canCount"));
    return canCount;
}

/**
 * delete cookies
 *
 */
function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}

/**
 *A key to copy
 */
function copy() {
    $("#copy").zclip({
        path: 'http://static.t.changicvn.com/turnTableStatic/js/ZeroClipboard_9f4401c.swf',
        copy: function () {
            return $(".show").text();
        },
        afterCopy: function () {
            alert("Chép thành công ! Mau vào game để lấy quà nhá ~!");
        }
    });
}
