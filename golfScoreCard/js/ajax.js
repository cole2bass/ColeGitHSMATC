
var courses = "";
var courseSelected = "";
var Position = function(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
};
var currentLocation;

var hdata = [];

var HoleData = function (position1, position2) {

    this.position1 = position1;
    this.position2 = position2;

};

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
                radius: 48
            };
            xhttp.send(JSON.stringify(body));

        }, function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:

                case error.POSITION_UNAVAILABLE:

                case error.TIMEOUT:

                case error.UNKNOWN_ERR:

                    body = {
                        latitude: 40.4196423,
                        longitude: -111.8866683,
                        radius: 48
                    };
            }
            xhttp.send(JSON.stringify(body));

        });
    }
    else {
        body = {
            latitude: 40.4196423,
            longitude: -111.8866683,
            radius: 48
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

    };

    xhttp.open("POST", "https://golf-courses-api.herokuapp.com/courses/", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currentLocation = new Position(position.coords.latitude, position.coords.longitude);
            body = {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                radius: 55//48.2803
            };
            xhttp.send(JSON.stringify(body));

        }, function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:

                case error.POSITION_UNAVAILABLE:

                case error.TIMEOUT:

                case error.UNKNOWN_ERR:

                    body = {
                        latitude: 40.4196423,
                        longitude: -111.8866683,
                        radius: 55//48.2803
                    };
            }
            xhttp.send(JSON.stringify(body));

        });
    }
    else {
        body = {
            latitude: 40.4196423,
            longitude: -111.8866683,
            radius: 55//48.2803
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
                    console.log(courseSelected);
                    updateHoleData(courseSelected);
                    updateHoleTabs();
                    updateHoleData();
                    updatePar();
                    updateMeasureType(courseSelected.measurement_type);
                    updateYardMeter();
                    // updateMeasurement()
                }

            };
            xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/"+course.id, true);

            xhttp.send();
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
        hdata = [];
        var holeDataFromJSON = courseSelected.holes;

        for (var i = 0; i < holeDataFromJSON.length; i++) {
            var position1 = holeDataFromJSON[i].green_location;
            var position2 = holeDataFromJSON[i].tee_boxes[0].location;

            hdata.push(new HoleData(position1, position2));

        }

        holes = hdata;

    }

    function updateYardMeter(){

        var holes = courseSelected.holes;
        var proOut = 0, proIn = 0, champOut = 0, champIn = 0, menOut = 0, menIn = 0, womenOut = 0, womenIn = 0;

        //For updating the yards section
        for (var i = 0; i < holes.length; i++) {
            for (var j = 0; j < holes[i].tee_boxes.length; j++) {

            }
            $(".pro.yardageRow>.yards")[i].innerHTML = holes[i].tee_boxes[0].yards;
            $(".champion.yardageRow>.yards")[i].innerHTML = holes[i].tee_boxes[1].yards;
            $(".men.yardageRow>.yards")[i].innerHTML = holes[i].tee_boxes[2].yards;
            $(".women.yardageRow>.yards")[i].innerHTML = holes[i].tee_boxes[3].yards;
            if (i < 9) {
                proOut += Number(holes[i].tee_boxes[0].yards);
                champOut += Number(holes[i].tee_boxes[1].yards);
                menOut += Number(holes[i].tee_boxes[2].yards);
                womenOut += Number(holes[i].tee_boxes[3].yards);
            }
            else if (i >= 9 && i < 18) {
                proIn += Number(holes[i].tee_boxes[0].yards);
                champIn += Number(holes[i].tee_boxes[1].yards);
                menIn += Number(holes[i].tee_boxes[2].yards);
                womenIn += Number(holes[i].tee_boxes[3].yards);
            }

        }

        proOut = champOut = menOut = womenOut = 0;
        proIn = champIn = menIn = womenIn = 0;

        //For updating the meters section
        for (var i = 0; i < holes.length; i++) {
            $(".pro.meterRow>.meters")[i].innerHTML = holes[i].tee_boxes[0].meters;
            $(".champion.yardageRow>.meters")[i].innerHTML = holes[i].tee_boxes[1].meters;
            $(".men.yardageRow>.meters")[i].innerHTML = holes[i].tee_boxes[2].meters;
            $(".women.yardageRow>.meters")[i].innerHTML = holes[i].tee_boxes[3].meters;

            if (i < 9) {
                proOut += holes[i].tee_boxes[0].meters;
                champOut += Number(holes[i].tee_boxes[1].meters);
                menOut += Number(holes[i].tee_boxes[2].meters);
                womenOut += Number(holes[i].tee_boxes[3].meters);
            }
            else if (i >= 9 && i < 18) {
                proIn += holes[i].tee_boxes[0].meters;
                champIn += Number(holes[i].tee_boxes[1].meters);
                menIn += Number(holes[i].tee_boxes[2].meters);
                womenIn += Number(holes[i].tee_boxes[3].meters);
            }
        }

    }

    function updateMeasureType(value) {
        $("#yOrM").val(value);
        updateMeasRows(value);
    }

    function updatePar() {

        var par = [];
        var parOut = 0, parIn = 0;

        for (var i = 0; i < courseSelected.holes.length; i++) {
            par.push(courseSelected.holes[i].tee_boxes[0].par);
        }
        for (var i = 0; i < par.length; i++) {
            $(".par")[i].innerHTML = par[i];

            if (i < 9) {
                parOut += Number(par[i]);
            }
            else if (i >= 9 && i < 18) {
                parIn += Number(par[i]);
            }
        }

        $("#parOut").html(parOut);
        $("#parIn").html(parIn);
        $("#parTotal").html(parOut + parIn);

    }

    function updateHandicap() {

    }

}

