const apiKey = "a3572b9807794efb86225257190406";
const weatherUrl = "https://api.apixu.com/v1/forecast.json?key=";


$(document).ready( () => {
    $("#location").focus();
    getWeather("&q=Sedona");
    $("html").animate({"opacity": "1"}, 1500);
    // Event listeners
    $("#searchBar").on("submit", (event) => {
        event.preventDefault();
        let locSearch = "&q=" + $("#location").val();
        getWeather(locSearch);
    });

});

let loader = (mode) => {
    if (mode === "up") {
        $(".weatherBox").animate({opacity: "0.4"}, 100);
        $("#searchBar").animate({opacity: "0.4"}, 100);
        $("#location").val("");
    } else if (mode === "down") {
        reset();
    } else if (mode === "error") {
        $("#location").attr("placeholder", "Error: Please try again.");
        $("#searchBar").animate({opacity: "0.85"}, 400);
        $(".weatherBox").animate({opacity: "0.4"}, 400);
    }
}

let reset = () => {
    $("#location").attr("placeholder", "Enter a City Name");
    $("#searchBar").animate({opacity: "0.85"}, 400);
    $(".weatherBox").animate({opacity: "0.85"}, 400);
}

let getWeather = async (location) => {
    loader("up");
    const urlToFetch = `${weatherUrl}${apiKey}${location}`
    try {
        response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            $("#city").text(jsonResponse.location.name);
            $("#state").text(jsonResponse.location.region);
            $("#icon").attr("src", jsonResponse.forecast.forecastday[0].day.condition.icon);
            $("#currentTemp").text(jsonResponse.current.temp_f);
            $("#condition").text(jsonResponse.current.condition.text)
            $("#wind").text(jsonResponse.current.wind_mph);
            $("#direction").text(jsonResponse.current.wind_dir);
            $("#high").text(jsonResponse.forecast.forecastday[0].day.maxtemp_f);
            $("#low").text(jsonResponse.forecast.forecastday[0].day.mintemp_f);
            $("#humidity").text(jsonResponse.current.humidity);
            loader("down");
        } else {
            loader("error");
        }
    } catch (error) {
        console.log(error);
    }
};