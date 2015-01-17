$(document).ready(function() {
    $("#dateOrVisits").change(sortHistoryItems);
    $("#ascOrDesc").change(sortHistoryItems);
});

function sortHistoryItems () {
    var dropDown = document.getElementById("dateOrVisits");
    var option = dropDown.options[dropDown.selectedIndex].text;

    var dropDownCrit = document.getElementById("ascOrDesc");
    var criteria = dropDownCrit.options[dropDownCrit.selectedIndex].text;

    var searchInput = document.getElementById("searchText");
    var searchString = searchInput.value;

    console.log (option);
    console.log (criteria);

    if (option.indexOf('Date') > -1)
    {
        // Sort by date
        deleteHistoryViewItems();
        if (criteria.indexOf('Descending') > -1)
        {
            loadHistoryItems(descCompareHistoryDate,searchString);
        }
        else
        {
            loadHistoryItems(ascCompareHistoryDate,searchString);
        }
    }
    if (option.indexOf('Most') > -1)
    {
        // Sort by number of visits
        deleteHistoryViewItems();
        if (criteria.indexOf('Descending') > -1)
        {
            loadHistoryItems(descCompareHistoryVisits,searchString);
        }
        else
        {
            loadHistoryItems(ascCompareHistoryDate,searchString);
        }
    }
}

function deleteHistoryViewItems()
{
    var parentNode = document.getElementById("history_item_view");
    while (parentNode.firstChild)
    {
        parentNode.removeChild(parentNode.firstChild);
    }
}
