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
        var itemString = "items";
        if (deleteList.length===1) itemString='item';

        alertify.confirm("Are you sure you want to delete selected "+itemString+" ?", function(){
            // User clicked yes
            // Delete selected items;
            deleteSelectedNodes (historyView, deleteNodes);
            deleteUrls (deleteList);
            //loadHistoryItems(descCompareHistoryDate,'');
            alertify.success("Deleted " + deleteList.length + " " + itemString + ".");
        },function(){
            // User clicked no
        }).setting('labels',{'ok':'Yes', 'cancel': 'No'});
    }

    // Bring popup to delete all history
    else {

        alertify.confirm("Are you sure you want to delete your entire browsing history ?", function(){
            // User clicked yes
            // Delete entire web history
            deleteAllBrowsingHistory();
            deleteAllChildNodes(historyView);
            loadHistoryItems(descCompareHistoryDate,'');
            alertify.success("Deleted your entire browsing history.");
        },function(){
            // User clicked no
        }).setting('labels',{'ok':'Yes', 'cancel': 'No'});
    }
}


/**
 * This function removes children at specified indexes from given
 * parent node with an animation effect.
 *
 * @param parentNode Node whose children will be deleted.
 * @param nodeIndexList List of indexes of children to be deleted.
 */
function deleteSelectedNodes (parentNode, nodeIndexList)
{
    for (var i=nodeIndexList.length-1 ; i>=0 ; i--)
    {
        // Old JQuery fadeOut animation. Should replace with this one instead if client has a machine with low resources
        /*
        $("#"+parentNode.childNodes[nodeIndexList[i]].id).fadeOut(1000, 'linear', function() {
            $(this).remove();
        });
        */

        var currentNode = parentNode.childNodes[nodeIndexList[i]];

        insertKeyframes(currentNode.clientWidth);
        currentNode.classList.add('removed');
    }
}

function insertKeyframes(height)
{
    // Used to dynamically generate keyframe animation
    var keyframesTemplate = document.querySelector('[type^=application]').textContent;
    var replacementPattern = /\{\{width\}\}/g;

    var styleElement = document.createElement('style');
    styleElement.textContent = keyframesTemplate.replace(replacementPattern, height + 'px');
    document.head.appendChild(styleElement);
}


/**
 *  Triggered by end of animation.
 */
function removeElement (event)
{
    if (event.animationName === 'disapear')
    {
        event.target.parentNode.removeChild(event.target);
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
    for (var i=0 ; i<parentNode.childNodes.length ; i++)
    {
        var currentNode = parentNode.childNodes[i];

        insertKeyframes(currentNode.clientWidth);
        currentNode.classList.add('removed');
    }
}
