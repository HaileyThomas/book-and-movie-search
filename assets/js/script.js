// VARIABLES
var formEl = document.querySelector(".city-form");
var inputEl = document.querySelector("#city");
//example vars
var sign = "leo";
var day = "today";
// FORM SUBMIT HANDLER
var formSubmitHandler = function (event) {
    // prevent page from reloading
    event.preventDefault();
    // get value from input element
    sign = inputEl.value.trim();
    // run get city function
    getCity();
};

// GET HOROSCOPE

var getHoroscope = function() {
    var horoUrl = "https://api.nytimes.com/svc/books/v3/lists.json";    // make fetch request
    fetch(horoUrl)
    .then(function (response) {
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
getHoroscope();
// SUBMIT CITY EVENT LISTENER
formEl.addEventListener("submit", formSubmitHandler);
