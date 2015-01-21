$(document).ready(function() {
    // When loading document for the first time, attach history related events
    attachHistoryEvents();

    // And also load history UI components
    // TODO: save filter/search/mode(bookmark/history) values in cookies and restore them here

    loadHistoryItems(descCompareHistoryDate,'');

    // Add event for bookmark switch
    $('#switchHistoryBookmarks').on("click",switchBookmarkHistory);

    // Change alertify default title
    alertify.defaults.glossary.title = 'Toryvis';


    // Used to smoothen animations by calling removeElement
    // when animations are complete.
    document.body.addEventListener('webkitAnimationEnd', removeElement);
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
    $("#searchText").off ("input", sortBookmarkItems);



    // Activate history events
    // Dropdown functions
    $("#dateOrVisits").on ("change",sortHistoryItems);
    $("#ascOrDesc").on ("change",sortHistoryItems);

    // Event for searching
    $("#searchButton").on ("click",sortHistoryItems);

    // Delete button function
    $("#deleteButton").on ("click",deleteHistoryItems);
    $("#searchText").on ("input", sortHistoryItems);
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
    $("#searchText").off ("input", sortHistoryItems);



    // Activate bookmark events
    // Delete button function
    $("#deleteButton").on ("click",deleteBookmarkItems);

    // Dropdown functions
    $("#dateOrVisits").on ("change",sortBookmarkItems);
    $("#ascOrDesc").on ("change",sortBookmarkItems);

    // Event for searching
    $("#searchButton").on ("click",sortBookmarkItems);
    $("#searchText").on ("input", sortBookmarkItems);
}
