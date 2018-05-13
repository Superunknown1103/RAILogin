$(document).ready(function(){
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
                    // var confirm = confirm('New user created successfully!')
                    window.location.pathname = "/home.html"
                })
            }
            }
        });
});
