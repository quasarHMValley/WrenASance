var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function (req, res) {
    //'http://www.tripadvisor.com/Search?q=food#&ssrc=e&o=0'
    var url = 'https://www.tripadvisor.com/Restaurant_Review-g186273-d733804-Reviews-Food_for_Friends-Brighton_East_Sussex_England.html';
    var restaurantNameList = [];
    var nameList;

    //All the web scraping magic will happen here
    request(url, function (error, response, html) {

        // First we'll check to make sure no errors occurred when making the request

        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            var name, starrating;
            var json = {
                name: "",
                starrating: ""
            };

            var ratingsJson = {
                ratings: []
            };
            // FINISHED LOADING PAGE
            $('.heading_title').filter(function () {

                // Let's store the data we filter into a variable so we can easily see what's going on.

                var data = $(this);

                // In examining the DOM we notice that the title rests within the first child element of the header tag. 
                // Utilizing jQuery we can easily navigate and get the text by writing the following code:

                name = data.text();

                // Once we have our title, we'll store it to the our json object.

                json.name = name;
            });
            var reviews = [];
            $('.review-container').each(function (i) {
                var data = $(this);
                review = data.find('.partial_entry').text();
                reviews.push(review);
            });
            ratingsJson.ratings = reviews;

            $('.ui_bubble_rating bubble_45').filter(function () {
                var data = $(this);
                starrating = data.attr('alt');
                json.starrating = starrating;
            });
        };
        // To write to the system we will use the built in 'fs' library.
        // In this example we will pass 3 parameters to the writeFile function
        // Parameter 1 :  output.json - this is what the created filename will be called
        // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
        // Parameter 3 :  callback function - a callback function to let us know the status of our function

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {

            console.log('File successfully written! - Check your project directory for the output.json file');

        });
        var finalRatings = {
            ratings: ""
        };
        for (let i = 0; i < ratingsJson.ratings.length; i++) {
            finalRatings.ratings += ratingsJson.ratings[i];  
        }
        fs.writeFile('outputRatings.json', JSON.stringify(finalRatings));
        res.send('Check your console!')
    });

});

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;