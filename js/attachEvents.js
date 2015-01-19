$(document).ready(function() {
    // When loading document for the first time, attach history related events
    attachHistoryEvents();

    // And also load history UI components
    // TODO: save filter/search/mode(bookmark/history) values in cookies and restore them when reopening window

    loadHistoryItems(descCompareHistoryDate,'');
});


/**
 *  Attaches history-related functions to events
 */
function attachHistoryEvents ()
{
    // TODO: Remove bookmark events

    // Dropdown functions
    $("#dateOrVisits").on ("change",sortHistoryItems);
    $("#ascOrDesc").on ("change",sortHistoryItems);

    // Event for searching
    $("#searchButton").on ("click",sortHistoryItems);

    // Delete button function
    $("#deleteButton").on ("click",deleteHistoryItems);

    // Add event for bookmark switch
    $('#switchHistoryBookmarks').on("click",switchBookmarkHistory);
}

function attachBookmarkEvents ()
{
    // Dropdown functions
    $("#dateOrVisits").off ("change",sortHistoryItems);
    $("#ascOrDesc").off ("change",sortHistoryItems);

    // Event for searching
    $("#searchButton").off ("click",sortHistoryItems);

    // Delete button function
    $("#deleteButton").off ("click",deleteHistoryItems);

    // Add event for bookmark switch
    $('#switchHistoryBookmarks').off("click",switchBookmarkHistory);

    // TODO: add bookmark events
}
