
var holes;

var location1 = {
    lat: 0,
    lng: 0
};
var location2 = {
    lat: 0,
    lng:0
};

function displayHole(index) {

    location1 = holes[index].position1;
    location2 = holes[index].position2;

    initMap();

}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location1
    });
    var marker1 = new google.maps.Marker({
        position: location1,
        map: map,
        label: {text: "Green"}
    });
    var marker2 = new google.maps.Marker({
        position: location2,
        map: map,
        label: {text: "Tee Off", color: "brown"}

    });


}