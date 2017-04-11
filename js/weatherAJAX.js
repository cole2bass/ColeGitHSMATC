
var cityName = "";
var globalweather;

var Wind = function(speed) {
    this.speed = speed;
    this.direction = "";
    this.setDirection = function (deg) {
        if ((deg >= 0 && deg < 11.5) && (deg >= 348.75 && deg <= 360)) {
            this.direction =  "North";
        }
        else if (deg >= 11.25 && deg < 33.75) {
            this.direction =  "North Northeast";
        }
        else if (deg >= 33.75 && deg < 56.25) {
            this.direction = "Northeast";
        }
        else if (deg >= 56.25 && deg < 78.75) {
            this.direction = "East Northeast";
        }
        else if (deg >= 78.75 && deg < 101.25) {
            this.direction = "East";
        }
        else if (deg >= 101.25 && deg < 123.75) {
            this.direction = "East Southeast";
        }
        else if (deg >= 123.75 && deg < 146.25) {
            this.direction = "Southeast";
        }
        else if (deg >= 146.25 && deg < 168.75) {
            this.direction = "South Southeast";
        }
        else if (deg >= 168.75 && deg < 191.25) {
            this.direction = "South";
        }
        else if (deg >= 191.25 && deg < 213.75) {
            this.direction = "South Southwest";
        }
        else if (deg >= 213.75 && deg < 236.25) {
            this.direction = "Southwest";
        }
        else if (deg >= 236.25 && deg < 258.75) {
            this.direction = "West Southwest";
        }
        else if (deg >= 258.75 && deg < 281.25) {
            this.direction = "West";
        }
        else if (deg >= 281.25 && deg < 303.75) {
            this.direction = "West Northwest";
        }
        else if (deg >= 303.75 && deg < 326.25) {
            this.direction = "Northwest";
        }
        else if (deg >= 326.25 && deg < 348.75) {
            this.direction = "North Northwest";
        }
    }
}


function getWeather() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            globalweather = JSON.parse(xhttp.responseText);
            var temp = globalweather.main.temp;
            var weatherDiv = document.getElementById("weatherDiv");
            var wind = new Wind(globalweather.wind.speed);
            wind.setDirection(globalweather.wind.deg);
            weatherDiv.innerHTML = "<div>Weather: " + globalweather.weather[0].description.toUpperCase()+"</div>";
            weatherDiv.innerHTML += "<div>Wind Speed: " + wind.speed + "</div>";
            weatherDiv.innerHTML += "<div id='windDir'></div>";
            $("#windDir").html(wind.direction);
            weatherDiv.innerHTML += "<div id='temp'></div>";
            if ($("#tempSel").val() == "F") {
                temp = Math.round(Number(temp) -273);
                temp = Math.round(temp * 1.8 + 32)
                $("#temp").html("Temperature: " + temp + " F");
            }
            else if ($("#tempSel").val() == "C") {
                temp = Math.round(Number(temp) -273);
                $("#temp").html("Temperature: " + temp + " C");
            }
            else if ($("#tempSel").val() == "K") {
                $("#temp").html("Temperature: " + temp + " K")
            }
            weatherDiv.innerHTML += "<img id='theicon'/>"
            document.getElementById("theicon").src = "http://openweathermap.org/img/w/" + globalweather.weather[0].icon + ".png";
        }

    }
    xhttp.open("POST", "http://api.openweathermap.org/data/2.5/weather?q="+  cityName  + "&appid=cc8ef8e5c209d938ab3801daa42b5e31", true);
    xhttp.send();

}

function setTempStandard(value) {
    var temp = globalweather.main.temp;
    if (value == "F") {
        temp = Math.round(Number(temp) -273);
        temp = Math.round(temp * 1.8 + 32)
        $("#temp").html("Temperature: " + temp + " F");
    }
    else if (value == "C") {
        temp = Math.round(Number(temp) -273);
        $("#temp").html("Temperature: " + temp + " C");
    }
    else if (value == "K") {
        $("#temp").html("Temperature: " + temp + " K")
    }
}