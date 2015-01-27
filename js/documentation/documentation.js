$(document).ready(function()
{
    navigationLoader();

    $('#navigate').on('click', navigationLoader);
    $('#delete').on('click', deleteLoader);
    $('#find').on('click', findLoader);
    $('#import').on('click', importLoader);
    $('#statistics').on('click', statisticsLoader);
});

/**
 *  Loads up a part of the tutorial dynamically.
 */
function navigationLoader()
{
    var tutorialWrapper = document.getElementById ('tutorial_wrapper');

    // Destroy whatever was there before
    tutorialWrapper.innerHTML="";

    // Create a tutorial node
    var tutorialNode = document.createElement('div');
    tutorialNode.id = 'tutorial';
    tutorialNode.innerHTML=navHtml();

    tutorialWrapper.appendChild(tutorialNode);
}

/**
 *  @return html string of navigation tutorial
 */
function navHtml () {
    var html = "<h1>Navigation through history and bookmarks</h1>\
    <span>In order to scroll through the list of history or bookmark items, just put drag the scrollbar (as seen in the following animation).</span>\
    <span>You can also just use the mousewheel for convencience.</span>\
    <div class='img_wrapper'><img src='resources/doc/navigationTutorial.gif'></div>";

    return html;
}


function deleteLoader()
{
    var tutorialWrapper = document.getElementById ('tutorial_wrapper');

    // Destroy whatever was there before
    tutorialWrapper.innerHTML="";

    // Create a tutorial node
    var tutorialNode = document.createElement('div');
    tutorialNode.id = 'tutorial';
    tutorialNode.innerHTML=delHtml();

    tutorialWrapper.appendChild(tutorialNode);
}

function delHtml () {
    var html = "<h1>Delete history or bookmarks</h1>\
    <span>If you want to delete individual history or bookmark items, just check the boxes of the elements you want to delete and then press the trash can icon in the bottom right corner, then you will be prompted if you want to delete them.</span>\
    <div class='img_wrapper'><img src='resources/doc/deleteTutorial1.gif'></div>\
    <span>If you want to delete your entire browsing history, make sure none of the boxes are checked and just press the trash can icon. This does not work with bookmarks ! (because who would seriously consider deleting all their bookmarks ?)</span>\
    <div class='img_wrapper'><img src='resources/doc/deleteTutorial2.gif'></div>";

    return html;
}


function findLoader()
{
    var tutorialWrapper = document.getElementById ('tutorial_wrapper');

    // Destroy whatever was there before
    tutorialWrapper.innerHTML="";

    // Create a tutorial node
    var tutorialNode = document.createElement('div');
    tutorialNode.id = 'tutorial';
    tutorialNode.innerHTML=finHtml();

    tutorialWrapper.appendChild(tutorialNode);
}

function finHtml () {
    var html = "<h1>Find and sort bookmarks or history</h1>\
    <span>In order to find and sort your desired bookmarks or history items, just use the menu above your history items. The two boxes on the left hand side of the screen are used to sort your items by various criteria, while the text box to the right is used to filter the items by searching through item links and titles. If the extension cannot find your desired items, you will receive a notification in the bottom right corner of the screen.</span>\
    <div class='img_wrapper'><img src='resources/doc/findTutorial.gif'></div>";

    return html;
}


function importLoader()
{
    var tutorialWrapper = document.getElementById ('tutorial_wrapper');

    // Destroy whatever was there before
    tutorialWrapper.innerHTML="";

    // Create a tutorial node
    var tutorialNode = document.createElement('div');
    tutorialNode.id = 'tutorial';
    tutorialNode.innerHTML=impHtml();

    tutorialWrapper.appendChild(tutorialNode);
}

function impHtml () {
    var html = "<h1>Import bookmarks from Pocket</h1>\
    <span>In order to import bookmarks from your Pocket account, first switch to the Bookmarks view. Then click on 'Import from Pocket'. Afterwards a popup screen will appear. Log in to your Pocket account, go ahead and do so and then click on Authorize. Now all your pocket bookmarks are saved to your PC.</span>\
    <div class='img_wrapper'><img src='resources/doc/importTutorial.gif'></div>";

    return html;
}


function statisticsLoader()
{
    var tutorialWrapper = document.getElementById ('tutorial_wrapper');

    // Destroy whatever was there before
    tutorialWrapper.innerHTML="";

    // Create a tutorial node
    var tutorialNode = document.createElement('div');
    tutorialNode.id = 'tutorial';
    tutorialNode.innerHTML=staHtml();

    tutorialWrapper.appendChild(tutorialNode);
}

function staHtml () {
    var html = "<h1>View browsing statistics and save them to disk</h1>\
    <span>In order to view statistics on your browsing history, just click on the 'statistics' button and you will be taken to a new page. There you can select statistics criteria and the start + end dates. If you want to save the generated graphics on your computer, just scroll down and click on one of the three buttons - SVG, PNG or JPG, based on the desired graphics format.</span>\
    <div class='img_wrapper'><img src='resources/doc/statisticsTutorial.gif'></div>";

    return html;
}