
var courses = "";
var courseSelected = "";
var Position = function(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
}
var currentLocation;
var parTotal = 0;

function getData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            courses = data.courses;
            var select = document.getElementById("selectCourse");
            select.innerHTML = "<option selected>Choose a Course, Please</option>";

            courses.forEach(function (course) {

                select.innerHTML += "<option value='" + course.id +"'> " + course.name +" </option>";

            });

        }


    };
    xhttp.open("POST", "https://golf-courses-api.herokuapp.com/courses/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    var body;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currentLocation = new Position(position.coords.latitude, position.coords.longitude);
            body = {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                radius: 48.2803
            };
            xhttp.send(JSON.stringify(body));

        }), function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:

                case error.POSITION_UNAVAILABLE:

                case error.TIMEOUT:

                case error.UNKNOWN_ERR:

                    body = {
                        latitude: 40.4196423,
                        longitude: -111.8866683,
                        radius: 48.2803
                    };
            }
            xhttp.send(JSON.stringify(body));

        };
    }
    else {
        body = {
            latitude: 40.4196423,
            longitude: -111.8866683,
            radius: 48.2803
        };
        xhttp.send(JSON.stringify(body));
    }

}

function getCourseGeoLocation() {
    document.getElementById("selectCourse").innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            courses = data.courses;
            var select = document.getElementById("selectCourse");
            select.innerHTML = "<option selected>Choose a Course, Please</option>";

            courses.forEach(function (course) {

                select.innerHTML += "<option value='" + course.id +"'> " + course.name +" </option>";

            });
        }

    }

    xhttp.open("POST", "https://golf-courses-api.herokuapp.com/courses/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currentLocation = new Position(position.coords.latitude, position.coords.longitude);
            body = {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                radius: 48.2803
            };
            xhttp.send(JSON.stringify(body));

        }), function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:

                case error.POSITION_UNAVAILABLE:

                case error.TIMEOUT:

                case error.UNKNOWN_ERR:

                    body = {
                        latitude: 40.4196423,
                        longitude: -111.8866683,
                        radius: 48.2803
                    };
            }
            xhttp.send(JSON.stringify(body));

        };
    }
    else {
        body = {
            latitude: 40.4196423,
            longitude: -111.8866683,
            radius: 48.2803
        };
        xhttp.send(JSON.stringify(body));
    }

}

function updateCard(id) {

    courses.forEach(function(course) {

        if (course.id == id) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {

                if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
                    var data = JSON.parse(xhttp.responseText);
                    courseSelected = data.course;
                    console.log(courseSelected)
                    updateMapData(courseSelected);
                    updateHoleTabs();
                    // updateMeasurement()
                }

            };
            xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/"+course.id, true);

            xhttp.send();
            return;
        }

    });

    function updateHoleTabs() {
        if (courseSelected.holes.length == 9) {
            $("#backTab").css("display", "none")
        }
        else if (courseSelected.holes.length == 18) {
            $("#backTab").css("display", "block")
        }
    }

    function updateHoleData() {

    }

    function updateMeasurement(){
        var total = 0;
        for (var i = 0; i < courseSelected.holes.length; i++) {
            $(".yards")[i].innerHTML = courseSelected.holes;
        }
    }

    function updatePar() {
        
    }

    function updateParTotal() {
                
        var outPar = 0;
        var inPar = 0;
        var total;

        
    }
    function updateHandicap() {

    }

}

