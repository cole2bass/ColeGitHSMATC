
var holes;

function Hole(){

}

function updateMapData(courseSelected) {



}

function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var newPos = {lat: -23.002, lng: 90.304};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru
    });
    var marker1 = new google.maps.Marker({
        position: uluru,
        map: map,
        label: {text: "1"}
    });
    var marker2 = new google.maps.Marker({
        position: newPos,
        map: map,
        label: {text: "2"}
    });


}