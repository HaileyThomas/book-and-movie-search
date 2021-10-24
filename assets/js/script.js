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

// GET AFFIRMATION
var getAffirmation = function () {
    var affirmUrl = "https://www.affirmations.dev";
    // make fetch request
    fetch(affirmUrl).then(function (response) {
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

var getHoroscope = function() {
    var horoUrl = "https://aztro.sameerkumar.website?sign=" + sign + "&day=" + day;
    // make fetch request
    fetch(horoUrl).then(function (response) {
        // if request successful
        if (response.ok) {
            // get data from response
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                // console log
                console.log();
                //declare element add it to page
            });
        } else {
            alert("Error getting api response");
        };
    });
}

// CALL FUNCTIONS
getAffirmation();
getHoroscope();
// SUBMIT CITY EVENT LISTENER
formEl.addEventListener("submit", formSubmitHandler);
