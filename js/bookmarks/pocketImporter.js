function importBookmarksFromPocket ()
{
    // TODO: popup dialog for user to input username and password
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

    var loginHtml = '<form id="loginForm"><fieldset><label> Username </label><input type="text" value="Username"/><label> Password </label><input type="password" value="password"/><input id="loginButton" type="submit" value="Login"/></fieldset></form>';
    alertify.genericDialog (loginHtml);

    $('#loginButton').on ('click', function(){
        var form = document.getElementById('loginForm');
        // First disable inputs
        form.childNodes[0].disabled='disabled';
        form.childNodes[0].childNodes[4].value='Authenticating...';

        var usernameText = form.childNodes[0].childNodes[1].value;
        var passwordText = form.childNodes[0].childNodes[3].value;

        console.log (usernameText);
        console.log (passwordText);

        document.getElementsByClassName('ajs-commands')[0].style.visibility="hidden";

        // Form post request to pocket
        var xmlhttp;
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.open("POST","https://getpocket.com/v3/oauth/request/",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
        xmlhttp.setRequestHeader("X-Accept", "application/x-www-form-urlencoded");
        xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        var key = "36904-a72c7f1c0b93f3c51e4ceb39";
        var parameters = "consumer_key="+key+"&redirect_uri=pocketapp1234:authorizationFinished";

        xmlhttp.send(parameters);

        console.log ('sent request');
        //alertify.closeAll();
    })

    document.getElementsByClassName('ajs-commands')[0].style.visibility="visible";
    // TODO: get user and pass and attempt to connect to Pocket
}