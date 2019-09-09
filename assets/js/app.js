// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCVAEkhIF_68CzFDmBXqzmHVdkqxz07GVM",
    authDomain: "better-friend-app.firebaseapp.com",
    databaseURL: "https://better-friend-app.firebaseio.com",
    projectId: "better-friend-app",
    storageBucket: "better-friend-app.appspot.com",
    messagingSenderId: "826334661400",
    appId: "1:826334661400:web:2c7de318313607c2"
};
// Initialize Firebase
var firebaseDB = firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var ref = database.ref("/user-data");

// Init global vars
// Strings
var numberInList = '';
var friendName = '';
var friendNameIs = '';
var addFriendName = '';
var newFriendListItem = '';
var searchText = '';
var dataFriendNumber = '';
var friendContainer = '';
var isBirthday = '';
var birthdayText = '';
var facebookText = '';
var friendDeets = '';
var facebookInfo = '';
var birthdayLog = '';
var facebookLog = '';
var nameLog = '';
var bd1 = '';
var friendsNameText = '';
var userKey = '';
var dd = '';
var mm = '';
var x = '';
var userNamePW = '';
var friendInfoText = '';
var userName = '';
var password = '';
var password2 = '';
var sv = '';
var childKey = '';
var childData = '';
var userID = '';
var friendsBday = '';
var userEmail = '';
var userNameEmail = '';
var mapURL = '';
var mapAddress = '';
var mapKey = '';
var place_id = '';
var placeContent1 = '';
var placeContent2 = '';
var placeContent3 = '';
var workName = '';
var workNameText = '';
var workNameLog = '';
var placeOfOriginText = '';
var placeOfOriginLog = '';
var placeOfOrigin = '';
var sunSign = '';
var formatted_phone_number = '';
var hScopeApi = '';
//Arrays
var friendArray = [];
var friendsArray = [];
var con = [];
var keyArray = [];
var userNameArray = [];
var passwordArray = [];
var array1 = [];
var userInfo = [];
var friendInfoArray = [];
var getFriends = [];
var friendListItems = [];
var svEmails = [];
var placePhone = [];
var array2 = [];
//Objects
var sv1 = {};
var xyo = {};

//Booleans
var editInfoBtn = true;
var bdayAlert = true;
var addFriendScreen = true;
var signIn = false;
var signingIn = true;
var searchFriendScreen = false;
var viewFriendScreen = false;
var blockSignIn = true;
var blockSignInUN = true;
var hasCoords = false;
var placeDeets = false;
var friendInfoAddl = false;

//Integers
var friendNumber = 0;
var friendNumberInList = 0;
var friendCount = 1;
var today = 0;
var userNameInArray = 0;
var yyyy = 0;
var long = 0;
var lat = 0;
var countPlaces = 0;
// Other
var map;
var service;
var infowindow;
var coords;
var locAy;
var priceLevel;
var placeDetail;


