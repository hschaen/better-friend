// FirebaseUI config.
// var userCheck = firebase.auth().currentUser;
// if (typeof userCheck == "null") {
    var uiConfig = {
    signInSuccessUrl: 'https://127.0.0.1:5500/better-friend/index.html',
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
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
// }
function signInWithFB() {
    firebase.auth().signInWithRedirect(provider);
}
function checkLoginState() {
    FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    });
}
