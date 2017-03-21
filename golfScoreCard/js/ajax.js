
var courses = "";
var courseSelected = "";
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

    var body = {

        latitude: 40.4196423,
        longitude: -111.8866683,
        radius: 48.2803

    };

    xhttp.send(JSON.stringify(body));
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
                }

                xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/"+course.id, true);

                var body = {

                    latitude: 40.4196423,
                    longitude: -111.8866683,
                    radius: 48.2803

                };

                xhttp.send(JSON.stringify(body));

            };
            return;
        }

    });

    function updateHoleTabs() {

    }
    function updateMeasurement(){

    }

    function updatePar() {

    }

    function updateParTotal() {
        var par = document.querySelectorAll(".par");
        var par1 = par[0].querySelectorAll(".possible");
        var par2 = par[1].querySelectorAll("possible");
        var outPar = 0;
        var inPar = 0;

        for (var i = 0; i < par1.length; i++) {
            outPar += Number(par1[i].innerText);
            inPar += Number(par2[i].innerText);
        }
    }

}