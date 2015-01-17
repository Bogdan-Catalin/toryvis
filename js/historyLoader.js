function loadHistoryItems(sortFunction,searchString) {
    chrome.history.search({text: searchString, maxResults: 10000}, function (data) {
        data.sort (sortFunction);
        data.forEach(function (page) {
            // Get favicon url
            var faviconUrl = 'chrome://favicon/' + page.url;

            // Create main history container
            var mainNode = document.createElement('a');
            mainNode.href = page.url;
            mainNode.target = '_blank';
            mainNode.id = page.id;
            mainNode.className = 'history_item_container';

            // Create nodes with browsing detail
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
            var dateText = document.createTextNode(date.toString());
            var textBeforeDate = document.createTextNode('Last time visited on');
            dateSpan.appendChild(textBeforeDate);
            dateSpan.appendChild(document.createElement('br'));
            dateSpan.appendChild(dateText);

            // URL
            var historySpan = document.createElement('span');
            historySpan.className = 'historyLink';
            var urlText = document.createTextNode(page.url);
            historySpan.appendChild(urlText);

            // Append nodes
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

$( document ).ready(function() {
    loadHistoryItems(descCompareHistoryDate,'');
});

// Used for sorting
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
