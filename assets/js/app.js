var friendNumber = 0;
var friendNumberInList = 0;
var friendCount = 0;
var newFriendNumber = 0;
var i = 0;
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
    $(this).addClass("active");
    $('#friendCardName').text($(this).text());
    $("#friendInfo").show();
    friendNumberInList = $(this).attr("data-friendnumber");
    birthdayLog = friendsArray[friendNumberInList].birthday;
    facebookLog = friendsArray[friendNumberInList].facebook;
    nameLog = friendsArray[friendNumberInList].friendNameIs;
    $("#birthdayText").text(birthdayLog);
    $("#facebookText").text(facebookLog);
    $("#friendCardName").text(nameLog);
    
});
$("#searchFriendsBtn").on("click", function(e) {
    e.preventDefault();
    if (friendArray.length == 0) {
        alert('add some friends');
    }
    searchText = $("#searchFriendsText").val();
    console.log(searchText);
    for (i = 0; i < friendArray.length; i++) {
        if (friendArray[i] === searchText) {
            console.log("it's a match");
            $("#listOfFriends").show();
            $('#friendCardName').text(friendArray[i]);
            return true;
        }
    }
});
$("#addFriendsLink").on("click", function() {
    $("#addFriends, #friendInfo").show();
    $("#pageTitle").text("Add Friends");
    $(this).parent().addClass("active");
    $("#viewFriendsLink").parent().removeClass("active");
    $("#pageTitle").text("Add Friends");
    $("#listOfFriends").hide();
    $("#friendInfo").hide();


})
$("#viewFriendsLink").on("click", function() {
    $("#addFriends").hide();
    $("listOfFriends").show();
    $(this).parent().addClass("active");
    $("#addFriendsLink").parent().removeClass("active");
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
    if (editInfoBtn) {
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
    if(localStorage.getItem("friendInfo") === null) {
        return false;
    } else {
        friendsArray = JSON.parse(localStorage.getItem("friendInfo"));
        if(friendsArray.length == 0) {
            $('#noFriendsList').show();
            console.log("empty");
        } else {
            $('#noFriendsList').hide();
            for (var k = 0; k < friendsArray.length; k++) {
                $("#friendsList").append('<li class="list-group-item friendItem" data-friendnumber='+friendCount+'>' + friendsArray[k].friendNameIs + '</li>');
                friendCount++;
            }
            console.log("full");
        }
    }
    
});