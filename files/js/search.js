function searchButton() {
    var searched = document.getElementById("search").value;
    var url = 'http://www.tripadvisor.com/Search?q='+searched+'#&ssrc=e&o=0';
    console.log(url);
    window.location.href = url;
    return false;
}