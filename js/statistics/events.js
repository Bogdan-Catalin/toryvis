$(document).ready(function() {
    addChart();

    // Add events when changing dates
    $('#from_date').on('change', addChart);
    $('#to_date').on('change',addChart);
});

var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l.hostname;
};

/**
 * Generates a piechart using provided data.
 *
 * @param data list of {label:"label",value:value} used to generate piechart.
 */
function generateChart (data)
{
    var pie = new d3pie("pie", {
        size: {
        canvasHeight: 1000,
        canvasWidth: 1000
    },
        header: {
            title: {
                text: "Browsing statistics"
            }
        },
        data: {
            content: data
        },

        labels: {
            outer: {
                format: "label",
                hideWhenLessThanPercentage: null,
                pieDistance: 30
            },
            inner: {
                format: "percentage",
                hideWhenLessThanPercentage: 5
            },
            mainLabel: {
                color: "#333333",
                font: "arial",
                fontSize: 10
            },
            percentage: {
                color: "black",
                font: "arial",
                fontSize: 20,
                decimalPlaces: 0
            },
            value: {
                color: "#cccc44",
                font: "arial",
                fontSize: 10
            },
            lines: {
                enabled: true,
                style: "curved",
                color: "segment" // "segment" or a hex color
            }
        },

        callbacks: {
            onload: encode_as_img_and_link
        }
    });
}


function addChart ()
{
    // Remove previous charts
    document.getElementById('pie').innerHTML="";

    // Get the two dates
    var critElem = document.getElementById("statistics_criteria");

    var criteria = critElem[critElem.selectedIndex].value;
    var from_date = new Date (document.getElementById("from_date").value);
    var to_date = new Date (document.getElementById("to_date").value);

    //console.log (criteria);
    //console.log (from_date);
    //console.log (to_date);

    chrome.history.search({text: "", startTime: from_date.getTime(), endTime: to_date.getTime(), maxResults: 10000}, function (data) {
        var chartData = [];
        var visitedUrls = [];

        if (data.length == 0)
        {
            alertify.error("Could not find any history entries between "+formatDate(from_date)+" and " + formatDate(to_date));
            return;
        }


        for (var i = 0; i < data.length; i++) {
            // Skip extension-related stats
            if (data[i].url.indexOf('extension')>-1) {continue;}

            var host = getLocation(data[i].url);

            if (host.length == 0) {host='other';}

            // Check if host exists in arrays
            var exists = false;
            for (var j = 0; j < visitedUrls.length; j++) {
                var url = visitedUrls[j];
                if (url == host) {
                    exists = true;
                    break;
                }
            }

            if (exists == false) {
                visitedUrls.push(host);
                var chartElem = {label: host, value: data[i].visitCount};
                chartData.push(chartElem);
            }
            // If it does, increment its value
            else {
                for (var j = 0; j < chartData.length; j++) {
                    var obj = chartData[j];
                    if (obj['label'] == host) {
                        obj['value'] += data[i].visitCount;
                        break;
                    }
                }
            }
        }

        //console.log (chartData);
        generateChart(chartData);
    });
}

function encode_as_img_and_link(){
    // Add some critical information
    $("svg").attr({ version: '1.1' , xmlns:"http://www.w3.org/2000/svg"});
    document.getElementsByTagName('svg')[0].id = 'graph';

    var svg = document.getElementById( "graph" );
    var svgData = new XMLSerializer().serializeToString( svg );

    var canvas = document.createElement( "canvas" );
    var ctx = canvas.getContext( "2d" );

    var img = document.createElement( "img" );
    img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( svgData ) );

    img.onload = function() {

        // Use canvg to render svg to canvas
        canvg(canvas, svgData, {ignoreMouse: true, ignoreAnimation: true});

        var pngUrl = canvas.toDataURL("image/png");
        var pngButton = document.getElementById('png');
        pngButton.href = pngUrl;
        pngButton.download= "My statistics.png";

        var svgUrl = "data:image/svg+xml;base64," + btoa( svgData );
        var svgButton = document.getElementById('svg');
        svgButton.href=svgUrl;
        svgButton.download= "My statistics.svg";

        var jpgUrl = canvas.toDataURL("image/jpg");
        var jpgButton = document.getElementById('jpg');
        jpgButton.href = jpgUrl;
        jpgButton.download= "My statistics.png";

    };
}


/**
 * Creates custom format for given date
 *
 * @param date Date to be reformatted.
 * @returns {string} Formatted date.
 */
function formatDate (date)
{
    var m_names = ["JAN", "FEB", "MAR",
        "APR", "MAY", "JUN", "JUL", "AUG", "SEP",
        "OCT", "NOV", "DEC"];

    var curr_date = date.getDate();
    var curr_month = date.getMonth();
    var curr_year = date.getFullYear();

    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours();

    if (seconds<10) seconds="0"+seconds;
    if (minutes<10) minutes="0"+minutes;
    if (hour<10) hour="0"+hour;

    return (curr_date + "-" + m_names[curr_month]
    + "-" + curr_year + ", " + hour + ":" + minutes + ":" + seconds);
}
