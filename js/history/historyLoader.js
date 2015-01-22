/**
 * Loads up history items and creates a history_item_container node for each one
 *
 * @param sortFunction Function used to sort history items.
 * @param searchString Function used to filter history items
 */
function loadHistoryItems(sortFunction,searchString) {
    chrome.history.search({text: searchString, maxResults: 10000}, function (data) {
        if (data.length == 0)
        {
            // If there is no browsing data available
            if (!searchString || searchString.length === 0 )
            {
                animateErrorNode("Your browsing history is empty.<br>Please start browsing the internet.");
            }

            // There is browsing data available, but given string returned 0 results
            else
            {
                alertPopup("Could not find " + searchString + " in titles or links.");
            }
            return;
        }

        else
        {
            animateErrorNode("");
        }

        // Sort data by criteria
        data.sort (sortFunction);

        // Create nodes for each URL
        data.forEach(function (page) {
            // Get favicon url
            var faviconUrl = 'chrome://favicon/' + page.url;

            // Create main history container
            var mainNode = document.createElement('a');
            mainNode.href = page.url;
            mainNode.target = '_blank';
            mainNode.id = page.id;
            mainNode.className = 'history_item_container';

            // Add favicon
            var faviconNode = document.createElement('img');
            faviconNode.src = faviconUrl;
            faviconNode.className = "historyFavicon";

            // Title
            var titleSpan = document.createElement('span');
            titleSpan.className = "historyTitle";
            var titleText = document.createTextNode(page.title);
            titleSpan.appendChild(titleText);

            // Visit count
            var visitSpan = document.createElement('span');
            visitSpan.className = "historyVisits";
            if (page.visitCount > 1) {
                var visitText = document.createTextNode('Visited ' + page.visitCount + ' times');
            }
            else {
                var visitText = document.createTextNode('Visited once');
            }
            visitSpan.appendChild(visitText);

            // Last visit date
            var dateSpan = document.createElement('span');
            dateSpan.className = "historyDate";
            var visitDate = page.lastVisitTime;
            var date = new Date(visitDate);
            var formatedDate = formatDate (date);
            var dateText = document.createTextNode(formatedDate);
            var textBeforeDate = document.createTextNode('Last time visited on');
            dateSpan.appendChild(textBeforeDate);
            dateSpan.appendChild(document.createElement('br'));
            dateSpan.appendChild(dateText);

            // URL
            var historySpan = document.createElement('span');
            historySpan.className = 'historyLink';
            var urlText = document.createTextNode(page.url);
            historySpan.appendChild(urlText);

            // Checkbox for history delete
            var checkbox = document.createElement('input');
            var checkboxLabel = document.createElement ('label');
            checkbox.type = "checkbox";
            checkboxLabel.className = "historyDeleteCheckbox";

            checkboxLabel.appendChild(checkbox);
            checkboxLabel.innerHTML=checkboxLabel.innerHTML+'Mark for deletion';

            // Append nodes
            mainNode.appendChild(checkboxLabel);
            mainNode.appendChild(faviconNode);
            mainNode.appendChild(titleSpan);
            mainNode.appendChild(visitSpan);
            mainNode.appendChild(dateSpan);
            mainNode.appendChild(historySpan);

            // Append to container
            document.getElementById('history_item_view').appendChild(mainNode);
        });
    });
}


// Sorting functions ===========================================================================
function descCompareHistoryVisits(a,b) {
    if (a.visitCount < b.visitCount)
        return 1;
    if (a.visitCount > b.visitCount)
        return -1;
    return 0;
}

function ascCompareHistoryVisits(a,b) {
    if (a.visitCount < b.visitCount)
        return -1;
    if (a.visitCount > b.visitCount)
        return 1;
    return 0;
}

function descCompareHistoryDate(a,b) {
    if (a.lastVisitTime < b.lastVisitTime)
        return 1;
    if (a.lastVisitTime > b.lastVisitTime)
        return -1;
    return 0;
}

function ascCompareHistoryDate(a,b) {
    if (a.lastVisitTime < b.lastVisitTime)
        return -1;
    if (a.lastVisitTime > b.lastVisitTime)
        return 1;
    return 0;
}

//===========================================================================================

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

    return (curr_date + "-" + m_names[curr_month]
    + "-" + curr_year + ", " + hour + ":" + minutes + ":" + seconds);
}
