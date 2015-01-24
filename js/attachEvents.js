$(document).ready(function() {
    // Cookies !
    if (document.cookie.indexOf('mode') == -1) document.cookie = "mode=history";

    // Add event for bookmark switch
    $('#switchHistoryBookmarks').on("click",switchBookmarkHistory);

    if (getCookie('mode').indexOf('history') > -1)
    {
        // When loading document for the first time, attach history related events
        attachHistoryEvents();

        // And also load history UI components
        loadHistoryItems(descCompareHistoryDate, '');
    }


    if (getCookie('mode').indexOf('bookmarks') > -1)
    {
        var button = document.getElementById ('switchHistoryBookmarks');
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

    // Change alertify default title
    alertify.defaults.glossary.title = 'Toryvis';


    // Used to smoothen animations by calling removeElement
    // when animations are complete.
    document.body.addEventListener('webkitAnimationEnd', removeElement);


    // Since the call_back page cannot use the Chrome API directly,
    // extracted bookmarks will be stored using the local storage,
    // then processed through the Bookmark API, and the deleted
    $(window).on('storage', changedLocalStorage);

    // Event for scrollbar: load up more history/bookmark "cards"
    $('#history_item_view').on('scroll', handleScroll);
});

/**
 *  Attaches history-related functions to events
 */
function attachHistoryEvents ()
{
    // Deactivate bookmark events
    // Delete button function
    $("#deleteButton").off ("click",deleteBookmarkItems);

    // Dropdown functions
    $("#dateOrVisits").off ("change",sortBookmarkItems);
    $("#ascOrDesc").off ("change",sortBookmarkItems);

    // Event for searching
    $("#searchButton").off ("keyup", onSearchKeyUpBookmarks);
    $("#searchText").off ("input", sortBookmarkItems);



    // Activate history events
    // Dropdown functions
    $("#dateOrVisits").on ("change",sortHistoryItems);
    $("#ascOrDesc").on ("change",sortHistoryItems);

    // Event for searching
    $("#searchButton").on ("click",sortHistoryItems);

    // Delete button function
    $("#deleteButton").on ("click",deleteHistoryItems);
    $("#searchText").on ("keyup", onSearchKeyUpHistory);
}

function attachBookmarkEvents ()
{
    // Deactivate history events
    // Dropdown functions
    $("#dateOrVisits").off ("change",sortHistoryItems);
    $("#ascOrDesc").off ("change",sortHistoryItems);

    // Event for searching
    $("#searchButton").off ("click",sortHistoryItems);

    // Delete button function
    $("#deleteButton").off ("click",deleteHistoryItems);
    $("#searchText").off ("keyup", onSearchKeyUpHistory);



    // Activate bookmark events
    // Delete button function
    $("#deleteButton").on ("click",deleteBookmarkItems);

    // Dropdown functions
    $("#dateOrVisits").on ("change",sortBookmarkItems);
    $("#ascOrDesc").on ("change",sortBookmarkItems);

    // Event for searching
    $("#searchButton").on ("click",sortBookmarkItems);
    $("#searchText").on ("keyup", onSearchKeyUpBookmarks);
}

/**
 *  Key event fired when typing something in the search bar.
 *  If user presses enter, a search is being made.
 */
function onSearchKeyUpBookmarks (e)
{
    if (e.keyCode ==13)
    {
        sortBookmarkItems();
    }
}

function onSearchKeyUpHistory (e)
{
    if (e.keyCode ==13)
    {
        sortHistoryItems();
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
