// VARIABLES
var formEl = document.querySelector("#hero-form");
var inputEl = document.querySelector("#title");
var resultsContainer = document.getElementById("results-container");
var search;
//movie data
var movieTitle = [];
var movieDate = [];
var moviePoster = [];
var movieID = [];
var moviePlot = [];
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
    search = inputEl.value.trim();
    // run get city function
    getBook();
    getMovie();
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
                for (i = 0; i < 5; i++) {
                    //booktitle
                    bookTitle[i] = data.items[i].volumeInfo.title
                    console.log("Title: " + bookTitle[i]);

                    //date released
                    bookDate[i] = data.items[i].volumeInfo.publishedDate
                    console.log("Released: " + bookDate[i]);
                    //some descriptions are empty and we don't want to have desc: undefined. so use if statement
                    if (data.items[i].volumeInfo.description) {
                        bookDesc[i] = data.items[i].volumeInfo.description
                        console.log("Description: " + bookDesc[i]);
                    }
                    else {
                        console.log("Description: No description available.");
                    }
                    //post the image of the content
                    bookThumbnail[i] = data.items[i].volumeInfo.imageLinks.thumbnail
                    console.log("Thumbnail: " + bookThumbnail[i]);
                }

                //declare element add it to page
                // create book container
                var bookContainer = document.createElement("div");
                bookContainer.className = "card m-3";
                resultsContainer.appendChild(bookContainer);
                // create book container heading
                var bookHeader = document.createElement("h2");
                bookHeader.className = "card-header title is-4 p-2 bg has-text-white";
                bookHeader.textContent = "Book Results";
                bookContainer.appendChild(bookHeader);
                // create div to hold book results
                var bookResultsDiv = document.createElement("div");
                bookResultsDiv.className = "card-content";
                bookContainer.appendChild(bookResultsDiv);
                // loop through book results
                for (i = 0; i < bookTitle.length; i++) {
                    // create card div
                    var bookDivEl = document.createElement("div");
                    bookDivEl.className = "card m-2";
                    bookResultsDiv.appendChild(bookDivEl);
                    // create book title
                    var bookTitleEl = document.createElement("h3");
                    bookTitleEl.className = "card-header title is-5 p-2 bg has-text-white";
                    bookTitleEl.innerHTML = bookTitle[i];
                    bookDivEl.appendChild(bookTitleEl);
                    // create content div
                    var bookContentDiv = document.createElement("div");
                    bookContentDiv.className = "card-content has-text-centered";
                    bookDivEl.appendChild(bookContentDiv);
                    // add book thumbnail
                    var bookImageDiv = document.createElement("img");
                    bookImageDiv.className = "card-image has-text-centered m-3";
                    bookImageDiv.src = bookThumbnail[i];
                    bookContentDiv.appendChild(bookImageDiv);
                    // add book date
                    var bookDateEl = document.createElement("h4");
                    bookDateEl.className = "card-content has-text-centered p-2";
                    bookDateEl.textContent = "Release date: " + bookDate[i];
                    bookContentDiv.appendChild(bookDateEl);
                    // add book description         
                    var bookDescriptionEl = document.createElement("p");
                    bookDescriptionEl.className = "card-content has-text-justified";
                    bookDescriptionEl.textContent = bookDesc[i];
                    bookContentDiv.appendChild(bookDescriptionEl);
                    
                };

            });
        } else {
            alert("Error getting api response");
        };
    });
};

// GET MOVIE
var getMovie = function () {
    var movieUrl = "http://www.omdbapi.com/?s=" + search + "&apikey=5bdbab43&";

    // make fetch request
    fetch(movieUrl).then(function (response) {
        // if request successful
        if (response.ok) {
            // get data from response
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                //log data for 5 movies using for loop
                for (i = 0; i < 5; i++) {
                    //movie title
                    movieTitle[i] = data.Search[i].Title;
                    console.log("Title: " + movieTitle[i]);

                    //year released
                    movieDate[i] = data.Search[i].Year;
                    console.log("Year: " + movieDate[i]);

                    //image of the poster
                    moviePoster[i] = data.Search[i].Poster;
                    console.log("Poster: " + moviePoster[i]);
                    //use movie id as a parameter to fetch api and get plot
                    movieID[i] = data.Search[i].imdbID;
                    console.log("Movie ID: " + movieID[i]);

                    //api with added parameters for id which will give us data on THE specific movie
                     var movieIDUrl = "http://www.omdbapi.com/?i=" + movieID[i] + "&apikey=5bdbab43&";
                        fetch(movieIDUrl).then(function (response2){
                        if(response2.ok) {
                          response2.json().then(function (data2) {
                             //assign current plot to array
                                  moviePlot[i] = data2.Plot;
                                  //log to make sure plot is saved
                                  console.log("Plot: " + moviePlot[i]);
                                  ////////
                                  //HERE IS THE PROBLEM
                                  //I CAN GET moviePlot[i] to console log but it
                                  //will remain undefined and won't be added to the page
                                  //even though i assign it to the array index above
                             });
                        }
                    });                    
                }
                //side note for grabbing movie data
                //REMEMBER TO USE CAPITALS
                //ex. data.Search[0].Title

                // create movie container div
                var movieContainer = document.createElement("div");
                movieContainer.className = "card m-3";
                resultsContainer.appendChild(movieContainer);
                // create movie container heading
                var movieHeader = document.createElement("h2");
                movieHeader.className = "card-header title is-4 p-2 bg has-text-white";
                movieHeader.textContent = "Movie Results";
                movieContainer.appendChild(movieHeader);
                // create div to hold movie results
                var movieResultsDiv = document.createElement("div");
                movieResultsDiv.className = "card-content";
                movieContainer.appendChild(movieResultsDiv);
                // loop through movie results
                for (i = 0; i < movieTitle.length; i++) {
                    // create card div
                    var movieDivEl = document.createElement("div");
                    movieDivEl.className = "card m-2";
                    movieResultsDiv.appendChild(movieDivEl);
                    // create movie title
                    var movieTitleEl = document.createElement("h3");
                    movieTitleEl.className = "card-header title is-5 p-2 bg has-text-white";
                    movieTitleEl.innerHTML = movieTitle[i];
                    movieDivEl.appendChild(movieTitleEl);
                    // create content div
                    var movieContentDiv = document.createElement("div");
                    movieContentDiv.className = "card-content has-text-centered";
                    movieDivEl.appendChild(movieContentDiv);
                    // add movie poster
                    var movieImageDiv = document.createElement("img");
                    movieImageDiv.className = "card-image has-text-centered m-3";
                    movieImageDiv.src = moviePoster[i];
                    movieContentDiv.appendChild(movieImageDiv);
                    // add movie date
                    var movieDateEl = document.createElement("h4");
                    movieDateEl.className = "card-content has-text-centered p-2";
                    movieDateEl.textContent = "Release date: " + movieDate[i];
                    movieContentDiv.appendChild(movieDateEl);
                    // add movie description       
                    var movieDescriptionEl = document.createElement("p");
                    movieDescriptionEl.className = "card-content has-text-justified";
                    movieDescriptionEl.textContent = "Plot: " + moviePlot[i];
                    movieContentDiv.appendChild(movieDescriptionEl);
                    
                };

            });
        } else {
            alert("Error getting api response");
        };
    });
};
// SUBMIT CITY EVENT LISTENER
formEl.addEventListener("submit", formSubmitHandler);

//log titles, images, descriptions