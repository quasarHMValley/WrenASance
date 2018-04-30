function searchButton() {
    var searched = document.getElementById("search").value;
    var url = 'http://www.tripadvisor.com/Search?q='+searched;
    console.log(url);
    window.location.href = url;
    return false;
}