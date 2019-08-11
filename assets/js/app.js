var friendNumber = 0;
var friendCount = 0;
var friendName = '';
var newFriendListItem = '';
var searchText = '';
var friendArray = [];
$("#addFriendBtn").on("click", function(e) {
    e.preventDefault();
    friendName = $("#friendsName").val();       
    newFriendListItem = '<li class="list-group-item" data-friendNumber='+friendCount+'>' + friendName + '</li>';
    $("#friendsList").append(newFriendListItem);
    friendArray.push(friendName);
    console.log(friendArray);
    friendCount++;
});
$("#searchFriendsBtn").on("click", function(e) {
    e.preventDefault();
    if (friendArray.length == 0) {
        alert('add some friends');
    }
    searchText = $("#searchFriendsText").val();
    console.log(searchText);
    for (var i = 0; i < friendArray.length; i++) {
        if (friendArray[i] == searchText) {
            console.log("it's a match");
            friendNumber = friendArray.indexOf(friendArray[i]);
            $('li').removeClass("active");
            $('[data-friendNumber=' + friendNumber+ ']').addClass("active");
            $('#friendCardName').text(friendArray[i]);
        } else {
            alert ('friend not found');
        }
    }
})