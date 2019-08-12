var friendNumber = 0;
var friendCount = 0;
var i = 0;
var friendName = '';
var addFriendName = '';
var newFriendListItem = '';
var searchText = '';
var dataFriendNumber = '';
var friendContainer = '';
var birthdayText = '';
var friendArray = [];
var editInfoBtn = true;

$("#addFriendBtn").on("click", function(e) {
    e.preventDefault();
    addFriendName = $('#friendsName').val().trim();
    if (addFriendName === '') {
        alert("Enter a name.");
        return false;
    } else {
        friendName = $("#friendsName").val();       
        newFriendListItem = '<li class="list-group-item friendItem" data-friendnumber='+friendCount+'>' + friendName + '</li>';
        $("#friendsList").append(newFriendListItem);
        friendArray.push(friendName);
        console.log(friendArray);
        friendCount++;
        $('#friendsName').val('');
        $('#noFriendsList').hide();
    }
});
$(document).on("click", ".friendItem", function() {
    // alert($(this).text());
    $('.friendItem').removeClass("active");
    $(this).addClass("active");
    $('#friendCardName').text($(this).text());
    $("#friendInfo").show();
    
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
            // friendNumber = friendArray.indexOf(friendArray[i]);
            // $('li').removeClass("active");
            // dataFriendNumber = $('[data-friendnumber=' + friendNumber+ ']');
            // $("#friendsList").find(dataFriendNumber).focus();
            // dataFriendNumber.addClass("active");
            // friendContainer = $('#listOfFriends');
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
        console.log("edit info activated");
        birthdayInfo = $("#birthdayText").text();
        $("form#birthdayForm").show();birthdayText = $("#birthdayInput").val();

        $("#birthdayInfo").hide();
        $("#birthdayInput").attr("placeholder", birthdayInfo);
        $(this).addClass("saveBirthdayInfo").removeClass("editFriendInfo").text("Save Info");
        editInfoBtn = false;
    } else {
        console.log("save info activated");
        birthdayText = $("#birthdayInput").val();
        $("#birthdayText").text(birthdayText);
        $("#birthdayForm").hide();
        $("#birthdayInfo").show();
        $(this).addClass("editFriendInfo").removeClass("saveBirthdayInfo").text("Saved");
        setTimeout(function() {
            $('#saveInfo').text("Edit Info");
        }, 500);
        editInfoBtn = true;


    }
    
});
$(document).ready(function() {
    if(friendArray.length === 0) {
        $('#noFriendsList').show();
    }
    $("#searchFriends, #friendInfo, #birthdayForm").hide();
    
})