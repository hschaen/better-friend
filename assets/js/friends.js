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

// Show Friend Information on the Screen
function friendLookUp() {
    $("#friendInfo").show();
    showFriendInfo();
}
function showFriendsInList() {
    console.log("showing friends");
    if(getFriends.length == 0) { //if there are no objects in the arrray, show message
        $('#noFriendsList').show();
    } else {
        $('#noFriendsList').hide();
        checkForBirthdays();
        for (var k = 0; k < getFriends.length; k++) { // otherwise show list of friends
            console.log([k]);
            ref.child(userName + "/friend/" + getFriends[k]).update({
                friendNumber: friendCount
            });
            $("#friendsList").append('<li class="list-group-item friendItem" data-friendnumber='+friendCount+' data-friendname="' + getFriends[k] + '"><a href="#" class="friendLink" id="' + getFriends[k] + '">' + getFriends[k] + '</a><button class="btn btn-danger btn-xs removeButton" id="' + getFriends[k] + '">Remove</button></li>');
            // Increase friend counter so we can give each friend a unique data-friendnumber
            friendCount++;
        }
    }
}