var url = "";
var scrapeUrl = "";

function getSearchedUrl() {
    return url;
}

function searchButton() {
    var searched = document.getElementById("search").value;
    url = 'http://www.tripadvisor.com/Search?q=' + searched + '#&ssrc=e&o=0';
    scrapeUrl = 'http://allorigins.me/get?url=' + encodeURIComponent(url) + '&callback=?'
    window.location.href = url;
    console.log(getRestaurants());

    return false;
}
// class="title"

function getRestaurants() {
    console.log("in 1");
    $.get(scrapeUrl, function (response) {
        console.log("in 2");
        console.log(response);
        return response;
    });
    return false;
}