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