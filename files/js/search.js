function searchButton() {
    var searched = document.getElementById("search").value;
    var url = "https://www.tripadvisor.com/Search?q="+searched;
    console.log(url);
    window.location.href = 'test.html';
}