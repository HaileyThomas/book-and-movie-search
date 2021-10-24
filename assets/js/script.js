// VARIABLES
var formEl = document.querySelector(".city-form");
var inputEl = document.querySelector("#city");
//example vars
var search = "harry potter";
var search2;
//movie data
var movieTitle = [];
var movieDate = [];
var moviePoster = [];
//book data
var bookTitle = [];
var bookDate = [];
var bookDesc = [];
var bookThumbnail = [];

//we use arrays for data because there are 5 items we want to store specific data for
//ex. 5 book titles

// FORM SUBMIT HANDLER
var formSubmitHandler = function (event) {
    // prevent page from reloading
    event.preventDefault();
    // get value from input element
    sign = inputEl.value.trim();
    // run get city function
    getCity();
};

// GET MOVIE
var getMovie = function () {
    var url2 = "http://www.omdbapi.com/?s=" + search + "&apikey=5bdbab43&";

    // make fetch request
    fetch(url2).then(function (response) {
        // if request successful
        if (response.ok) {
            // get data from response
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                //log data for 5 movies using for loop
                for(i = 0; i < 5; i++) {
                    //booktitle
                    movieTitle[i] = data.Search[i].Title
                    console.log("Title: " + movieTitle[i]);

                    //year released
                    movieDate[i] =  data.Search[i].Year
                    console.log("Year: " + movieDate[i]);
                    
                    //image of the poster
                    moviePoster[i] = data.Search[i].Poster
                    console.log("Poster: " + moviePoster[i]);
                    }
                //side note for grabbing movie data
                //REMEMBER TO USE CAPITALS
                //ex. data.Search[0].Title
            });
        } else {
            alert("Error getting api response");
        };
    });
};

// GET BOOK

var getBook = function () {
    var url = "https://www.googleapis.com/books/v1/volumes?q=" + search + "&key=AIzaSyDHFrhaSZyG8xtzgAEnpoZ8Rh5zLZ-D0RU";

    // make fetch request
    fetch(url).then(function (response) {
        // if request successful
        if (response.ok) {
            // get data from response
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                //log data for 5 books using for loop
                for(i = 0; i < 5; i++) {
                    //booktitle
                    bookTitle[i] = data.items[i].volumeInfo.title
                    console.log("Title: " + bookTitle[i]);

                    //date released
                    bookDate[i] = data.items[i].volumeInfo.publishedDate
                    console.log("Released: " + bookDate[i]);
                    //some descriptions are empty and we don't want to have desc: undefined. so use if statement
                    if(data.items[i].volumeInfo.description){
                        bookDesc[i] = data.items[i].volumeInfo.description
                    console.log("Description: " + bookDesc[i]);
                    }
                    else{
                        console.log("Description: No description available.");
                    }
                    //post the image of the content
                    bookThumbnail[i] = data.items[i].volumeInfo.imageLinks.thumbnail
                    console.log("Thumbnail: " + bookThumbnail[i]);
                    }

                //declare element add it to page
            });
        } else {
            alert("Error getting api response");
        };
    });
}

// CALL FUNCTIONS
getMovie();
getBook();
// SUBMIT CITY EVENT LISTENER
formEl.addEventListener("submit", formSubmitHandler);

//log titles, images, descriptions