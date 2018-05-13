$(document).ready(function(){

        // firebase configuration
    var config = {
        apiKey: "AIzaSyClzWbBCXJB1Fni8HnIhjtzaV8mf5E5jOw",
        authDomain: "railogin-cb34b.firebaseapp.com",
        databaseURL: "https://railogin-cb34b.firebaseio.com",
        projectId: "railogin-cb34b",
        storageBucket: "railogin-cb34b.appspot.com",
        messagingSenderId: "58650909091"
      };
      firebase.initializeApp(config);

      // creating new user
    $('#completed').click(function() {
        var password = $('#newPass').val();
        var email = $('#email').val();
        var password2 = $('#newPassRepeat').val();

        if ((password == '') || (password2 == '') || (email == '')) {
            alert('Please fill out all fields!');
        }
        else {
            if (password !== password2){
                alert('Passwords do not match!')
            } else {
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
                    // Handle Errors Here
                    var errorCode = error.code;
                    if (error.message) {
                    alert(error.message);
                    return;
                    }
                    }).then(function(){
                    var businessName = $('#businessName').val();
                    sessionStorage.setItem('userId', businessName);
                    createUser(email, businessName);
                    setTimeout(function(){
                    window.location.pathname = "/home.html"
                    }, 3000);
                })
            }
            }
        });

        // Logging user In
        $('.submitA').click(function(){
            var businessName = $('.frontBus').val();
            sessionStorage.setItem('userId', businessName)
            fetchEmailfromFirebase(businessName);
        });

        // get user email for authentication based on business Name
        function fetchEmailfromFirebase(businessName){
            var firebaseDB = firebase.database().ref(businessName + '/email');
            firebaseDB.on('value', function(snapshot){
                var email = snapshot.val();
                var password = $('.frontPass').val();
                if (email){
                    logInUser(email, password);
                } else {
                    alert("Please check that business name and/or password are correct!");
                }
            });
        };
        
        // authenticate and redirect to video page
        function logInUser(email, password){
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            if (error.message) {
                alert(error.message);
                return;
            }
          }).then(function(){
            setTimeout(function(){
             window.location.pathname = "/home.html"
                    }, 3000);
                });
         };

 // Creating user in database
function createUser(email, businessName){

    var firebaseDB = firebase.database().ref();
    var videos = 
    {
    HostedVid1:"n/a", 
    HostedVid2:"n/a", 
    email: email,
    allowedDownload: 'no',
    allowedHost: 'no',
    DownloadLink1: "n/a",
    DownloadLink2: "n/a"
};
    var user = sessionStorage.getItem('userId');
    firebaseDB.child(businessName).set(videos);
};
});