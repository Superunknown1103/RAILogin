$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyClzWbBCXJB1Fni8HnIhjtzaV8mf5E5jOw",
        authDomain: "railogin-cb34b.firebaseapp.com",
        databaseURL: "https://railogin-cb34b.firebaseio.com",
        projectId: "railogin-cb34b",
        storageBucket: "railogin-cb34b.appspot.com",
        messagingSenderId: "58650909091"
      };
      firebase.initializeApp(config);

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
                    sessionStorage.setItem('userId', email);
                    createUser(email)
                    // window.location.pathname = "/home.html"
                })
            }
            }
        });
        

function createUser(userId){
    var firebaseDB = firebase.database().ref();
    var email = userId;
    var videos = 
    {HostedVid1:"n/a", 
    HostedVid2:"n/a", 
    email:email,
    allowedDownload: 'no',
    allowedHost: 'no',
    DownloadLink1: "n/a",
    DownloadLink2: "n/a"
};
    var user = sessionStorage.getItem('userId');
    string1 = 'string1';
    firebaseDB.child(string1).set(videos);
};
});