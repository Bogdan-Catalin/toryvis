function importBookmarksFromPocket ()
{
    // Obtain a request token for OAuth
    var consKey = "36904-a72c7f1c0b93f3c51e4ceb39";
    pocketRequestTokenPhase (consKey);
}

/**
 *
 * @param consumerKey Consumer key for Pocket app.
 */
function pocketRequestTokenPhase (consumerKey)
{
    // Form post request to pocket
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5, although this will only be used on chrome
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Callback to page app
    // App page
    // var callbackUri = 'http://getpocket.com/developer/app/36904/a72c7f1c0b93f3c51e4ceb39';

    // Extension
    var callbackUrl = window.location.origin+"/pocket_request.html";

    // Process state of request
    xmlhttp.onreadystatechange = function() {
        // Success
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // Extract token from string
            var token = xmlhttp.responseText.slice('5');

            // Put token in a cookie to be retrieved in the callback
            document.cookie="code="+token;

            // New window method
            var pocketWindowUrl = 'https://getpocket.com/auth/authorize?request_token='+token+'&redirect_uri='+callbackUrl;
            var win = window.open(pocketWindowUrl, "_blank", "width=600, height=800");
            //var win = window.open(pocketWindowUrl,  "_blank");
            win.focus();
        }

        else if (xmlhttp.readyState == 4 && xmlhttp.status == 400)
        {
            // 2 possible errors. Will be treated the same way Invalid Consumer key is
            alertify.closeAll();
            alertify.alert('If you got this error message, please contact the developers team of Toryvis !');
        }
        // Invalid consumer key
        else if (xmlhttp.readyState == 4 && xmlhttp.status == 403)
        {
            alertify.closeAll();
            alertify.alert('If you got this error message, please contact the developers team of Toryvis !');
        }

        // Server side issues
        else if (xmlhttp.readyState == 4 && xmlhttp.status/10==50)
        {
            alertify.closeAll();
            alertify.alert('Pocket is having some server issues.<br>Please try again later !');
        }

    }

    xmlhttp.open("POST","https://getpocket.com/v3/oauth/request/",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
    xmlhttp.setRequestHeader("X-Accept", "application/x-www-form-urlencoded");
    xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    var parameters = "consumer_key="+consumerKey+"&redirect_uri="+callbackUrl;

    xmlhttp.send(parameters);
}

function alertifyPocketPopup (requestToken)
{
    // Popup dialog for user to input username and password
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

    var loginHtml = '<iframe id="pocketIframe" src="https://getpocket.com/auth/authorize?request_token='+requestToken+'&redirect_uri=pocketapp1234:authorizationFinished" >';
    alertify.genericDialog (loginHtml).set('resizable',true).resizeTo(500, 500);
}
