var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function (req, res) {

    var url = getSearchedUrl();
    var restaurantNameList = [];


    //All the web scraping magic will happen here
    request(url, function (error, response, html) {

        // First we'll check to make sure no errors occurred when making the request

        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            var name, starrating, textrating;
            var json = {
                name: "",
                starrating: "",
                rating: ""
            };
            // FINISHED LOADING PAGE
            $('title').each(function (i) {
                restaurantNameList.push(i.getElementByTagName("span"));
            });
        };
    });
    var nameList = "";
    restaurantNamelist.forEach(function (i) {
        nameList += i;
        nameList += '\n';
    });
    fs.writeFile('output.json', nameList, function (err) {

        console.log('File successfully written! - Check your project directory for the output.json file');

    })
});

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;