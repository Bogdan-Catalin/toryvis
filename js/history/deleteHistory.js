/**
 *  Trigger function when clicked on trash icon.
 */
$(document).ready(function() {
    $("#deleteButton").click(deleteHistoryItems);
});

/**
 *  This function will be called when the delete button is pressed.
 *  It will delete all marked items.
 */
function deleteHistoryItems ()
{
    NodeList.prototype.forEach = Array.prototype.forEach
    var historyView = document.getElementById('history_item_view');
    var deleteList = [];
    var deleteNodes = [];

    var historyItems = historyView.childNodes;

    // Get all checked url
    for (var h=0 ; h<historyItems.length ; h++)
    {
        var item = historyItems[h];
        for (var i=0; i<item.childNodes.length; i++) {
            if (item.childNodes[i].className == "historyDeleteCheckbox") {
                if (item.childNodes[i].checked) {
                    for (var j=0; j<item.childNodes.length; j++) {
                        if (item.childNodes[j].className == "historyLink") {
                            deleteList.push(item.childNodes[j].innerText);
                            deleteNodes.push (h);
                        }
                    }
                }
            }
        }
    }

    deleteSelectedNodes (historyView, deleteNodes);
    deleteUrls (deleteList);
}


/**
 * This function removes children at specified indexes from given
 * parent node with a fadeOut effect.
 *
 * @param parentNode Node whose children will be deleted.
 * @param nodeIndexList List of indexes of children to be deleted.
 */
function deleteSelectedNodes (parentNode, nodeIndexList)
{
    for (var i=nodeIndexList.length-1 ; i>=0 ; i--)
    {
        $("#"+parentNode.childNodes[nodeIndexList[i]].id).fadeOut(1000, function() {
            //console.log(parentNode.childNodes[nodeIndexList[i]]);
            //$("#"+parentNode.childNodes[nodeIndexList[i]].id).remove();
            //parentNode.removeChild(parentNode.childNodes[nodeIndexList[i]]);
        });
    }

}

/**
 * This function will remove URLs from browing history.
 *
 * @param urlList List of URL to be removed from web history.
 */
function deleteUrls (urlList)
{
    for (var i=0 ; i<urlList.length ; i++)
    {
        chrome.history.deleteUrl({url:urlList[i]}, function (){
            //TODO: implement callback here
        });
    }
}

