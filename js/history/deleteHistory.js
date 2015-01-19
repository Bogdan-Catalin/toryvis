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
                if (item.childNodes[i].firstChild.checked) {
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

    // Bring popup to delete selected
    if (deleteList.length>0 && deleteList.length) {
        alertify.set({labels: {ok: "Yes", cancel: "No"}, buttonFocus: "cancel"});
        var itemString = "items";
        if (deleteList.length===1) itemString='item';
        alertify.confirm("Are you sure you want to delete selected "+itemString+" ?", function (e) {
            if (e) {
                // Delete selected items;
                deleteSelectedNodes (historyView, deleteNodes);
                deleteUrls (deleteList);
                alertify.success("Deleted " + deleteList.length + " " + itemString + ".");
            } else {
            }
        });
    }

    // Bring popup to delete all history
    else {
        alertify.set({labels: {ok: "Yes", cancel: "No"},buttonFocus: "cancel"});
        alertify.confirm("Do you want to delete entire browsing history ?", function (e) {
            if (e) {
                // Delete entire web history
                deleteAllBrowsingHistory();
                deleteAllChildNodes(historyView);
                loadHistoryItems(descCompareHistoryDate,'');
                alertify.success ("Deleted your entire browsing history.")
            } else {
            }
        });
    }
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
        $("#"+parentNode.childNodes[nodeIndexList[i]].id).fadeOut(1000, 'linear', function() {
            $(this).remove();
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
            // implement callback if needed
        });
    }
}

/**
 * Does exactly what it says: clears browsing history.
 */
function deleteAllBrowsingHistory () {
    chrome.history.deleteAll(function (){
        // implement callback if needed
    })
}

/**
 * Removes all children nodes of given node.
 * @param parentNode Self explanatory.
 */
function deleteAllChildNodes (parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}
