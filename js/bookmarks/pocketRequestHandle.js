$(document).ready(function(){
    // Handle callback from Pocket
    var requestToken = (getCookie("code"));
    if (!requestToken)
    {
        // User might have disabled cookies and we cannot access token, so show error message
        return;
    }

    // Show a loading screen at this point
    var loader =
    '<span id="loadingText">\
    Loading your bookmarks...\
    </span>\
    <svg width="70" height="20">\
    <rect width="20" height="20" x="0" y="0" rx="3" ry="3">\
    <animate attributeName="width" values="0;20;20;20;0" dur="1000ms" repeatCount="indefinite"/>\
    <animate attributeName="height" values="0;20;20;20;0" dur="1000ms" repeatCount="indefinite"/>\
    <animate attributeName="x" values="10;0;0;0;10" dur="1000ms" repeatCount="indefinite"/>\
    <animate attributeName="y" values="10;0;0;0;10" dur="1000ms" repeatCount="indefinite"/>\
    </rect>\
    <rect width="20" height="20" x="25" y="0" rx="3" ry="3">\
    <animate attributeName="width" values="0;20;20;20;0" begin="200ms" dur="1000ms" repeatCount="indefinite"/>\
    <animate attributeName="height" values="0;20;20;20;0" begin="200ms" dur="1000ms" repeatCount="indefinite"/>\
    <animate attributeName="x" values="35;25;25;25;35" begin="200ms" dur="1000ms" repeatCount="indefinite"/>\
    <animate attributeName="y" values="10;0;0;0;10" begin="200ms" dur="1000ms" repeatCount="indefinite"/>\
    </rect>\
    <rect width="20" height="20" x="50" y="0" rx="3" ry="3">\
    <animate attributeName="width" values="0;20;20;20;0" begin="400ms" dur="1000ms" repeatCount="indefinite"/>\
    <animate attributeName="height" values="0;20;20;20;0" begin="400ms" dur="1000ms" repeatCount="indefinite"/>\
    <animate attributeName="x" values="60;50;50;50;60" begin="400ms" dur="1000ms" repeatCount="indefinite"/>\
    <animate attributeName="y" values="10;0;0;0;10" begin="400ms" dur="1000ms" repeatCount="indefinite"/>\
    </rect>\
    </svg>';

    alertify.genericDialog || alertify.dialog('genericDialog',function(){
        return {
            main:function(content){
                this.setContent(content);
            },
            setup:function(){
                return {
                    focus:{
                        element:function(){
                            return this.elements.body.querySelector(this.get('selector'));
                        },
                        select:true
                    },
                    options:{
                        basic:true,
                        maximizable:false,
                        resizable:false,
                        padding:false
                    }
                };
            },
            settings:{
                selector:undefined
            }
        };
    });

    alertify.genericDialog (loader).set('closable',false);

    // TODO: save consumer keys to a server and retrieve them from there
    var consKey = "36904-a72c7f1c0b93f3c51e4ceb39";
    var code = getCookie("code");

    // Form post request to pocket
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = processStateChange;

    // Now form headers
    xmlhttp.open("POST","https://getpocket.com/v3/oauth/authorize",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    xmlhttp.setRequestHeader("X-Accept", "application/json");
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");

    var parameters = "consumer_key="+consKey+"&code="+code;
    xmlhttp.send(parameters);
})


/**
 *  CallBack when request state changes.
 */
function processStateChange ()
{
    // On success
    if (this.readyState == 4)
    {
        if (this.status == 200)
        {
            var data = this.responseText;
            var jsonParse = JSON.parse(data);
            var accessToken = jsonParse["access_token"];
            var username = jsonParse["username"];

            // Now form request for the bloody bookmarks
            var consKey = "36904-a72c7f1c0b93f3c51e4ceb39";
            retrieveBookmarks(consKey,accessToken);
        }

        // Missing consumer key or code
        else if (this.status == 400)
        {
            alertifyError ('If you are getting this message, please contact our dev team right away !');
        }

        // User rejected code
        else if (this.status == 403)
        {
            if (this.getResponseHeader("X-Error-Code") == 158)
                alertifyError('It seems you refused to authorize our app to retrieve your bookmarks :(');
            else alertifyError("Sorry, but we couldn't import your bookmarks.<br>Please try again later.")
        }
        // Server issues
        else if (this.status/10 == 50)
        {
            alertifyError('Sorry, but Pocket is having trouble with their dang-daddly-diddly serverinos.')
        }
    }
}


/**
 * Extracts string from cookie on a key=value pair basis.
 *
 * @param name key
 * @returns {*} value
 */
function getCookie(name)
{
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}


/**
 * Triggers an alertify popup for error messages.
 *
 * @param message String to be shown in alertify message.
 */
function alertifyError (message)
{
    alertify.closeAll();
    alertify.alert()
        .setting({
            'closable':false,
            'message': message,
            'onok': function()
            {
                // Close current window
                window.close();
            }
        }).show();
}

function retrieveBookmarks (consumer_key, access_token)
{
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = stateChangeRetrieve;

    // Now form headers
    xmlhttp.open("POST","https://getpocket.com/v3/get",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    xmlhttp.setRequestHeader("X-Accept", "application/json");

    var retrieveNumber = 10000;
    var parameters =
        "consumer_key="+consumer_key+
        "&access_token="+access_token+
        "&count="+retrieveNumber;
    xmlhttp.send(parameters);
}

/**
 *  More redundant code to process state changes for retrieval operations.
 *  I really have to modularize and reformat this code >_<.
 */
function stateChangeRetrieve ()
{
    // On success
    if (this.readyState == 4)
    {
        if (this.status == 200)
        {
            var data = this.responseText;
            var jsonParse = JSON.parse(data);

            var bookmarkList = jsonParse.list;

            // Save to local storage and it will be processed in main window
            // In case item was stuck there, unstuck it
            localStorage.removeItem('imported_bookmarks');

            localStorage.setItem ('imported_bookmarks',JSON.stringify(bookmarkList));

            alertifyError('Successfully imported bookmarks !');
        }

        // Missing consumer key or code
        else if (this.status == 400)
        {
            alertifyError ('If you are getting this message, please contact our dev team right away !');
        }

        // User rejected code
        else if (this.status == 403)
        {
            if (this.getResponseHeader("X-Error-Code") == 158)
                alertifyError('It seems you refused to authorize our app to retrieve your bookmarks :(');
            // Request token expired
            else alertifyError("Sorry, but we couldn't import your bookmarks.<br>Please try again later.")
        }
        // Server issues
        else if (this.status/10 == 50)
        {
            alertifyError('Sorry, but Pocket is having trouble with their dang-daddly-diddly serverinos.')
        }
    }
}
