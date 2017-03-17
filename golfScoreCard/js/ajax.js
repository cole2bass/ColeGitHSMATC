
var courses = "";
var courseSelected = "";

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
            courseSelected = course;
        }

    });



}