//Horoscope
function horoscopeFun() {
    switch(birthdayLog.substring(0,2)) {
        case "01":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 19) {
                sunSign = "Capricorn";
            } else {
                sunSign = "Aquarius";
            }
            break;
        case "02":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 18) {
                sunSign = "Aquarius";
            } else {
                sunSign = "Pisces";
            }
            break;
        case "03":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 20) {
                sunSign = "Pisces";
            } else {
                sunSign = "Aries";
            }
            break;
        case "04":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 19) {
                sunSign = "Aries";
            } else {
                sunSign = "Taurus";
            }
            break;
        case "05":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 20) {
                sunSign = "Taurus";
            } else {
                sunSign = "Gemini";
            }
            break;
        case "06":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 20) {
                sunSign = "Gemini";
            } else {
                sunSign = "Cancer";
            }
            break;
        case "07":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 22) {
                sunSign = "Cancer";
            } else {
                sunSign = "Leo";
            }
            break;
        case "08":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 22) {
                sunSign = "Leo";
            } else {
                sunSign = "Virgo";
            }
            break;
        case "09":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 22) {
                sunSign = "Virgo";
            } else {
                sunSign = "Libra";
            }
            break;
        case "10":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 22) {
                sunSign = "Libra";
            } else {
                sunSign = "Scorpio";
            }
            break;
        case "11":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 21) {
                sunSign = "Scorpio";
            } else {
                sunSign = "Sagittarius";
            }
            break;
        case "12":
            if(parseInt($("#birthdayText").text().substring(3,5)) <= 21) {
                sunSign = "Sagittarius";
            } else {
                sunSign = "Capricorn";
            }
            break;
    }
    // var hScopeApi = "http://sandipbgt.com/theastrologer/api/horoscope/"+ sunSign.toLowerCase() + "/today";
    var hScopeApi = "http://horoscope-api.herokuapp.com/horoscope/today/"+ sunSign.toLowerCase();
    jQuery.support.cors = true;

    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
    $.get(hScopeApi).then(function(response) {
        // xyo = JSON.parse(response);
        xyo = response;
        $("#hScopeText").text(xyo.horoscope);
        $("#sunSign").text(sunSign);
        $("#horoscope").show();
        $("#phone, #email, #address, #address, #birthday, #facebook, #instagram, #notes, #backBtn, #moreFriendInfoLink, #viewHistoryLink ").hide();
        $('#saveInfo').attr("disabled", true);
    });
}

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
// Show View Friends
function viewFriendsLink() {
    $("#my-nav li, .friendItem").removeClass("active");
    $('#viewFriendsLink').parent().addClass("active");
    $("#pageTitle").text("View Friends");
    $("#listOfFriends").show();
    $("#friendInfo, #backBtn, #searchFriends, #addFriends").hide();
    addFriendScreen = false;
    viewFriendScreen = true;
    searchFriendScreen = false;
}
// Sign Out Function
function signOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("signed out");
        $("#app-container").hide();
        $("#loading-screen").show();
        signIn = false;
        bdayAlert = true;
        ref.child(userName).update({
            signedIn: false
        });
        localStorage.setItem("loggedIn", false);
        $('#friendsList').empty();
        $('#friendInfo').hide();
        $('#my-nav').removeClass('show');
        $('#signInSubmit').attr("disabled", true);
        blockSignIn = true;
    }).catch(function(error) {
        // An error happened.
        console.log("error");
    });
    reloadApp();
}
//If today is your friends birthday, do something
function yourBirthday() {
    today = new Date();
    dd = String(today.getDate()).padStart(2, '0');
    mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = today.getFullYear();
    today = mm + '/' + dd;
    isBirthday = birthdayLog.substring(0,5);
    // get all friends birthdays
    if (today === isBirthday) {
        if(bdayAlert === true) {
            bdayAlert = false;
        }
    }
}
//Check for birthdays
function checkForBirthdays() {
    if (bdayAlert) {
        yourBirthday();
        for (var u = 0; u < getFriends.length; u++) {
            friendsBday = sv[userName].friend[getFriends[u]].birthday;
            if (friendsBday.substring(0,5) === today) {
                alert("Happy Bday to " + getFriends[u] + " !");
            }
        }
        bdayAlert = false;
    }
}
// Show Friend Information on the Screen
function friendLookUp() {
    $("#friendInfo").show();
    showFriendInfo();
}
// Show Sign In Form
function showSignIn() {
    $("#create-account-link-text ").show();
    $("#signInInputEmail1, #pw2, #sign-in-link-text, #emailField, #yourUserName, #yourPassword").hide();
    $("#signInHeader").text("Sign In");
    $("#signInSubmit").text("Sign In");
    $("#signInForm input").val("");
    signingIn = true;
}
// Show Create Account Form
function showCreateAccount() {
    $("#emailField, #pw2, #sign-in-link-text, #yourUserName, #yourPassword").show();
    $("#create-account-link-text").hide();
    $("#signInHeader").text("Create an Account");
    $("#signInSubmit").text("Create Account");
    signingIn = false;
    //empty Array1 so we can fill it with usernames from database
    array1.length = 0;
}
// List friends from database on the screen
function showFriendsInList() {
    if(getFriends.length == 0) { //if there are no objects in the arrray, show message
        $('#noFriendsList').show();
    } else {
        $('#noFriendsList').hide();
        checkForBirthdays();
        for (var k = 0; k < getFriends.length; k++) { // otherwise show list of friends
            ref.child(userName + "/friend/" + getFriends[k]).update({
                friendNumber: friendCount
            });
            $("#friendsList").append('<li class="list-group-item friendItem" data-friendnumber='+friendCount+' data-friendname="' + getFriends[k] + '"><a href="#" class="friendLink" id="' + getFriends[k] + '">' + getFriends[k] + '</a><button class="btn btn-danger btn-xs removeButton" id="' + getFriends[k] + '">Remove</button></li>');
            // Increase friend counter so we can give each friend a unique data-friendnumber
            friendCount++;
        }
    }
}
// Update friend data in the database
function updateFriendInfo() {
    friendName = $("#friendCardName").text();
    ref.child(userName + "/friend/" + friendName).update({
        friendNameIs: friendName,
        email: emailText,
        phone: phoneText,
        address: addressText,
        birthday: birthdayText,
        facebook: facebookText,
        instagram: instagramText,
        notes: notesText,
        from: placeOfOriginText,
        workName: workNameText
    });
}

