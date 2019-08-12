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
var setFriendFullInfo = {};
var friendArray = [];
var friendFullInfo = {};
var editInfoBtn = true;
var bd1 = '';

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
        newFriendNumber = friendArray.length;
        friendFullInfo['no' + friendCount] = {friendNameIs:friendName, birthday: "MM/DD/YYYY", facebook: "https://fb.me/{{userid}}"}
        localStorage.setItem("friendInfo", JSON.stringify(friendFullInfo));
        $('#friendsName').val('');
        $('#noFriendsList').hide();
        friendCount++;
    }
});
$(document).on("click", ".friendItem", function() {
    // alert($(this).text());
    $('.friendItem').removeClass("active");
    $(this).addClass("active");
    $('#friendCardName').text($(this).text());
    $("#friendInfo").show();
    friendNumberInList = friendArray.indexOf($(this).text());
    friendName = $(this).text();
    bd1 = JSON.parse(localStorage.getItem('friendInfo'));
    birthdayLog = bd1["no" + friendNumberInList].birthday;
    console.log(birthdayLog);
    
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
        //birthdayInfo
        birthdayInfo = $("#birthdayText").text();
        $("form#birthdayForm").show();
        birthdayText = $("#birthdayInput").val();
        $("#birthdayInfo").hide();
        $("#birthdayInput").attr("placeholder", birthdayInfo);
        $(this).addClass("saveBirthdayInfo").removeClass("editFriendInfo").text("Save Info");
        //facebookInfo
        facebookInfo = $("#facebookText").text();
        $("form#facebookForm").show();
        facebookText = $("#facebookInput").val();
        $("#facebookInfo").hide();
        $("#facebookInput").attr("placeholder", facebookInfo);
        $(this).addClass("saveBirthdayInfo").removeClass("editFriendInfo").text("Save Info");
        //change btn state
        editInfoBtn = false;
    } else {
        console.log("save info activated");
        birthdayText = $("#birthdayInput").val();
        facebookText = $("#facebookInput").val();
        if (birthdayText !== '' || facebookText !== '') {
            $("#birthdayText").text(birthdayText);
            $("#facebookText").text(facebookText);
            facebookInfo = "https://fb.me/" + facebookText;
        } else {
            alert ("is Empty!");
        }
        $("#birthdayForm, #facebookForm").hide();
        $("#birthdayInfo, #facebookInfo").show();
        $(this).addClass("editFriendInfo").removeClass("saveBirthdayInfo").text("Saved");
        setTimeout(function() {
            $('#saveInfo').text("Edit Info");
        }, 500);
        friendFullInfo['no' + friendNumberInList] = {friendNameIs:friendName, birthday: birthdayText, facebook: facebookInfo}
        setFriendFullInfo = friendFullInfo['no' + friendNumberInList]
        localStorage.setItem("friendInfo", JSON.stringify(setFriendFullInfo));
        editInfoBtn = true;


    }
    
});
$(document).ready(function() {
    if(friendArray.length === 0) {
        $('#noFriendsList').show();
    }
    $("#searchFriends, #friendInfo, #birthdayForm, #facebookForm").hide();
    
})