// Convert address to lat/long coords
function getMapCoords() {
    // if(sv[userName].friend[friendDeets.friendNameIs].longtitude && sv[userName].friend[friendDeets.friendNameIs].latitude) {
    //     if(sv[userName].friend[friendDeets.friendNameIs].latitude !== '' && sv[userName].friend[friendDeets.friendNameIs].longitude !== '' ) {
    //         console.log('hasCoords');
    //         hasCoords = true;
    //     }
    // }
    // if (!hasCoords) {
    //     console.log('No hasCoords');

        mapKey = "AIzaSyByFyVPWb2lJOipfRf0e1XWoiQdkopndyE";
        mapAddress = friendDeets.address;
        mapURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + mapAddress + "&key=" + mapKey;
        $.ajax({
            url: mapURL,
            method: 'GET'
        }).then(function(response) {
            long = response.results[0].geometry.location.lng;
            lat = response.results[0].geometry.location.lat;
            // place_id = response.results[0].place_id;
            // locAy = response.results[0].geometry.location;
            ref.child(userName + "/friend/" + friendDeets.friendNameIs).update({
                latitude: lat,
                longitude: long
            });
            
        });
    //     hasCoords = true;
    //     console.log('now hasCoords');

    // }
}
function initMap() {
    lat = sv[userName].friend[friendDeets.friendNameIs].latitude;
    long = sv[userName].friend[friendDeets.friendNameIs].longitude;
    coords = new google.maps.LatLng(parseFloat(lat), parseFloat(long));
    
    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(parseFloat(lat), parseFloat(long))
    };
    map = new google.maps.Map(document.getElementById('map'),
    mapOptions);
    var infowindow = new google.maps.InfoWindow({
        content: $("#friendCardName").text() + "'s House"
    });
    var marker = new google.maps.Marker({
        position: coords,
        map: map
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}
function HH() {
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
        {location: new google.maps.LatLng(parseFloat(lat), parseFloat(long)), radius: 1000, type: ['restaurant']},
        function(results, status, pagination) {
            if (status !== 'OK') return;
            createMarkers(results);
        });
    

}
function createMarkers(places) {
    //   countPlaces = 0;
    var bounds = new google.maps.LatLngBounds();
    var placesList = document.getElementById('places');
    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };
        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
        });
        console.log(place); 
        var li = document.createElement('li');
        li.innerHTML = "<a class='placeNearBy' href='#' id='" + place.name.split(" ").join("-").toLowerCase() +"' alt='view more info about " + place.name + "' data-placeid='" + place.place_id+"'>" + place.name + "</a>";
        placesList.appendChild(li);
        bounds.extend(place.geometry.location);
    }
    map.fitBounds(bounds);
}
// Creates the markers on the map
function callback(results, status) {
    console.log("calledback");
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}
// Get Google Maps Place Details
function getLocDeets() {
    var request = {
        placeId: $(".placeNearBy.active").attr("data-placeid"),
        fields: ['name', 'rating', 'formatted_phone_number', 'url', 'price_level', 'geometry', 'formatted_address', 'review']
    };
    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callback2);
}
// Show Google Place Details on Page
function callback2(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        $('#placeNameText').text("name: " + results.name);
        $('#placePriceText').text("price: " + results.price_level + "/5");
        $('#placeRatingText').text("rating: " + results.rating);
        $('#placeAddressText').text("address: " + results.formatted_address); //need to grab address from other api
        $('#placePhoneText').text("phone: " + results.formatted_phone_number);
        $('#placeURLText').text("url: " + results.url);
        $('#placeReviewsText').text("reviews: " + results.reviews[0].text);
    }
}