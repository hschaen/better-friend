console.log("initializing firebase");
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
var ref = database.ref("server/saving-data/fireblog");
// var auth = firebase.auth();
// var provider = new firebase.auth.FacebookAuthProvider();
// // provider.addScope('user_birthday, email, user_events, user_friends');
// provider.setCustomParameters({
//     'display': 'popup'
//   });