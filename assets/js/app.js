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
function addFriendNamesToArray() {
    console.log("fired");
    for (var f = 0; f < friendsArray.length; f++) {
        friendArray.push(friendsArray[f].friendNameIs);
    } 
}
function friendLookUp() {
    $("#friendInfo").show();
    birthdayLog = friendsArray[fNum].birthday;
    facebookLog = friendsArray[fNum].facebook;
    nameLog = friendsArray[fNum].friendNameIs;
    $("#birthdayText").text(birthdayLog);
    $("#facebookText").text(facebookLog);
    $("#friendCardName").text(friendArray[fNum]);
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
        friendsArray.push({friendNameIs:friendName, birthday: "MM/DD/YYYY", facebook: "{{userid}}"});
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
    nameLog = friendsArray[friendNumberInList].friendNameIs;
    $("#birthdayText").text(birthdayLog);
    $("#facebookText").text(facebookLog);
    $("#friendCardName").text(nameLog);
    $(this).addClass("active");
    
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
        //birthdayInfo
        $("form#birthdayForm").show();
        $("#birthdayInfo").hide();
        if(friendsArray[friendNumberInList].birthday == "MM/DD/YYYY") {
            $("#birthdayInput").val("");
            $("#birthdayInput").attr("placeholder", birthdayLog);
        } else {
            $("#birthdayInput").val(friendsArray[friendNumberInList].birthday);
        }
        $(this).text("Save Info");
        //facebookInfo 
        if(friendsArray[friendNumberInList].facebook == "{{userid}}") {
            $("#facebookInput").val("");
            $("#facebookInput").attr("placeholder", "{{userid}");
            console.log("wipey");
        } else {
            $("#facebookInput").val(friendsArray[friendNumberInList].facebook);
        }
        $("form#facebookForm").show();
        $("#facebookInfo").hide();
        $("#friendsList li").addClass("disabled");
        //change btn state
        editInfoBtn = false;
    } else {
        console.log("save info activated");
        birthdayText = $("#birthdayInput").val();
        facebookText = $("#facebookInput").val();
        friendName = $(".friendItem.active").text();
        if (birthdayText !== '' || facebookText !== '') {
            $("#birthdayText").text(birthdayText);
            $("#facebookText").text(facebookText);
            facebookInfo = facebookText;
        } else {
            alert ("is Empty!");
        }
        $("#birthdayForm, #facebookForm").hide();
        $("#birthdayInfo, #facebookInfo").show();
        $(this).text("Saved");
        setTimeout(function() {
            $('#saveInfo').text("Edit Info");
        }, 500);
        friendsArray[friendNumberInList] = {friendNameIs: friendName, birthday: birthdayText, facebook: facebookInfo}
        localStorage.setItem("friendInfo", JSON.stringify(friendsArray));
        $("#friendsList li").removeClass("disabled");
        editInfoBtn = true;
    }
});

$(document).ready(function() {
    $("#searchFriends, #friendInfo, #birthdayForm, #facebookForm").hide();
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

