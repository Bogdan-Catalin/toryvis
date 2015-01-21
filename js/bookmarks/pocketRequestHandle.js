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


})

function getCookie(name)
{
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}