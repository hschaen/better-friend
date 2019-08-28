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
//Objects
var friendFullInfo = {};
var sv1 = {};
var setFriendFullInfo = {};
//Booleans
var editInfoBtn = true;
var bdayAlert = true;
var addFriendScreen = true;
var signIn = false;
var signingIn = true;
var searchFriendScreen = false;
var viewFriendScreen = false;
//Integers
var friendNumber = 0;
var friendNumberInList = 0;
var friendCount = 0;
var newFriendNumber = 0;
var fNum = 0;
var friendInfoNumber = 0;
var userNameArrayOrder = 0;
var today = 0;
var userNameInArray = 0;
var yyyy = 0;
//Misc
var userCheck;
var uiConfig;
var ui;

// Sign Out Function
function signOut() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("signed out");
        $("#app-container").hide();
        $("#loading-screen").show();
        signIn = false;
        ref.child(userName).update({
            signedIn: false
        });
        localStorage.setItem("loggedIn", false);
        $('#friendsList').empty();
        $('#friendInfo').hide();
        $('#my-nav').removeClass('show');

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
    if (today === isBirthday) {
        if(bdayAlert === true) {
            alert("Today is " + $(".friendItem.active").text() + "'s Birthday. Say Happy Birthday!");
            bdayAlert = false;
        }
    } else {
        console.log("not your bday, sry.");
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
    $("#signInInputEmail1, #pw2, #sign-in-link-text").hide();
    $("#signInHeader").text("Sign In");
    $("#signInSubmit").text("Sign In");
    $("#signInForm input").val("");
    signingIn = true;
    
}
// Show Create Account Form
function showCreateAccount() {
    $("#signInInputEmail1, #pw2, #sign-in-link-text").show();
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
        for (var k = 0; k < getFriends.length; k++) { // otherwise show list of friends
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
        friendNumber: friendNumberInList,
        friendNameIs: friendName,
        email: emailText,
        phone: phoneText,
        address: addressText,
        birthday: birthdayText,
        facebook: facebookText,
        instagram: instagramText
    });
}

