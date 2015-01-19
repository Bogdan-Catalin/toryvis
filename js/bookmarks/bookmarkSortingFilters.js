/**
 *  Rearranges bookmark items when selected anything from the dropdown boxes.
 */
function sortBookmarkItems () {
    var dropDown = document.getElementById("dateOrVisits");
    var option = dropDown.options[dropDown.selectedIndex].text;

    var dropDownCrit = document.getElementById("ascOrDesc");
    var criteria = dropDownCrit.options[dropDownCrit.selectedIndex].text;

    var searchInput = document.getElementById("searchText");
    var searchString = searchInput.value;

    if (option.indexOf('Date') > -1)
    {
        // Sort by date
        deleteHistoryViewItems();
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
        // Sort by number of visits
        deleteHistoryViewItems();
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
