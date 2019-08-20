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
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var ref = database.ref("/user-data");
var friendNumber = 0;
var friendNumberInList = 0;
var friendCount = 0;
var newFriendNumber = 0;
var fNum = 0;
var friendInfoNumber = 0;
var userNameArrayOrder = 0;
var numberInList = "";
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
var setFriendFullInfo = {};
var friendArray = [];
var friendsArray = [];
var con = [];
var keyArray = [];
var userNameArray = [];
var passwordArray = [];
var array1 = [];
var friendFullInfo = {};
var editInfoBtn = true;
var bdayAlert = true;
var today = 0;
var userNameInArray = 0;
var dd = "";
var mm = "";
var yyyy = 0;
var userCheck;
var uiConfig;
var ui;
var userID = "";
var userInfo = [];
var friendInfoArray = [];
var friendInfoText = '';
var signIn = false;
var signingIn = true;
var userName = '';
var password = '';
var password2 = '';
var sv = '';
var childKey = '';
var childData = '';
var sv1 = {};
var sv2 = '';
var x = '';
var userNamePW = '';
var getFriends = [];
function logIn() {
    uiConfig = {
    signInSuccessUrl: 'http://127.0.0.1:5500/better-friend/index.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: 'https://www.privacypolicytemplate.net/live.php?token=rrX3WIhxFTHXc1isGnRfTgisgXIeJ3ZY',
        // Privacy policy url/callback.
        privacyPolicyUrl: function() {
        window.location.assign('https://www.privacypolicytemplate.net/live.php?token=rrX3WIhxFTHXc1isGnRfTgisgXIeJ3ZY');
        }
    };
    // Initialize the FirebaseUI Widget using Firebase.
    ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
}
function storeUserinfo() {
    userInfo = JSON.parse(firebase.auth().currentUser.uid);
    // userID = firebase.auth().currentUser.uid;
    console.log(userInfo);
}
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
}
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
// function addFriendNamesToArray() {
//     // console.log("fired");
//     for (var f = 0; f < getFriends.length; f++) {
//         friendArray.push(friendsArray[f].friendNameIs);
//     } 
// }
function friendLookUp() {
    $("#friendInfo").show();
    // addressLog = friendsArray[fNum].address;
    // phoneLog = friendsArray[fNum].phone;
    // instagramLog = friendsArray[fNum].instagram;
    // birthdayLog = friendsArray[fNum].birthday;
    // facebookLog = friendsArray[fNum].facebook;
    // emailLog = friendsArray[fNum].facebook;
    // // nameLog = friendsArray[fNum].friendNameIs;
    // $("#birthdayText").text(birthdayLog);
    // $("#facebookText").text(facebookLog);
    // $("#instagramText").text(instagramLog);
    // $("#phoneText").text(phoneLog);
    // $("#emailText").text(emailLog);
    // $("#addressText").text(addressLog);
    // $("#friendCardName").text(friendArray[fNum]);
    // yourBirthday();

}
function showSignIn() {
    $("#create-account-link-text ").show();
    $("#signInInputEmail1, #pw2, #sign-in-link-text").hide();
    $("#signInHeader").text("Sign In");
    $("#signInSubmit").text("Sign In");
    $("#signInForm input").val("");
    signingIn = true;
}
function showCreateAccount() {
    $("#signInInputEmail1, #pw2, #sign-in-link-text").show();
    $("#create-account-link-text").hide();
    $("#signInHeader").text("Create an Account");
    $("#signInSubmit").text("Create Account");
    signingIn = false;
    array1.length = 0;
}
function showFriendsInList() {
    if(getFriends.length == 0) { //if there are no objects in the arrray, show message
        $('#noFriendsList').show();
    } else {
        $('#noFriendsList').hide();
        for (var k = 0; k < getFriends.length; k++) { // otherwise show list of friends
            $("#friendsList").append('<li class="list-group-item friendItem" data-friendnumber='+friendCount+'>' + getFriends[k] + '</li>');
            friendCount++;
        }
    }
}
function updateFriendInfo() {
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
$("#addFriendBtn").on("click", function(e) {
    e.preventDefault();
    addFriendName = $('#friendsName').val().trim();
    if (getFriends.indexOf(addFriendName) > -1) {
        alert("already added!");
        return false;
    }
    if (addFriendName === '') {
        alert("Enter a name.");
        return false; 
    } else {
        friendName = $("#friendsName").val();       
        newFriendListItem = '<li class="list-group-item friendItem" data-friendnumber='+friendCount+'>' + friendName + '</li>';
        $("#friendsList").append(newFriendListItem);
        // friendArray.push(friendName);
        // console.log(friendArray);
        newFriendNumber = friendArray.length;
        // friendsArray.push({friendNameIs:friendName, email: "name@domain.com", birthday: "MM/DD/YYYY", facebook: "{{userid}}", instagram: "{{userid}}", phone: "XXX-XXX-XXXX", address: "Street, City, State, Zip"});
        // localStorage.setItem("friendInfo", JSON.stringify(friendsArray));
        $('#friendsName').val('');
        $('#noFriendsList').hide();
        friendCount++;
        updateFriendInfo();
    }
});
$(document).on("click", ".friendItem", function() {
    
    $('.friendItem').removeClass("active");
    $(this).addClass("active");
    friendNumberInList = $(this).attr("data-friendnumber");
    $("#friendInfo").show();
    loadFriendInfo();
    
    facebookLog = friendDeets.facebook;
    addressLog = friendDeets.address;
    phoneLog = friendDeets.phone;
    emailLog = friendDeets.email;
    instagramLog = friendDeets.instagram;
    nameLog = friendDeets.friendNameIs;
    birthdayLog = friendDeets.birthday;
    // friendNameIs = $(this).val();
    // friendDeets = sv[userName].friend["Kris"];

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
    yourBirthday();

});
$("#searchFriendsBtn").on("click", function(e) {
    e.preventDefault();
    $(".friendItem").removeClass("active");
    $("#listOfFriends, #friendInfo").hide();
    searchText = $("#searchFriendsText").val();
    console.log(searchText);
    if (friendArray.length === 0) {
        alert('add some friends');
        return false;
    } 
    for (var m = 0; m < friendArray.length; m++) {
        if (friendArray[m] === searchText) {
            console.log("it's a match");

            $('.friendItem').removeClass("active");

            $("#listOfFriends").show();
            $("[data-friendnumber='" + m + "'").addClass("active");
            $("#friendInfo").show();
            fNum = m;
            $('#friendCardName').text(friendArray[fNum]);
            friendLookUp();
            return true;
        }
    }
});
$("#addFriendsLink").on("click", function() {
    $("#addFriends, #friendInfo").show();
    $("#pageTitle").text("Add Friends");
    $(this).parent().addClass("active");
    $("#viewFriendsLink").parent().removeClass("active");
    $(".friendItem").removeClass("active");

    $("#pageTitle").text("Add Friends");
    if (friendArray.length != 0) {
        $("#listOfFriends").show();
    } else {
        $("#listOfFriends").hide();
    }
    $("#friendInfo, #searchFriends").hide();


})
$("#viewFriendsLink").on("click", function() {
    $("#addFriends").hide();
    $("listOfFriends").show();
    $(this).parent().addClass("active");
    $("#addFriendsLink").parent().removeClass("active");
    $(".friendItem").removeClass("active");
    $("#pageTitle").text("View Friends");
    $("#friendInfo").hide();
    $("#searchFriends").hide();
});
$("#searchFriendsLink").on("click", function() {
    $("#addFriends").hide();
    $(this).parent().addClass("active");
    $("#addFriendsLink").parent().removeClass("active");
    $("#pageTitle").text("Search Friends");
    $("#friendInfo").hide();
    $("#searchFriends").show();
    $("#listOfFriends").hide();
});
$("#saveInfo").on("click", function() {
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
        if(friendDeets.facebook == "{{userid}}") {
            $("#facebookInput").val("");
            $("#facebookInput").attr("placeholder", "{{userid}}");
        } else {
            $("#facebookInput").val(friendDeets.facebook);
        }
        
        //instagram info
        if(friendDeets.instagram == "{{userid}}") {
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
        friendName = $(".friendItem.active").text();
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
            //Create the object
            // friendsArray[friendNumberInList] = {friendNameIs: friendName, email: emailText, phone: phoneText, address: addressText, birthday: birthdayText, facebook: facebookText, instagram: instagramText}
            // //Save the object locally
            // localStorage.setItem("friendInfo", JSON.stringify(friendsArray));
            //Save to Firebase
            // usersRef = ref.child(userKey);

           updateFriendInfo();
        }
        $("#birthdayForm, #facebookForm, #phoneForm, #instagramForm, #addressForm, #emailForm").hide();
        $("#birthdayInfo, #facebookInfo, #phoneInfo, #instagramInfo, #addressInfo, #emailInfo").show();
        $(this).text("Saved");
        setTimeout(function() {
            $('#saveInfo').text("Edit Info");
        }, 500); 
            
        $("#friendsList li").removeClass("disabled");
        editInfoBtn = true;
    }
});
$("#createAccount").on("click", function() {
    showCreateAccount();
});
$("#signIntoAccount").on("click", function() {
    showSignIn();
});
$("#signInSubmit").on("click", function(event) {
    event.preventDefault();
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
                // console.log("phase1: " + userName);
                if(password == userNamePW) {
                    // console.log("phase2: " + password + " " + userNamePW);
                    $('#app-container').show();
                    $('#loading-screen').hide();
                    // console.log("Signing In");
                    ref.child(userName).update({
                        signedIn: true
                    });
                    // localStorage.setItem("loggedIn", true);
                    // signIn = true;
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
});
$('#fbSignIn').on("click", function() {
    logIn();
    storeUserinfo();
});
$("#signOut").on("click", function() {
    signOut();
});
$(document).ready(function() {
    
    $("#searchFriends, #friendInfo, #phoneForm, #addressForm, #birthdayForm, #facebookForm, #instagramForm, #emailForm, #app-container, #pw2, #sign-in-link-text, #signInInputEmail1").hide();
    localStorage.setItem("loggedIn", false);
    // if(localStorage.getItem("friendInfo") === null) { //check to see if there is anything in the local storage
    //     return false;
    // } else {
        // friendsArray = JSON.parse(localStorage.getItem("friendInfo")); // pull whatever is stored in local storage into a variable and then populate the friendsArray
        // addFriendNamesToArray();
    // }
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
        sv2 = array1[userNameInArray];
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
function loadFriendInfo() {
    getFriends = Object.keys(sv[userName].friend);

    // for (var q = 0; q < getFriends.length; q++) {
    //     friendArray.push(getFriends[q]);
    //     birthdayLog[q] = sv[userName]
    // }
    // 
    // console.log(getFriends);
    var this1 = $(".friendItem.active").text();
    // var this2 = $(".friendItem.active").attr("data-friendnumber")

    friendDeets = sv[userName].friend[this1];

}
  //To Do:
  // Fix for loop being called everytime the username field changes
  // 
  // Add friends and all data to logged in user
  // Do not add a new account if email address exists
  // Retrieve info from Firebase based on who is logged in
  // Store and Retrieve from various devices to same account/different accounts
