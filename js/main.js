$(document).ready(function(){
    $('#signup-page').hide();
});

//create var to store user details on signup
var username = $('#userName');
var userpass = $('#userPassword');
var useremail = $('#userEmail');
var userbday = $('#userDOB');

var logname;
var logpass;
var logemail;
var logbday;


/*document.getElementById("signupBtn").addEventListener("click", function(event){
signup();
});*/


function signup(event){
    event.preventDefault;

    logname = username.value;
    logpass = userpass.value;
    logemail = useremail.value;
    logbday = userbday.value;

    localStorage.setItem('storedName', logname);
    localStorage.setItem('storedPass', logpass);
    localStorage.setItem('storedEmail', logemail);
    localStorage.setItem('storedBday', logbday);

    console.log("Sign up success! " + logname + " " + logpass + " " + logemail + " " + logbday);
}

function login(event){
    event.preventDefault;
    var storedEmail = localStorage.getItem('storedEmail');
    var storedPass = localStorage.getItem('storedPass');

    var enteredEmail = $('#logEmail:nth-child(0)');
    var enteredPass =  $('#logPassword:nth-child(0)');

    if ((enteredEmail.value == storedEmail) && (enteredPass.value == storedPass)){
        console.log("logged in!")
        alert("successfully logged in!");
    }
    else{
        console.log("wrong email/pass");
    }
}

async function openMenu() {
    await menuController.open();
  }

function loadSignup(){
    $('#signup-page').show();
    $('#login-page').hide();
}

function loadLogin(){
    $('#signup-page').hide();
    $('#login-page').show();
}

