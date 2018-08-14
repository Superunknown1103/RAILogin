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


    setTimeout(function(){
        window.location.pathname = "/home.html"
                }, 1000);
 

      // creating new user
    $('#completed').click(function() {
        var company = $('#businessName').val();
        var password = $('#newPass').val();
        var email = $('#email').val();
        var password2 = $('#newPassRepeat').val();
        var businessName = $('#businessName').val();
        var Address = $('#address').val();
        var City = $('#city').val();
        var State = $('#state').val();
        var phone = $('#phone').val();
        var zip = $('#zip').val();
        var description = $('#description').val();
        var status = $('#status').val();
        var bill = $('#bill').val();
        var balance = $('#balance').val();
        var nextBillDate = $('#nextBillDate').val();
        var upload = $('#upload').val();

        if ((password == '') || (password2 == '') || (email == '')) {
            alert('Please fill out all fields!');
        }
        else {
            if (password !== password2){
                alert('Passwords do not match!')
            } else {
                var Errx;
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
                    // Handle Errors Here
                    var errorCode = error.code;
                    if (error.message) {
                    alert(error.message);
                    var Errx = true;
                    }
                    }).then(function(){
                    if (Errx = true){
                        alert('User was not created.');
                    } else {
                    sessionStorage.setItem('userId', businessName);
                    createUser(email, businessName, password, Address, city, State, upload, phone, zip, description, status, bill, balance, nextBillDate);
                    console.log(email, businessName, password, Address, city, State, upload, phone, zip, description, status, bill, balance, nextBillDate);
                    };
                    // setTimeout(function(){
                        
                    // window.location.pathname = "/home.html"
                    // }, 3000);
                })
            }
            }
        });

        Logging user In
        $('.submitA').click(function(){
            var email = $('.frontBus').val();
            sessionStorage.setItem('userId', businessName)
            fetchEmailfromFirebase(businessName);
        });

  

        get user email for authentication based on business Name
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


        function RemoveVideosIfEmpty(){

        }


        function fetchBillingInfo(){
            var userInfo;
            var businessName = sessionStorage.getItem("userId");
            var firebaseDB = firebase.database().ref(businessName);
            firebaseDB.on('value', function(snapshot){
            userInfo = snapshot.val();
            console.log(userInfo.balance);
            $('.balanceField').html(userInfo.balance);
            $('.billField').html(userInfo.bill);
            $('.descField').html(userInfo.description);
            $('.emailField').html(userInfo.email);
            $('.addressField').html(userInfo.Address);
            $('.cityField').html(userInfo.city);
            $('.stateField').html(userInfo.State);
            $('.nextField').html(userInfo.nextBillDate);
            $('.phoneField').html(userInfo.phone);
            $('.statusField').html(userInfo.status);
            $('.zipField').html(userInfo.zip);
            });
        };
        
        // authenticate and redirect to video page
        function logInUser(email, password){
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            if (error.message) {
                alert(error.message);
                window.location.reload();
            }
          }).then(function(){
            setTimeout(function(){
             window.location.pathname = "/home.html"
                    }, 1000);
                });
         };
    });
 Creating user in database
function createUser(email, businessName, password, Address, city, State, upload, phone, zip, description, status, bill, balance, nextBillDate) {
    var firebaseDB = firebase.database().ref();
    var businessInfo = 
    {
    HostedVid1: "", 
    HostedVid2: "",
    email: email,
    businessName: businessName,
    allowedDownload: 'no',
    allowedHost: 'no',
    DownloadLink1: "",
    DownloadLink2: "",
    // password: password,
    upload: upload,
    Address: Address,
    City: city,
    State: State,
    phone: phone,
    zip: zip,
    description: description,
    status: status,
    bill: bill,
    balance: balance,
    nextBillDate: nextBillDate
    };
    // var user = sessionStorage.getItem('userId');
    firebaseDB.child(businessName).set(businessInfo).catch(function(error){
        if (error){
            alert(err.message)
        }
    }.done(alert(businessName + ' has been created sucessfully.')));
};


// functions that should run once user has logged in
if (window.location.pathname == "/home.html") {
    var userInfo;
    var businessName = sessionStorage.getItem('userId');
    $('.loggedIn').html(businessName);

    var firebaseDB = firebase.database().ref(businessName);
        firebaseDB.on('value', function(snapshot){
            userInfo = snapshot.val();
            console.log(userInfo);
            var BusinessInfo = JSON.stringify(userInfo);
            sessionStorage.setItem('BusinessInfo', BusinessInfo)
            console.log(BusinessInfo);
            var newBusinessInfo = JSON.parse(BusinessInfo);
            console.log(newBusinessInfo);
            // If DownloadLinks/HostedVideos are not null, enter them into the appropriate HTML.
            if (newBusinessInfo.DownloadLink1 !== ""){
            $('.dl1').attr('href', newBusinessInfo.DownloadLink1);
            $('.underText').css('visibility', 'hidden');
            } else {
            $('.dl1').css('visibility', 'hidden');
            $('.underText').css('visibility', 'visible');
            }
            if (newBusinessInfo.DownloadLink2 !== ""){
            $('.dl2').attr('href', newBusinessInfo.DownloadLink2);
            } else {
            $('.dl2').css('visibility', 'hidden');
            };
            if (newBusinessInfo.HostedVid1 !== ""){
            $('.vid1').attr('src', newBusinessInfo.HostedVid1);
            } else {
            $('.vid1').css('visibility', 'hidden');
            $('video').css('visibility', 'hidden');
            };
            if (newBusinessInfo.HostedVid2 !== "") {
            $('.vid2').attr('src', newBusinessInfo.HostedVid2);
            } else {
            $('.vid2').css('visibility', 'hidden');
            $('video').css('visibility', 'hidden');
            }
        });
    };

    if (window.location.pathname == "/billing.html") {
        fetchBillingInfo();
        };

    $('.returnHome').on("click", function(){
        window.location.pathname = "/home.html";
    });


    // Mod Pay
$('.payBill').on('click', function(){
    var Info = sessionStorage.getItem('BusinessInfo');
    var parsedInfo = JSON.parse(Info);
    var InvoiceNumber = getRandomInt(10000000).toString();
    var CompanyName = parsedInfo.businessName;
    var Address = parsedInfo.Address;
    var City = parsedInfo.City;
    var State = parsedInfo.State;
    var Zip = parsedInfo.zip;
    var url = "https://secure.modpay.com/vterm/vterm1.cfm?an&aml=15&clientcode=A5429478" + "&clientAcctNum=" + InvoiceNumber + "&companyName=" + CompanyName + "&address=" + Address + "&city=" + City + "&state=" + State + "&zipCode=" + Zip;
    window.open(url);
});

});


function upload(){
    var Info = sessionStorage.getItem('BusinessInfo');
    var parsedInfo = JSON.parse(Info);
    var uploadLink = parsedInfo.upload;
    window.open(uploadLink);
}

function getRandomInt(max){
	return Math.floor(Math.random() * Math.floor(max));
}