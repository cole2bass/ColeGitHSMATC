
var holes;

var location1 = {
    lat: 0,
    lng: 0
};
var location2 = {
    lat: 0,
    lng: 0
};

var center = {
    lat: 0,
    lng: 0
};

function displayHole(index) {

    location1 = holes[index].position1;
    location2 = holes[index].position2;
    var lat = (location1.lat + location2.lat)/2, lng = (location1.lng + location2.lng)/2;

    center = new Position(0,0);
    center.lat = lat;
    center.lng = lng;

    initMap();

}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: center,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });
    var marker1 = new google.maps.Marker({
        position: location1,
        map: map,
        label: {text: "Green", color: "white"}
    });
    var marker2 = new google.maps.Marker({
        position: location2,
        map: map,
        label: {text: "Tee Off", color: "white"}
        // icon: "img/flagIcon1.png"

    });


}