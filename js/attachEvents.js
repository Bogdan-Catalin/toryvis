$(document).ready(function() {
    // When loading document for the first time, attach history related events
    attachHistoryEvents();

    // And also load history UI components
    // TODO: save filter/search/mode(bookmark/history) values in cookies and restore them when reopening window

    loadHistoryItems(descCompareHistoryDate,'');

    // Add event for bookmark switch
    $('#switchHistoryBookmarks').on("click",switchBookmarkHistory);
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
    $("#searchButton").off ("click",sortBookmarkItems);


    
    // Activate history events
    // Dropdown functions
    $("#dateOrVisits").on ("change",sortHistoryItems);
    $("#ascOrDesc").on ("change",sortHistoryItems);

    // Event for searching
    $("#searchButton").on ("click",sortHistoryItems);

    // Delete button function
    $("#deleteButton").on ("click",deleteHistoryItems);
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



    // Activate bookmark events
    // Delete button function
    $("#deleteButton").on ("click",deleteBookmarkItems);

    // Dropdown functions
    $("#dateOrVisits").on ("change",sortBookmarkItems);
    $("#ascOrDesc").on ("change",sortBookmarkItems);

    // Event for searching
    $("#searchButton").on ("click",sortBookmarkItems);
}