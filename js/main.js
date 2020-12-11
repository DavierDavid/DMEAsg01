
//-----------hide signup page on load------------------------------
$(document).ready(function(){
    $('#signup-page').hide();
    $("#noDateCircle").hide();


//create var to store user details on signup

var username = $('#userName:nth-child(2)');
var userpass = $('#userPassword:nth-child(2)');
var useremail = $('#userEmail:nth-child(2)');
var userbday = $('#userDOB:nth-child(2)');

var logname;
var logpass;
var logemail;
var logbday;

var logStart;
var logEnd;
var logStartDay;
var logStartMonth;
var logEndDay;
var logEndMonth;

//------------buttons on click----------------------------------------------

$('#logInBtn').click(function(e){
    e.preventDefault();
    login();
});

$("#signInBtn").click(function(e){
    e.preventDefault();
    signup();
});

$('#loadLog').click(function(e){
    e.preventDefault();
    loadLogin();
});

$('#loadSign').click(function(e){
    e.preventDefault();
    loadSignup();
});

$('#logoutBtn').click(function(e){
    e.preventDefault();
    window.location.href = "./index.html";
});

/*$('#setDateBtn').click(function(e){
    e.preventDefault();
    logDates();
    console.log('button clicked');
});*/

$("body").on("click", "#setDateBtn", function(e) {
    e.preventDefault();
    logDates();
  });


/*$('#dismiss').click(function(e){
    dismissModal();
})

$('#logDateBtn').click(function(e){
    showLogDate();
});

$('#closeBtn').click(function(e){
    closeLogDate();
});*/



/*document.getElementById("signupBtn").addEventListener("click", function(event){
signup();
});

document.getElementById("signupBtn").addEventListener("click", function(event){
    event.preventDefault()
    signup();
  });*/

//-------------sign up function--------------------------------

function signup(){
    //event.preventDefault;

    logname = username.val();
    logpass = userpass.val();
    logemail = useremail.val();
    logbday = userbday.val();

    localStorage.setItem('storedName', logname);
    localStorage.setItem('storedPass', logpass);
    localStorage.setItem('storedEmail', logemail);
    localStorage.setItem('storedBday', logbday);

    //var test1 = localStorage.getItem("storedName");
    logbday = logbday.slice(5, 11);
    //alert(test1);
    $('#signup-page').hide();
    $('#login-page').show();
    console.log("Sign up success! " + logname + " " + logemail + " " + logpass + " " + logbday);
}


//-----------------log in function---------------------------------

function login(){
    //e.preventDefault();
    var storedEmail = localStorage.getItem('storedEmail');
    var storedPass = localStorage.getItem('storedPass');

    var enteredEmail = $('#logEmail:nth-child(2)');
    var enteredPass =  $('#logPassword:nth-child(2)');

    if ((enteredEmail.val() == storedEmail) && (enteredPass.val() == storedPass)){
        console.log("logged in!")
        alert("successfully logged in!");

        window.location.href = "./main.html";
    }
    else{
        console.log("wrong email/pass");
        alert("wrong email/password");  
    }
}

//----------function to open menu--------------------------

async function openMenu() {
    await menuController.open();
  }

  //----------function to show signup page--------------------------

function loadSignup(){
    $('#signup-page').show();
    $('#login-page').hide();
}
//----------function to show login page--------------------------

function loadLogin(){
    $('#signup-page').hide();
    $('#login-page').show();
}

/*--------------------select date page---------------------------------------*/

function logDates(){
    var enteredStart = $('#userStart:nth-child(2)');
    var enteredEnd = $('#userEnd:nth-child(2)');
    logStart = enteredStart.val();
    logEnd = enteredEnd.val();

    logStartMonth = logStart.slice(5, 7);
    logStartDay = logStart.slice(8, 10);

    console.log("start date " + logStartDay + " " + logStartMonth);

    logEndMonth = logEnd.slice(5, 7);
    logEndDay = logEnd.slice(8, 10);

    console.log("end date " + logEndDay + " " + logEndMonth);

    localStorage.setItem('storedStartDay', logStartDay);
    localStorage.setItem('storedStartMonth', logStartMonth);

    localStorage.setItem('storedEndDay', logEndDay);
    localStorage.setItem('storedEndMonth', logEndMonth);
  
  //console.log("success! " + logStart + " " + logEnd)

}

//-------------------Set profile details------------------------------------------------
document.getElementById("displayName").innerHTML = localStorage.getItem('storedName');
document.getElementById("displayEmail").innerHTML = localStorage.getItem('storedEmail');

});

//-----------------END OF DOCUMENT ON READY-----------------------------------------------

customElements.define('modal-content', class ModalContent extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `

        <ion-header>
          <ion-toolbar>
            <ion-title>Log your dates!</ion-title>
            <ion-buttons slot="end">
              <ion-button id="dismiss" onclick="dismissModal()"><ion-icon name="close" size="large"></ion-icon></ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <br><br>

        <ion-content>
          <ion-row>
          <ion-col class="setDates">
          <form id="log-date-form">
          <ion-item lines="full">
            <ion-label>Period Start date</ion-label>
            <ion-datetime picker-format="D M" display-format="D MMM" placeholder="Select Date" min="2020" id="userStart" required></ion-datetime>
          </ion-item>
        <br>
          <ion-item lines="full">
            <ion-label>Period End date</ion-label>
            <ion-datetime picker-format="D M" display-format="D MMM" placeholder="Select Date" min="2020" id="userEnd" required></ion-datetime>
          </ion-item>

          <ion-button type="button" color="warning" expand="block" id="setDateBtn">Set</ion-button>
          
          <form>
          </ion-col>
          </ion-row>
          
        </ion-content>
      `;
    }
  });

  let currentModal = null;

  const button = document.getElementById('logDateBtn');
  const button3 = document.getElementById('logDataBtn2');
  const button4 = document.getElementById('logDataBtn3');
  //const button = document.getElementsByClassName("logDataBtn");
  if(button || button3 || button4){
    button.addEventListener('click', createModal);
    button3.addEventListener('click', createModal);
    button4.addEventListener('click', createModal);
  }
  else{
      console.log("button is null/undefined");
  }

  const button2 = document.getElementById('dismiss');
  if(button2){
      button2.addEventListener('click', dismissModal);
  }
  else{
  }
  

  async function createModal() {
    const modal = await modalController.create({
      component: 'modal-content',
      cssClass: 'customModal'
    });

    await modal.present();
    currentModal = modal;
  }

  function dismissModal() {
    if (currentModal) {
      currentModal.dismiss().then(() => { currentModal = null; });
    }
  }
