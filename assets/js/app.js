var friendNumber = 0;
var friendNumberInList = 0;
var friendCount = 0;
var newFriendNumber = 0;
var fNum = 0;
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
var facebookInfo = '';
var birthdayLog = '';
var facebookLog = '';
var nameLog = '';
var bd1 = '';
var friendsNameText = '';
var setFriendFullInfo = {};
var friendArray = [];
var friendsArray = [];
var friendFullInfo = {};
var editInfoBtn = true;
var bdayAlert = true;
var today = 0;
var dd = "";
var mm = "";
var yyyy = 0;
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
function addFriendNamesToArray() {
    console.log("fired");
    for (var f = 0; f < friendsArray.length; f++) {
        friendArray.push(friendsArray[f].friendNameIs);
    } 
}
function friendLookUp() {
    $("#friendInfo").show();
    addressLog = friendsArray[fNum].address;
    phoneLog = friendsArray[fNum].phone;
    instagramLog = friendsArray[fNum].instagram;
    birthdayLog = friendsArray[fNum].birthday;
    facebookLog = friendsArray[fNum].facebook;
    emailLog = friendsArray[fNum].facebook;
    nameLog = friendsArray[fNum].friendNameIs;
    $("#birthdayText").text(birthdayLog);
    $("#facebookText").text(facebookLog);
    $("#instagramText").text(instagramLog);
    $("#phoneText").text(phoneLog);
    $("#emailText").text(emailLog);
    $("#addressText").text(addressLog);
    $("#friendCardName").text(friendArray[fNum]);
    yourBirthday();

}
$("#addFriendBtn").on("click", function(e) {
    e.preventDefault();
    addFriendName = $('#friendsName').val().trim();
    if (friendArray.indexOf(addFriendName) > -1) {
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
        friendArray.push(friendName);
        console.log(friendArray);
        newFriendNumber = friendArray.length;
        friendsArray.push({friendNameIs:friendName, email: "name@domain.com", birthday: "MM/DD/YYYY", facebook: "{{userid}}", instagram: "{{userid}", phone: "XXX-XXX-XXXX", address: "Street, City, State, Zip"});
        localStorage.setItem("friendInfo", JSON.stringify(friendsArray));
        $('#friendsName').val('');
        $('#noFriendsList').hide();
        friendCount++;
    }
});
$(document).on("click", ".friendItem", function() {
    $('.friendItem').removeClass("active");
    friendNumberInList = $(this).attr("data-friendnumber");
    $("#friendInfo").show();
    birthdayLog = friendsArray[friendNumberInList].birthday;
    facebookLog = friendsArray[friendNumberInList].facebook;
    addressLog = friendsArray[friendNumberInList].address;
    phoneLog = friendsArray[friendNumberInList].phone;
    emailLog = friendsArray[friendNumberInList].email;
    instagramLog = friendsArray[friendNumberInList].instagram;
    nameLog = friendsArray[friendNumberInList].friendNameIs;
    $("#birthdayText").text(birthdayLog);
    $("#facebookInfo").html("Facebook: <a alt='" + nameLog + "on Facebook' href='https://facebook.com/" + facebookLog + "'>https://facebook.com/" + facebookLog + "</a>");
    // $("#facebookText").text(facebookLog);
    $("#friendCardName").text(nameLog);
    $("#instagramText").text(instagramLog);
    $("#phoneText").text(phoneLog);
    $("#emailText").text(emailLog);
    $("#addressText").text(addressLog);
    $(this).addClass("active");
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
$(".editFriendInfo").on("click", function() {
    

});
$("#saveInfo").on("click", function() {
    if (editInfoBtn) { //if the edit button is clicked
        //phoneInfo
        if(friendsArray[friendNumberInList].phone == "XXX-XXX-XXXX") {
            $("#phoneInput").val("");
            $("#phoneInput").attr("placeholder", phoneLog);
        } else {
            $("#phoneInput").val(friendsArray[friendNumberInList].phone);
        }
        //emailInfo
        if(friendsArray[friendNumberInList].email == "name@domain.com") {
            $("#emailInput").val("");
            $("#emailInput").attr("placeholder", emailLog);
        } else {
            $("#emailInput").val(friendsArray[friendNumberInList].email);
        }
        //addressInfo
        if(friendsArray[friendNumberInList].address == "Street, City, State, Zip") {
            $("#addressInput").val("");
            $("#addressInput").attr("placeholder", addressLog);
        } else {
            $("#addressInput").val(friendsArray[friendNumberInList].birthday);
        }
        //birthdayInfo
        if(friendsArray[friendNumberInList].birthday == "MM/DD/YYYY") {
            $("#birthdayInput").val("");
            $("#birthdayInput").attr("placeholder", birthdayLog);
        } else {
            $("#birthdayInput").val(friendsArray[friendNumberInList].birthday);
        }
        //facebookInfo 
        if(friendsArray[friendNumberInList].facebook == "{{userid}}") {
            $("#facebookInput").val("");
            $("#facebookInput").attr("placeholder", "{{userid}");
        } else {
            $("#facebookInput").val(friendsArray[friendNumberInList].facebook);
        }
        
        //instagram info
        if(friendsArray[friendNumberInList].instagram == "{{userid}}") {
            $("#instagramInput").val("");
            $("#instagramInput").attr("placeholder", "{{userid}");
        } else {
            $("#instagramInput").val(friendsArray[friendNumberInList].instagram);
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
        if (birthdayText !== '' || facebookText !== '') {
            $("#birthdayText").text(birthdayText);
            $("#facebookInfo").html("Facebook: <a alt='" + friendName + "on Facebook' href='https://facebook.com/" + facebookText + "'>https://facebook.com/" + facebookText + "</a>");
            $("#instagramText").text(instagramText);
            $("#addressText").text(addressText);
            $("#phoneText").text(phoneText);
            $("#emailText").text(phoneText);
            facebookInfo = facebookText;
        } else {
            alert ("is Empty!");
        }
        $("#birthdayForm, #facebookForm, #phoneForm, #instagramForm, #addressForm, #emailForm").hide();
        $("#birthdayInfo, #facebookInfo, #phoneInfo, #instagramInfo, #addressInfo, #emailInfo").show();
        $(this).text("Saved");
        setTimeout(function() {
            $('#saveInfo').text("Edit Info");
        }, 500);
        friendsArray[friendNumberInList] = {friendNameIs: friendName, email: emailText, phone: phoneText, address: addressText, birthday: birthdayText, facebook: facebookText, instagram: instagramText}
        localStorage.setItem("friendInfo", JSON.stringify(friendsArray));
        $("#friendsList li").removeClass("disabled");
        editInfoBtn = true;
    }
});

$(document).ready(function() {
    $("#searchFriends, #friendInfo, #phoneForm, #addressForm, #birthdayForm, #facebookForm, #instagramForm, #emailForm").hide();
    if(localStorage.getItem("friendInfo") === null) { //check to see if there is anything in the local storage
        return false;
    } else {
        friendsArray = JSON.parse(localStorage.getItem("friendInfo")); // pull whatever is stored in local storage into a variable and then populate the friendsArray
        addFriendNamesToArray();
        if(friendsArray.length == 0) { //if there are no objects in the arrray, show message
            $('#noFriendsList').show();
        } else {
            $('#noFriendsList').hide();
            for (var k = 0; k < friendsArray.length; k++) { // otherwise show list of friends
                $("#friendsList").append('<li class="list-group-item friendItem" data-friendnumber='+friendCount+'>' + friendsArray[k].friendNameIs + '</li>');
                friendCount++;
            }
        }
    }
});

