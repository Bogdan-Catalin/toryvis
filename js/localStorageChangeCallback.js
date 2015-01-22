/**
 * This function is called when any change is made to the HTML5 localStorage.
 */
function changedLocalStorage (event)
{
    console.log ('Storage change !');
    var stringBookmarks = localStorage.getItem('imported_bookmarks');

    // Check if entry was added
    if(stringBookmarks != null)
    {
        // String will be in JSON format, so parse it
        var bookmarkList = JSON.parse(stringBookmarks);

        // Get fields in the imported bookmarks that are of interest
        for (var k in bookmarkList)
        {
            var title = bookmarkList[k]['resolved_title'];
            var url = bookmarkList[k]['resolved_url'];

            // Add the bookmark
            addChromeBookmark(title, url);
        }
        // Now make them appear on screen
        sortBookmarkItems();

        // After adding all items, delete them from the localStorage
        localStorage.removeItem('imported_bookmarks');

        location.reload();
    }
}

/**
 * Adds bookmark to Chrome.
 * @param bookmark
 */
function addChromeBookmark (title,url)
{
    chrome.bookmarks.search (url, function (data) {
        if (data.length == 0) {
            chrome.bookmarks.create({'title': title,
                    'url': url},
                function() {
                    // Do whatever when adding a Bookmark
                });
        }
    });
}
