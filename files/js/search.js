var url = "";

function getSearchedUrl(){
    return url;
}

function searchButton() {
    var searched = document.getElementById("search").value;
    url = 'http://www.tripadvisor.com/Search?q='+searched+'#&ssrc=e&o=0';
    window.location.href = url;
    return false;
}
// class="title"