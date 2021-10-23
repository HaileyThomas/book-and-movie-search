// VARIABLES
var formEl = document.querySelector(".city-form");
var inputEl = document.querySelector("#city");
var city;
var latitude;
var longitude;
var roverContainer = document.getElementById("rover-container");
var roverImgUrl;
var marsTemp;
var JSO;
var sol;

// FORM SUBMIT HANDLER
var formSubmitHandler = function (event) {
    // prevent page from reloading
    event.preventDefault();
    // get value from input element
    city = inputEl.value.trim();
    // run get city function
    getCity();
};

// GET CITY
var getCity = function () {
    // format api url
    var cityApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + "6ff484b66ed5b4a802761c069566a64c";
    // make fetch request
    fetch(cityApiUrl).then(function (response) {
        //request was successful
        if (response.ok) {
            // get data from response
            response.json().then(function (data) {
                // loop over fetch response
                for (var i = 0; i < data.length; i++) {
                    // create variables
                    latitude = data[i].lat;
                    longitude = data[i].lon;
                    // run get city weather function
                    getCityWeather();
                };
            });
        } else {
            alert("Location API error!")
        };
    })
};

// GET CITY WEATHER
var getCityWeather = function () {
    // get weather api url
    var cityWeatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=" + "hourly,minutely" + "&units=" + "imperial" + "&appid=" + "d50140606331b5f0875df8b66c236b78";
    // fetch weather api url
    fetch(cityWeatherApiUrl)
        // get and parse response
        .then(function (response) {
            return response.json();
        })
        // get data and log
        .then(function (data) {
            console.log(data);
        });
};

// GET MARS TEMP
var getTemp = function () {
    //url variable
    var apiUrl = "https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0";
    //fetch request
    fetch(apiUrl).then(function (response) {
        //if successful
        if (response.ok) {
            //console log
            console.log(response);
            JSO = response.json().then(function (data) {
                console.log(data);
                console.log(JSO);
                //set temp
                sol = JSO.sol_keys;
                marsTemp = sol[1].AT.av;
                //log
                console.log(marsTemp);
            });
        }
        //else url not working
        else {
            console.log("NOT working");
        }
    });
};

// GET ROVER IMAGE
var getRoverImg = function () {
    var roverApi = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=DEMO_KEY";
    // make fetch request
    fetch(roverApi).then(function (response) {
        // if request successful
        if (response.ok) {
            // get data from response
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                // set image url
                roverImgUrl = data.latest_photos[0].img_src;
                // run display rover function
                console.log(roverImgUrl);
                var roverImg = document.getElementById("rover");
                roverImg.src = roverImgUrl;
                roverContainer.appendChild(roverImg);
            });
        } else {
            alert("Error getting api response");
        };
    });
};

// CALL FUNCTIONS
getTemp();
getRoverImg();

// SUBMIT CITY EVENT LISTENER
formEl.addEventListener("submit", formSubmitHandler);
