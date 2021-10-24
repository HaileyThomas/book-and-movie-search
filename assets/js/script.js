// VARIABLES
var formEl = document.querySelector(".city-form");
var inputEl = document.querySelector("#city");
//example vars
var search = "harry potter";
var search2;
// FORM SUBMIT HANDLER
var formSubmitHandler = function (event) {
    // prevent page from reloading
    event.preventDefault();
    // get value from input element
    sign = inputEl.value.trim();
    // run get city function
    getCity();
};

// GET AFFIRMATION
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
                // console log affirmation
                console.log(data.affirmation);
                //declare element for affirmation and add it to page
            });
        } else {
            alert("Error getting api response");
        };
    });
};

// GET HOROSCOPE

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
                // console log

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