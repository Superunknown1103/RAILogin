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

  var email = $('.frontBus').val();
  var password = $('.frontPass').val();
  var btnLogin = $('.btnLogin').val();

  $('.btnLogin').click(function(e) {
 // btnLogin.addEventListener('click', e => {
    var email = $('.frontBus').val();
    var password = $('.frontPass').val();
    var auth = firebase.auth();

    console.log('wtf');

    var promise = auth.signInWithEmailAndPassword(email, password);
    console.log(promise);

    promise.catch(e => console.log(e.message));
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
          console.log(firebaseUser);
          window.location.href = 'home.html'
      } else {
          console.log('not logged in');
      }
  })

 });