// Add new friend to database
function addNewFriendInfo() {
    if(getFriends.length < 15) {
        ref.child(userName + "/friend/" + friendName).update({
            friendNumber: friendNumberInList,
            friendNameIs: friendName,
            email: "name@domain.com",
            phone: "XXX-XXX-XXXX",
            address: "Street, City, State, Zip",
            birthday: "MM/DD/YYYY",
            facebook: "{{userID}}",
            instagram: "{{userID}}"
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
    if (emailLog == '' && phoneLog == '' && addressLog == '' && facebookLog == '' && instagramLog == '' && birthdayLog == '') {
        alert ("is Empty!");
    }     
    $("#friendCardName").text(nameLog);
}
// This loads the list of friends from the db
function loadFriendInfo() {
    getFriends = Object.keys(sv[userName].friend);
    // grab the name of the selected friend
    var this1 = $(".friendItem.active a").text();
    // store info about this friend in friendDeets
    friendDeets = sv[userName].friend[this1];
    console.log("friend info loaded");
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
        if (getFriends.length < 15) {
            //store friends name in var
            friendName = $("#friendsName").val();
            //create new list item       
            newFriendListItem = '<li class="list-group-item friendItem active" data-friendnumber='+friendCount+' data-friendname=' + friendName + '"><a href="#" class="friendLink" id="' + friendName + '">' + friendName + '</a><button class="btn btn-danger btn-xs removeButton" id="' + friendName + '">Remove</button></li>';
            //add new list item to list
            $("#friendsList").append(newFriendListItem);
            //store number of friends
            // --- NEED TO UPDATE GETFRIENDS ARRAY WITH NEW FRIEND NAME --- //
            newFriendNumber = getFriends.length;

            //clear input field
            $('#friendsName').val('');
            //hide on screen message
            $('#noFriendsList').hide();
            //increase friend counter
            friendCount++;
            //add new friend info to database
            addNewFriendInfo();
            //pull friend info from database
            loadFriendInfo();   
            //display friends list on screen     
            showFriendsInList();
            $("#friendCardName").text(friendName);
            $("#listOfFriends").show();
            $("#friendInfo").show();
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
// Reload app
function reloadApp() {
    $("#searchFriends, #friendInfo, #phoneForm, #addressForm, #birthdayForm, #facebookForm, #instagramForm, #emailForm, #app-container, #pw2, #sign-in-link-text, #signInInputEmail1, #backBtn").hide();
    $("#addFriends, #addFriend, #listOfFriends").show();
    $("#my-nav li").removeClass("active");
    $("#addFriendsLink").closest("li").addClass("active");
    $("#pageTitle").text("Add Friends");

    addFriendScreen = true;
    viewFriendScreen = false;
    searchFriendScreen = false;
}
function savedInfo() {
    $("#birthdayForm, #facebookForm, #phoneForm, #instagramForm, #addressForm, #emailForm").hide();
    $("#birthdayInfo, #facebookInfo, #phoneInfo, #instagramInfo, #addressInfo, #emailInfo").show();
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
    $("#addFriends").hide();
    $("#listOfFriends").show();
    $("#my-nav li").removeClass("active");
    $(this).parent().addClass("active");
    $(".friendItem").removeClass("active");
    $("#pageTitle").text("View Friends");
    $("#friendInfo").hide();
    $("#searchFriends").hide();
    addFriendScreen = false;
    viewFriendScreen = true;
    searchFriendScreen = false;
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
        if(friendDeets.phone == "XXX-XXX-XXXX") {
            $("#phoneInput").val("");
            $("#phoneInput").attr("placeholder", phoneLog);
        } else {
            $("#phoneInput").val(friendDeets.phone);
        }
        //emailInfo
        if(friendDeets.email == "name@domain.com") {
            $("#emailInput").val("");
            $("#emailInput").attr("placeholder", emailLog);
        } else {
            $("#emailInput").val(friendDeets.email);
        }
        //addressInfo
        if(friendDeets.address == "Street, City, State, Zip") {
            $("#addressInput").val("");
            $("#addressInput").attr("placeholder", addressLog);
        } else {
            $("#addressInput").val(friendDeets.birthday);
        }
        //birthdayInfo
        if(friendDeets.birthday == "MM/DD/YYYY") {
            $("#birthdayInput").val("");
            $("#birthdayInput").attr("placeholder", birthdayLog);
        } else {
            $("#birthdayInput").val(friendDeets.birthday);
        }
        //facebookInfo 
        if(friendDeets.facebook == "{{userID}}") {
            $("#facebookInput").val("");
            $("#facebookInput").attr("placeholder", "{{userid}}");
        } else {
            $("#facebookInput").val(friendDeets.facebook);
        }
        
        //instagram info
        if(friendDeets.instagram == "{{userID}}") {
            $("#instagramInput").val("");
            $("#instagramInput").attr("placeholder", "{{userid}}");
        } else {
            $("#instagramInput").val(friendDeets.instagram);
        }
        // layout adjustments on button click
        $("form#birthdayForm, form#facebookForm, form#addressForm, form#phoneForm, form#instagramForm, form#emailForm").show()
        $("#birthdayInfo, #facebookInfo, #addressInfo, #phoneInfo, #instagramInfo, #emailInfo").hide();

        // disable ability to select another friend when one is being edited
        $("#friendsList li").addClass("disabled");
        // change edit btn text to save button text
        $(this).text("Save Info");
        //change btn state
        editInfoBtn = false;
    } else {
        console.log("save info activated");
        birthdayText = $("#birthdayInput").val();
        addressText = $("#addressInput").val();
        emailText = $("#emailInput").val();
        phoneText = $("#phoneInput").val();
        instagramText = $("#instagramInput").val();
        facebookText = $("#facebookInput").val();
        friendName = $('#friendCardName').val();
        
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
        facebookInfo = facebookText;
        if (emailText == '' && phoneText == '' && addressText == '' && facebookText == '' && instagramText == '' && birthdayText == '') {
            alert("is Empty!"); 
        } else {
        updateFriendInfo();
        }
        savedInfo();
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

$("#signOut").on("click", function() {
    signOut();
});
$("#backBtn").on("click", function() {
   backBtnLogic();
});
$(document).on("click", ".friendLink", function() { //what happens when you click on a friend in your friend list
    $('.friendItem').removeClass("active");
    $(this).parent().addClass("active");
    friendNumberInList = $(this).parent().attr("data-friendnumber");
    console.log(friendNumberInList);
    $("#friendInfo, #backBtn").show();
    $("#addFriend, #listOfFriends").hide();
    $("#pageTitle").text("Friend Info");
    loadFriendInfo();
    showFriendInfo();
    yourBirthday();
});
$(document).on("click", ".removeButton", function() {
    var removeBtnName = $(this).attr('id');
    ref.child(userName + "/friend/" + $(this).attr("id")).remove();
    $(this).closest('li').remove();
    $("#friendInfo").hide();
    loadFriendInfo();
});
$("#userNameField").on("change", function() {
    userName = $(this).val();
    console.log("changed");
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
        } else {
            $("#yourUserName").text('Username is Not Available!');
        }
    }
});
$(document).ready(function() {
    
    $("#searchFriends, #friendInfo, #phoneForm, #addressForm, #birthdayForm, #facebookForm, #instagramForm, #emailForm, #app-container, #pw2, #sign-in-link-text, #signInInputEmail1, #backBtn").hide();
    addFriendScreen = true;
    
});
firebaseDB;

  //To Do:
  // Fix for loop being called everytime the username field changes
  // 
  // Do not add a new account if email address exists
  // Autocomplete Search Friends
  // Friends list must match friends array and be alphabetical
  // store logged out if page refreshes or user closes the tab. Should work with sessionstorage flag.

  //update each current friend in list with a friendnumber whenever the friend list populates
  // also update data attribute on parent li to match friendnumber