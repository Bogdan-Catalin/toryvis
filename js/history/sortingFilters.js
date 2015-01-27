/**
 *  Rearranges history items when selected anything from the dropdown boxes.
 */
function sortHistoryItems () {
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
            loadHistoryItems(descCompareHistoryDate,searchString);
            return;
        }
        else
        {
            loadHistoryItems(ascCompareHistoryDate,searchString);
            return;
        }
    }
    if (option.indexOf('Most') > -1)
    {
        // Sort by number of visits
        deleteHistoryViewItems();
        if (criteria.indexOf('Descending') > -1)
        {
            loadHistoryItems(descCompareHistoryVisits,searchString);
            return;
        }
        else
        {
            loadHistoryItems(ascCompareHistoryVisits,searchString);
            return;
        }
    }
}
