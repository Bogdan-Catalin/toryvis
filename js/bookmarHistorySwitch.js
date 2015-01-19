/**
 *  Function called when pressing the "Switch to bookmarks/history" button.
 */
function switchBookmarkHistory ()
{
    var button = document.getElementById ('switchHistoryBookmarks');
    var buttonText = button.innerHTML;

    if (buttonText.indexOf("Bookmark") > -1)
    {
        button.innerHTML="Switch to History";
        // remove graphical history elements
        deleteHistoryViewItems();

        // Load bookmarks
        loadBookmarkItems(descCompareHistoryDate,'');
        changeUiForBookmarksMode();
    }
    else if (buttonText.indexOf("History") > -1)
    {
        button.innerHTML="Switch to Bookmarks";
        // remove graphical bookmark elements
        deleteHistoryViewItems();
        loadHistoryItems(descCompareHistoryDate,'');
        changeUiForHistoryMode();
    }
}

/**
 *  Modifies ids of elements which are used in history-related functions
 */
function changeUiForHistoryMode ()
{
    // Sort dropdowns
    var sort = document.getElementById("dateOrVisits");
    if (sort)
    {
        // Add back value: Most Accessed
        var opt = document.createElement("option");
        opt.text = "Most accessed";
        opt.value = "accessed";
        sort.options.add (opt);
    }

    //TODO: remove bookmark import buttons
}

/**
 *  Modifies ids of elements which are used in bookmark-related functions
 */
function changeUiForBookmarksMode ()
{
    // Sort dropdowns
    var sort = document.getElementById("dateOrVisits");
    if (sort)
    {
        var childToRemove;
        // Remove most accessed as the bookmark API does not offer visitCount
        for (var i=0 ; i<sort.childNodes.length ; i++)
        {
            if (sort.childNodes[i].value === 'accessed') {childToRemove=sort.childNodes[i];}
        }
        sort.removeChild(childToRemove);
    }

    //TODO: add bookmark import buttons
}
