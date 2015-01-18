$(document).ready(function() {
    $('#history_item_view').mousewheel(function(e, delta) {
        this.scrollLeft -= (delta * 100);
        e.preventDefault();
    });
});