// Add new friend to database
function addNewFriendInfo() {
    if(getFriends.length < 15) {
        ref.child(userName + "/friend/" + friendName).update({
            friendNumber: friendCount,
            friendNameIs: friendName,
            email: "name@domain.com",
            phone: "XXX-XXX-XXXX",
            address: "Street, City, State, Zip",
            birthday: "MM/DD/YYYY",
            facebook: "{{userID}}",
            instagram: "{{userID}}",
            notes: "",
            from: "",
            workName: ""
        });
        // Empty friend list so we can repopulate it with alphabetized list of friends
        $("#friendsList").empty();
    } else {
        alert("You have the max number of friends (15). Try removing a friend before adding another.");
        return false;
    }
}
// Show info on screen about selected friend
function showFriendInfo() {
    loadFriendInfo();
    facebookLog = friendDeets.facebook;
    addressLog = friendDeets.address;
    phoneLog = friendDeets.phone;
    emailLog = friendDeets.email;
    instagramLog = friendDeets.instagram;
    nameLog = friendDeets.friendNameIs;
    birthdayLog = friendDeets.birthday;
    notesLog = friendDeets.notes;
    placeOfOriginLog = friendDeets.from;
    workNameLog = friendDeets.workName;
    if (birthdayLog !== '') {
        $("#birthdayText").text(birthdayLog);
    }
    if (facebookLog !== '') {
        $("#facebookInfo").html("Facebook: <a alt='" + friendName + "on Facebook' href='https://facebook.com/" + facebookLog + "'>https://facebook.com/" + facebookLog + "</a>");
    }
    if (instagramLog !== '') {
        $("#instagramText").text(instagramLog);
    }
    if (addressLog !== '') {
        $("#addressText").text(addressLog);
    }
    if (phoneLog !== '') {
        $("#phoneText").text(phoneLog);
    }
    if (emailLog !== '') {
        $("#emailText").text(emailLog);
    }
    if (notesLog !== '') {
        $("#notesText").text(notesLog);
    }
    if (workNameLog !== '') {
        $("#workNameText").text(workNameLog);
    }
    if (placeOfOriginLog !== '') {
        $("#placeOfOriginText").text(placeOfOriginLog);
    }
    if (emailLog == '' && phoneLog == '' && addressLog == '' && facebookLog == '' && instagramLog == '' && birthdayLog == '' && notesLog == '' && workNameLog == '' && placeOfOriginLog == '') {
        alert ("is Empty!");
    }     
    $("#friendCardName").text(nameLog);
}
// This loads the list of friends from the db
function loadFriendInfo() {
    if (typeof (sv[userName].friend) != "undefined") {
        getFriends = Object.keys(sv[userName].friend);
        // grab the name of the selected friend
        var this1 = $(".friendItem.active a").text();
        // store info about this friend in friendDeets
        friendDeets = sv[userName].friend[this1];
    }
}
// Add new friend to database and display on screen
function addFriendToDB() {
    $(".friendItem.active").removeClass("active");
    addFriendName = $('#friendsName').val().trim();
    //if friend name already exists in database throw error
    if (getFriends.indexOf(addFriendName) > -1) {
        alert("already added!");
        return false;
    }
    //if no name in input field throw error
    if (addFriendName === '') {
        alert("Enter a name.");
        return false; 
    } else {
        friendCount = 1;
        if (getFriends.length < 15) {
            //store friends name in var
            friendName = $("#friendsName").val();
            //create new list item       
            newFriendListItem = '<li class="list-group-item friendItem active" data-friendnumber='+friendCount+' data-friendname=' + friendName + '"><a href="#" class="friendLink" id="' + friendName + '">' + friendName + '</a><button class="btn btn-danger btn-xs removeButton" id="' + friendName + '">Remove</button></li>';
            //add new list item to list
            $("#friendsList").append(newFriendListItem);
            //store number of friends

            //clear input field
            $('#friendsName').val('');
            //hide on screen message
            $('#noFriendsList').hide();
            //increase friend counter
            addNewFriendInfo();
            //pull friend info from database
            loadFriendInfo();   
            //display friends list on screen     
            showFriendsInList();
            $("#friendCardName").text(friendName);
            $("#listOfFriends").show();
            // $("#friendInfo").show();
        } else {
            alert("You have the max number of friends (15). Try removing a friend before adding another.");
            return false;
        }
    }
}
// Search for Friend in Database and Display Results
function searchFriendInDB() {
    $("#searchMessage").hide();
    $(".friendItem").removeClass("active");
    $("#listOfFriends, #friendInfo").hide();
    searchText = $("#searchFriendsText").val();
    if (getFriends.length === 0) {
        alert('add some friends');
        return false;
    } 
    for (var m = 0; m < getFriends.length; m++) {
        if (getFriends[m] === searchText) {

            $('.friendItem').removeClass("active");

            $("[data-friendnumber='" + m + "'").addClass("active");
            $("#friendInfo").show();
            friendLookUp();
            $('#friendCardName').text(getFriends[m]);
            return true;
        }
    }
}
// Submit signin info
function submitSignInInfo() {
    if(blockSignIn || blockSignInUN) {
        return false;
    } else {

        userName =  $("#userNameField").val().trim();
        emailAddress = $("#signInInputEmail1").val().trim();
        password = $("#signInInputPassword1").val().trim();
        password2 = $("#signInInputPassword2").val().trim();
        if (signingIn == true) {
            if(password == '' || userName == '') {
                console.log("empty af!");
                return false;
            }
            if(password != '') {
                // for (var i = 0; i < array1.length; i++) {
                //     array2.push(array1[i].toLowerCase());
                // }
                if(array1.includes(userName)) {
                    if(password == userNamePW) {
                        $('#app-container').show();
                        $('#loading-screen').hide();
                        ref.child(userName).update({
                            signedIn: true
                        });
                        $("#userNameField, #signInInputPassword1 ").val('');
                        loadFriendInfo();
                        showFriendsInList();

                    } else {
                        console.log("phase2: " + password + " " + userNamePW);
                        console.log("PW doesn't match");
                    }
                } else {
                    console.log("Username doesn't exist");
                }
            }
        } else {
            if($("#signInInputPassword1").val() == '' || $("#signInInputEmail1").val() == '' || $("#signInInputPassword2").val() == '') {
                console.log("empty af!");
            }

            if (password === password2) {
                ref.child(userName).set({
                        email: emailAddress,
                        password: password,
                        signedIn: false
                });
                showSignIn();
            } else {
                console.log("Passwords don't match");
                return false;
            }
            console.log("Creating Account");
        }
    } 
}
//
function blankFieldCheck() {
    if ($('#signInInputEmail1').val() === '' ||
        $('#userNameField').val() === '' ||
        $('#signInInputPassword1').val() === '' ||
        $('#signInInputPassword2').val() === ''
        ) {
            $('#signInSubmit').attr("disabled", true);
        } else {
            $('#signInSubmit').attr("disabled", false);
        }
}
// Reload app
function reloadApp() {
    $("#searchFriends, #friendInfo, #phoneForm, #addressForm, #birthdayForm, #facebookForm, #instagramForm, #emailForm, #app-container, #emailField, #pw2, #sign-in-link-text, #backBtn, #horoscope, #notesForm, #friendInfoAdditional").hide();
    $("#addFriends, #addFriend, #listOfFriends").show();
    $("#my-nav li").removeClass("active");
    $("#addFriendsLink").closest("li").addClass("active");
    $("#pageTitle").text("Add Friends");

    addFriendScreen = true;
    viewFriendScreen = false;
    searchFriendScreen = false;
}
function savedInfo() {
    $("#birthdayForm, #facebookForm, #phoneForm, #instagramForm, #addressForm, #emailForm, #notesForm, #friendInfo, #workNameForm, #placeOfOriginForm").hide();
    $("#birthdayInfo, #facebookInfo, #phoneInfo, #instagramInfo, #addressInfo, #emailInfo, #notesTextDiv, #hScopeLink, #addressMoreLink, #listOfFriends, #moreFriendInfoLink").show();
    $(this).text("Saved");
    setTimeout(function() {
        $('#saveInfo').text("Edit Info");
    }, 500); 
    $("#friendsList li").removeClass("disabled");
    editInfoBtn = true;
}
// Logic for back button
function backBtnLogic() {
    if(addFriendScreen) {
        $("#backBtn, #friendInfo").hide();
        $("#listOfFriends, #addFriends, #addFriend").show();
        $("#pageTitle").text("Add Friends");
    }
    if(searchFriendScreen) {
        $("#backBtn, #friendInfo, #listOfFriends").hide();
        $("#searchFriends").show();
        $("#pageTitle").text("Search Friends");
    }
    if(viewFriendScreen) {
        $("#backBtn, #friendInfo, #listOfFriends").hide();
        $("#listOfFriends").show();
        $("#pageTitle").text("View Friends");
    }
}
// Trigger Add Friend Function on button click
$("#addFriendBtn").on("click", function(e) {
    e.preventDefault();
    addFriendToDB();
});
$("#searchFriendsBtn").on("click", function(e) { // what happens when you search for a friend
    e.preventDefault();
    searchFriendInDB();
});
$("#addFriendsLink").on("click", function() { // you want to see the add friends page
    $("#addFriends, #addFriend, #friendInfo").show();
    $("#pageTitle").text("Add Friends");
    $("#my-nav li").removeClass("active");
    $(this).parent().addClass("active");
    $(".friendItem").removeClass("active");

    $("#pageTitle").text("Add Friends");
    addFriendScreen = true;
    viewFriendScreen = false;
    searchFriendScreen = false;

    if (friendArray.length != 0) {
        $("#listOfFriends").show();
    } else {
        $("#listOfFriends").hide();
    }
    $("#friendInfo, #searchFriends").hide();
    savedInfo();
}); 
$("#viewFriendsLink").on("click", function() { // you want to just view your friends list
    viewFriendsLink();
    savedInfo();

});
$("#searchFriendsLink").on("click", function() { // you want to search through your friends list
    $("#addFriends").hide();
    $("#my-nav li").removeClass("active");
    $(this).parent().addClass("active");
    $("#pageTitle").text("Search Friends");
    $("#friendInfo").hide();
    $("#searchFriends").show();
    $("#listOfFriends").hide();
    addFriendScreen = false;
    viewFriendScreen = false;
    searchFriendScreen = true;
    savedInfo();

});
$("#saveInfo").on("click", function() { // if you edited a friends' info, save it.
    if (editInfoBtn) { //if the edit button is clicked
        //phoneInfo
        if(friendDeets.phone == "XXX-XXX-XXXX" || friendDeets.phone == '') {
            // $("#phoneInput").val("");
            $("#phoneInput").attr("placeholder", $("#phoneText").text());
        } else {
            $("#phoneInput").val(friendDeets.phone);
        }
        //emailInfo
        if(friendDeets.email == "name@domain.com" || friendDeets.email == '') {
            $("#emailInput").val("");
            $("#emailInput").attr("placeholder", $('#emailText').text());
        } else {
            $("#emailInput").val(friendDeets.email);
        }
        //addressInfo
        if(friendDeets.address == "Street, City, State, Zip" || friendDeets.address == '') {
            $("#addressInput").val("");
            $("#addressInput").attr("placeholder", $('#addressText').text());
        } else {
            $("#addressInput").val(friendDeets.address);
        }
        //birthdayInfo
        if(friendDeets.birthday == "MM/DD/YYYY" || friendDeets.birthday == '') {
            $("#birthdayInput").val("");
            $("#birthdayInput").attr("placeholder", $('#birthdayText').text());
        } else {
            $("#birthdayInput").val(friendDeets.birthday);
        }
        //facebookInfo 
        if(friendDeets.facebook == "{{userID}}" || friendDeets.facebook == '') {
            $("#facebookInput").val("");
            $("#facebookInput").attr("placeholder", "{{userid}}");
        } else {
            $("#facebookInput").val(friendDeets.facebook);
        }
        
        //instagram info
        if(friendDeets.instagram == "{{userID}}" || friendDeets.instagram == '') {
            $("#instagramInput").val("");
            $("#instagramInput").attr("placeholder", "{{userid}}");
        } else {
            $("#instagramInput").val(friendDeets.instagram);
        }
        //Notes info
        if(friendDeets.notes == "" || friendDeets.notes == " ") {
            $("#notesInput").val("");
        } else {
            $("#notesInput").val(friendDeets.notes);
        }

        //Origin info
        if(friendDeets.from == "" || friendDeets.from == " ") {
            $("#placeOfOriginInput").val("");
        } else {
            $("#placeOfOriginInput").val(friendDeets.from);
        }

         //Work Name info
        if(friendDeets.workName == "" || friendDeets.workName == " ") {
            $("#workNameInput").val("");
        } else {
            $("#workNameInput").val(friendDeets.workName);
        }
        
        // layout adjustments on button click
        $("form#birthdayForm, form#facebookForm, form#addressForm, form#phoneForm, form#instagramForm, form#emailForm, form#notesForm, form#workNameForm, #moreFriendInfoLink, form#placeOfOriginForm").show()
        $("#birthdayInfo, #facebookInfo, #addressInfo, #phoneInfo, #instagramInfo, #emailInfo, #horoscope, #hScopeLink, #addressMoreLink, #notesTextDiv, #workNameInfo, #placeOfOriginInfo").hide();

        // disable ability to select another friend when one is being edited
        $("#friendsList li").addClass("disabled");

        // change edit btn text to save button text
        $(this).text("Save Info");
        $('#backBtn').hide();
        //change btn state
        editInfoBtn = false;
    } else {
        birthdayText = $("#birthdayInput").val();
        addressText = $("#addressInput").val();
        emailText = $("#emailInput").val();
        phoneText = $("#phoneInput").val();
        instagramText = $("#instagramInput").val();
        facebookText = $("#facebookInput").val();
        friendName = $("#friendCardName").val();
        notesText = $("#notesInput").val();
        placeOfOriginText = $("#placeOfOriginInput").val();
        workNameText = $("#workNameInput").val();
        
        if (birthdayText !== '') {
            $("#birthdayText").text(birthdayText);
        }
        if (facebookText !== '') {
            $("#facebookInfo").html("Facebook: <a alt='" + friendName + "on Facebook' href='https://facebook.com/" + facebookText + "'>https://facebook.com/" + facebookText + "</a>");
        }
        if (instagramText !== '') {
            $("#instagramText").text(instagramText);
        }
        if (addressText !== '') {
            $("#addressText").text(addressText);
        }
        if (phoneText !== '') {
            $("#phoneText").text(phoneText);
        }
        if (emailText !== '') {
            $("#emailText").text(emailText);
        }
        if (notesText !== '') {
            $("#notesText").text(notesText);
        }
        if (placeOfOriginText !== '') {
            $("#placeOfOriginText").text(placeOfOriginText);
        }
        if (workNameText !== '') {
            $("#workNameText").text(workNameText);
        }
        facebookInfo = facebookText;
        if (emailText == '' && phoneText == '' && addressText == '' && facebookText == '' && instagramText == '' && birthdayText == '' && notesText == '' && workNameText == '' && placeOfOriginText == '') {
            alert("is Empty!"); 
        } else {
        updateFriendInfo();
        }
        savedInfo();
        viewFriendsLink();
        $("#moreFriendInfoLink").text("Show more info");
        friendInfoAddl = false;
    }
});
$("#createAccount").on("click", function() { //show the create accoubt page
    showCreateAccount();
});
$("#signIntoAccount").on("click", function() { // show the sign into account page
    showSignIn();
});
$("#signInSubmit").on("click", function(event) { // handle what happens when you click either Sign In or Create Account Button
    event.preventDefault();
    submitSignInInfo();
});
$("#moreFriendInfoLink").on("click", function() {
    // shows add'l info in save mode
    if(!friendInfoAddl) {
        if(!editInfoBtn) {
            $("#friendInfoAdditional").show();
            $(this).text("Show less info");
            friendInfoAddl = true;
        } else {
            $("#friendInfoAdditional, #workName, #workNameInfo, #placeOfOrigin, #placeOfOriginInfo").show();
            $(this).text("Show less info");
            friendInfoAddl = true;
        }
    } else{
        if(!editInfoBtn) {
            $("#friendInfoAdditional, #workNameInfo, #placeOfOriginInfo").hide();
            friendInfoAddl = false;
            $(this).text("Show more info");
        } else {
            $(this).text("Show more info");
            $("#friendInfoAdditional, #workName, #workNameInfo, #placeOfOrigin, #placeOfOriginInfo").hide();
            friendInfoAddl = false;
        }
    }
});
$("#signOut").on("click", function() {
    signOut();
});
$("#viewHistoryLink").on("click", function() {
    $("#historyPage").show();
});
$("#backBtn").on("click", function() {
   backBtnLogic();
});
$('#mapPlaceHH').on("click", function() {
   HH(); 
});
$("#addressMoreLink").on("click", function() {
    $("#email, #birthday, #address, #phone, #facebook, #instagram, #notes, #friendInfoAdditional, #backBtn, #viewHistoryLink, #moreFriendInfoLink").hide();
    $("#addressMore").show();
    document.getElementById("map").style.display = "block";
    initMap();
    // $("#mapPlaceIFrame").attr("src","https://www.google.com/maps/embed/v1/place?q=place_id:" + place_id + "&key=" + mapKey);
});
//Click the back button on the address window
$("#addressBack").on("click", function() {
    if (placeDeets) {
        $("#placeInfo").hide();
        $("#places").show();
        placeDeets = false;
    } else {
        $("#email, #birthday, #address, #phone, #facebook, #instagram, #notes, #moreFriendInfo, #backBtn, #viewHistoryLink, #moreFriendInfoLink").show();
        $("#addressMore").hide();
        $("#places").empty();
        document.getElementById("map").style.display = "none";
    }
});
// Show the horoscope for selected friend
$("#viewHScope").on("click", function() {
    horoscopeFun();
});
// Hide the horoscope page and show the friend info
$("#hScopeBack").on("click", function() {
    $("#horoscope").hide();
    $("#phone, #email, #address, #address, #birthday, #facebook, #instagram, #notes, #moreFriendInfo, #backBtn, #viewHistoryLink, #moreFriendInfoLink").show();
    $('#saveInfo').attr("disabled", false); 
});
// Show place details
$(document).on("click", ".placeNearBy", function() {
    $("#places").hide();
    $("#placeInfo").show();
    $('.placeNearBy').removeClass("active");
    $(this).addClass("active");
    getLocDeets();
    placeDeets = true;
});
// Show selected friend information
$(document).on("click", ".friendLink", function() { //what happens when you click on a friend in your friend list
    $('.friendItem').removeClass("active");
    $(this).parent().addClass("active");
    friendNumberInList = $(this).parent().attr("data-friendnumber");
    $("#friendInfo, #backBtn").show();
    $("#addFriend, #listOfFriends").hide();
    $("#pageTitle").text("Friend Info");
    loadFriendInfo();
    showFriendInfo();
    getMapCoords();
});
// Remove friend from friend list
$(document).on("click", ".removeButton", function() {
    var removeBtnConfim = confirm("Are you sure you want to remove " + friendNameIs + "from your list of friends?\nEither OK or Cancel.");
    if (removeBtnConfim) {
        ref.child(userName + "/friend/" + $(this).attr("id")).remove();
        $("#friendsList").empty();
        friendCount = 1;
        $("#friendInfo").hide();
        loadFriendInfo();
        showFriendsInList();
    } else {
        return false;
    }
});
$("#signInInputPassword1").on("change", function() {
    if (!signingIn) {
        blankFieldCheck();
    } else {
        if($('#userNameField').val() === '' || 
        $("#signInInputPassword1").val() === '') {
            $('#signInSubmit').attr("disabled", true);
            blockSignIn = true;

        } else {
            $('#signInSubmit').attr("disabled", false);
            blockSignIn = false;

        }
    }
});
$("#signInInputPassword2").on("change", function() {
    if (!signingIn) {
        blankFieldCheck();
    } 
});
$("#userNameField").on("change", function() {
    userName = $(this).val();
    ref.on("value", function(snapshot) {
        sv = snapshot.val();
        sv1 = Object.keys(sv);
        for (var k = 0; k < sv1.length; k++) {
            array1.push(sv1[k]);
        }        
        userNameInArray = array1.indexOf(userName);
        x = array1[userNameInArray];
        if(signingIn) {
            userNamePW = sv[x].password;
        } else {
        }
        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
    if (!signingIn) {
        if (userNameInArray === -1) {
            $("#yourUserName").text('Username is Available!');
            blockSignInUN = false;

        } else {
            $("#yourUserName").text('Username is Not Available!');
            blockSignInUN = true;

        }
        blankFieldCheck();
    }
    if (signingIn) {
        if($('#userNameField').val() === '' || 
        $("#signInInputPassword1").val() === '') {
            $('#signInSubmit').attr("disabled", true);
            blockSignInUN = false;

        }
    }
});
$("#signInInputEmail1").on("change", function() {
    svEmails.length = 0;
    userEmail = $(this).val();
    console.log("changed");
    ref.on("value", function(snapshot) {
        sv = snapshot.val();
        sv1 = Object.keys(sv);
        for (var k = 0; k < sv1.length; k++) {
            array1.push(sv1[k]);
            for (var s = 0; s < array1.length; s++) {
                svEmails.push(sv[array1[s]].email);
            } 
        } 
        if (svEmails.indexOf(userEmail) === -1) {
            $("#emailHelp").text("We'll never share your email with anyone else.");
            blockSignIn = false;

        } else {
            $("#emailHelp").text('Email is already associated with another account!');
            blockSignIn = true;
        }
        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
    
    if (!signingIn) {
        blankFieldCheck();
    } 
});
$(document).ready(function() {
    
    $("#addressMore, #searchFriends, #friendInfo, #phoneForm, #addressForm, #birthdayForm, #facebookForm, #instagramForm, #emailForm, #app-container, #emailField, #pw2, #sign-in-link-text, #backBtn, #horoscope, #yourUserName, #yourPassword, #friendInfoAdditional, form#notesForm, form#workNameForm, form#placeOfOriginForm, #historyPage").hide();
    addFriendScreen = true;
    $('#signInSubmit').attr("disabled", true);
    
});
firebaseDB;
