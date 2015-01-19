/**
 *  Function called when pressing the "Switch to bookmarks/history" button.
 */
function switchBookmarkHistory ()
{
    var button = document.getElementById ('switchHistoryBookmarks');
    var buttonText = button.innerHTML;

    // Bookmark Mode
    if (buttonText.indexOf("Bookmark") > -1)
    {
        button.innerHTML="Switch to History";

        // remove graphical history elements
        deleteHistoryViewItems();

        // Attach bookmark events
        attachBookmarkEvents();

        // Load bookmark UI
        loadBookmarkItems(descCompareBookmarkDate,'');

        // Change UI to Bookmark mode
        changeUiForBookmarksMode();
    }

    // History Mode
    else if (buttonText.indexOf("History") > -1)
    {
        button.innerHTML="Switch to Bookmarks";

        // Remove graphical bookmark elements;
        deleteHistoryViewItems();

        // Attach history events
        attachHistoryEvents();

        // Load history UI
        loadHistoryItems(descCompareHistoryDate,'');

        // Change UI to History Mode
        changeUiForHistoryMode();
    }
}


/**
 *  Modifies elements which are used in history-related functions
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

    // Replace #mode text and retrigger animation
    var modeText = document.getElementById('mode');
    modeText.innerHTML = "History";

    // Retrigger
    var clone = document.getElementById("mode").cloneNode(true);
    var header = document.getElementById("header");
    header.replaceChild (clone,document.getElementById("mode"));

    //TODO: remove bookmark import buttons
}


/**
 *  Modifies elements which are used in bookmark-related functions
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

    // Replace #mode text and retrigger animation
    var modeText = document.getElementById('mode');
    modeText.innerHTML = "Bookmarks";

    // Retrigger
    var clone = document.getElementById("mode").cloneNode(true);
    var header = document.getElementById("header");
    header.replaceChild (clone,document.getElementById("mode"));

    //TODO: add bookmark import buttons
}


/**
 *  Deletes all UI nodes children of history_item_view
 */
function deleteHistoryViewItems()
{
    var parentNode = document.getElementById("history_item_view");
    while (parentNode.firstChild)
    {
        parentNode.removeChild(parentNode.firstChild);
    }
}
