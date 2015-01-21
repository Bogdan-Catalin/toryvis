/**
 *  This function will be called when the delete button is pressed.
 *  It will delete all marked items.
 */
function deleteBookmarkItems ()
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
                    deleteNodes.push(h);
                    deleteList.push(item.id);
                }
            }
        }
    }

    // Bring popup to delete selected
    if (deleteList.length>0 && deleteList.length) {
        var itemString = "items";
        if (deleteList.length===1) itemString='item';

        alertify.confirm("Are you sure you want to delete selected "+itemString+" ?", function(){
            // User clicked yes
            // Delete selected items;
            deleteSelectedNodes (historyView, deleteNodes);
            deleteBookmarks (deleteList);
            loadBookmarkItems (descCompareBookmarkDate, '');
            alertify.success("Deleted " + deleteList.length + " " + itemString + ".");
        },function(){
            // User clicked no
        }).setting('labels',{'ok':'Yes', 'cancel': 'No'});
    }

    // Bring popup to delete all bookmarks
    else {
        alertify.error ("You did not chose any bookmarks to delete !");

        /* // I don't think it's wise to have a "delete all bookmarks" option, but I'm leaving my options open.
        alertify.set({labels: {ok: "Yes", cancel: "No"},buttonFocus: "cancel"});
        alertify.confirm("Do you want to delete entire browsing history ?", function (e) {
            if (e) {
                // Delete entire web history
                deleteAllChildNodes(historyView);

                loadBookmarkItems(descCompareHistoryDate,'');
                alertify.success ("Deleted your entire browsing history.")
            } else {
            }
        });
        */
    }
}

/**
 * This function will delete all bookmark with given ids.
 *
 * @param ids Array of bookmark ids
 */
function deleteBookmarks (ids)
{
    for (var i=0 ; i<ids.length ; i++)
    {
        chrome.bookmarks.remove (ids[i]);
    }
}

