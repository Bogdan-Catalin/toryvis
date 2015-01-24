/**
 *  When user scrolls to the end, load more history items.
 *  I like to call this "a tap". You wouldn't want a water pipe without a tap, would you ?
 */
function handleScroll ()
{
    var container = document.getElementById('history_item_view');
    var scrollerPosition = $(container).scrollLeft()+$(container).width();

    if (container.clientWidth >= container.scrollWidth) return;
    if (scrollerPosition >= $(container)[0].scrollWidth) loadUIElements();
}

/**
 *  Loads more history items.
 */
function loadUIElements ()
{
    var dropDown = document.getElementById("dateOrVisits");
    var option = dropDown.options[dropDown.selectedIndex].text;

    var dropDownCrit = document.getElementById("ascOrDesc");
    var criteria = dropDownCrit.options[dropDownCrit.selectedIndex].text;

    var searchInput = document.getElementById("searchText");
    var searchString = searchInput.value;

    var mode = getCookie('mode');

    // Here comes some redundant code
    if (mode.indexOf('history') > -1)
    {
        if (option.indexOf('Date') > -1)
        {
            if (criteria.indexOf('Descending') > -1)
            {
                loadHistoryItems(descCompareHistoryDate, searchString);
            }
            else
            {
                loadHistoryItems(ascCompareHistoryDate, searchString);
            }
        }
        if (option.indexOf('Most') > -1)
        {
            // Sort by number of visits
            if (criteria.indexOf('Descending') > -1) {
                loadHistoryItems(descCompareHistoryVisits, searchString);
            }
            else
            {
                loadHistoryItems(ascCompareHistoryVisits, searchString);
            }
        }
    }
    else if (mode.indexOf('bookmarks') > -1)
    {
        if (option.indexOf('Date') > -1)
        {
            // Sort by date
            if (criteria.indexOf('Descending') > -1)
            {
                loadBookmarkItems(descCompareBookmarkDate,searchString);
            }
            else
            {
                loadBookmarkItems(ascCompareBookmarkDate,searchString);
            }
        }
        if (option.indexOf('Most') > -1)
        {
            if (criteria.indexOf('Descending') > -1)
            {
                loadBookmarkItems(descCompareHistoryVisits,searchString);
            }
            else
            {
                loadBookmarkItems(ascCompareHistoryVisits,searchString);
            }
        }
    }
}