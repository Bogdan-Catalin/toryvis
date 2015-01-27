/**
 * Loads bookmark items and creates a node for each.
 *
 * @param sortFunction Function used to arrange bookmark items.
 * @param searchString String used to filter bookmark items.
 */
function loadBookmarkItems (sortFunction, searchString)
{
    chrome.bookmarks.getRecent(100000, function (data){
        // Sort data using provided function
        data.sort (sortFunction);

        // Filter data by searchString
        data = filterByString(data, searchString);

        // Verify if results available
        if (data.length == 0)
        {
            // If there is no browsing data available
            if (!searchString || searchString.length === 0 )
            {
                animateErrorNode ("You have no bookmarks. Please add some.")
            }

            // There are bookmarks, but given string returned 0 results
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

        var limitPerLoad=10;
        // See how many items were loaded
        var historyContainer = document.getElementById('history_item_view');
        var addedCount = historyContainer.childNodes.length;

        // Create nodes
        for (var i=addedCount ; i<data.length && i<(addedCount+limitPerLoad) ; i++)
        {
            var page = data[i];
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

            /* Still needs some work
            // Get bookmark path
            var bookmarkPath = [];
            var currentBookmark = page;
            var i = 0;
            // For this we have to ascend in the hierarchy
            // parentId is ommited if node is in root.
            while (currentBookmark.parentId != 0) {
                console.log (currentBookmark);
                chrome.bookmarks.get (currentBookmark.parentId, function (parentNode) {
                    console.log (parentNode);
                    bookmarkPath.push (parentNode[0].title);
                    currentBookmark = parentNode[0];
                });
                i ++;
                if (i == 10) {break;}
            }
            console.log (bookmarkPath);
            */

            // Last visit date
            var dateSpan = document.createElement('span');
            dateSpan.className = "historyDate";
            var visitDate = page.dateAdded;
            var date = new Date(visitDate);
            var formatedDate = formatDate (date);
            var dateText = document.createTextNode(formatedDate);
            var textBeforeDate = document.createTextNode('Added bookmark on');
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
            mainNode.appendChild(dateSpan);
            mainNode.appendChild(historySpan);

            // Append to container
            document.getElementById('history_item_view').appendChild(mainNode);
        }
    })
}

/**
 * Filters bookmark data by strings.
 *
 * @param data Data to be filtered.
 * @param searchString String used to filter data.
 * @returns {Array} Filtered data
 */
function filterByString (data, searchString)
{
    var result = [];

    // If string is empty, return whole dataset
    if (searchString.length <= 0) {return data;}

    for (var i=0 ; i<data.length ; i++)
    {
        // Search through titles and urls and ommit folders
        if (data[i].url.indexOf(searchString)>-1&& data[i].url.length>0) {result.push(data[i]);}
        else if (data[i].title.indexOf(searchString)>-1 && data[i].url.length>0) {result.push(data[i]);}
    }
    return result;
}

function descCompareBookmarkDate(a,b) {
    if (a.dateAdded < b.dateAdded)
        return 1;
    if (a.dateAdded > b.dateAdded)
        return -1;
    return 0;
}

function ascCompareBookmarkDate(a,b) {
    if (a.dateAdded < b.dateAdded)
        return -1;
    if (a.dateAdded > b.dateAdded)
        return 1;
    return 0;
}

/**
 * Animates #no_browsing_data with the specified message
 */
function animateErrorNode (message)
{
    var parent = document.getElementById('content');
    var errorNode = document.getElementById('no_browsing_data');
    var errorNodeClone = document.getElementById('no_browsing_data').cloneNode(true);
    errorNodeClone.innerHTML=message;
    parent.removeChild(errorNode);

    parent.appendChild(errorNodeClone);
}
