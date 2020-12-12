
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


//------------store default period/cycle lengths---------------------------
var userPeriod = 7;
var userCycle = 25;

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

  $("body").on("click", "#updateBtn", function(e) {
    e.preventDefault();
    updateDetails();
  });

  $("body").on("click", "#logLengthBtn", function(e) {
    e.preventDefault();
    setLength();
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

//-------------------Update profile details-------------------------------------------

function updateDetails(){
    logname = $('#userName').val();
    logpass = $('#userPassword').val();
    logemail = $('#userEmail').val();
    logbday = $('#userDOB').val();

    localStorage.setItem('storedName', logname);
    localStorage.setItem('storedPass', logpass);
    localStorage.setItem('storedEmail', logemail);
    localStorage.setItem('storedBday', logbday);

    //logbday = logbday.slice(5, 11);

    console.log("Update success! " + logname + " " + logemail + " " + logpass + " " + logbday);
    window.location.href = "./main.html";
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

function setLength(){

  console.log(" previous period length = " + userPeriod + " cycle length = " + userCycle);

  userCycle = $('#cycleLength:nth-child(2)').val();
  userPeriod = $('#periodLength:nth-child(2)').val();

  userCycle = userCycle.slice(8, 10);
  userPeriod = userPeriod.slice(8, 10);

  localStorage.setItem('storedPeriod', userPeriod);
  localStorage.setItem('storedCycle', userCycle);

  console.log("period length = " + userPeriod + " cycle length = " + userCycle);




}

//-------------------Set profile details------------------------------------------------
document.getElementById("displayName").innerHTML = localStorage.getItem('storedName');
document.getElementById("displayEmail").innerHTML = localStorage.getItem('storedEmail');

});

//-----------------END OF DOCUMENT ON READY-----------------------------------------------


//-----------------Edit dates modal--------------------------------------------------------
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
  //const button = document.getElementsByClassName("logDataBtn");
  if(button || button3 || button4){
    button.addEventListener('click', createModal);
    button3.addEventListener('click', createModal);
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

//-----------------Edit details modal--------------------------------------------------------

  customElements.define('modal-content2', class ModalContent extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `

        <ion-header>
          <ion-toolbar>
            <ion-title>Update details!</ion-title>
            <ion-buttons slot="end">
              <ion-button id="dismiss" onclick="dismissModal2()"><ion-icon name="close" size="large"></ion-icon></ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <br><br>

        <ion-content>
          <ion-row>
          <ion-col class="setDates">
          <form id="edit-details-form">
          <ion-item lines="full">
            <ion-label position="floating">Name</ion-label>
            <ion-input type="text" id="userName" required></ion-input>
          </ion-item>

          <br>

          <ion-item lines="full">
            <ion-label position="floating">Email</ion-label>
            <ion-input type="email" id="userEmail" required></ion-input>
          </ion-item>

          <br>

          <ion-item lines="full">
            <ion-label position="floating">Password</ion-label>
            <ion-input type="password" id="userPassword" required></ion-input>
          </ion-item>

          <br>

          <ion-item lines="full">
            <ion-label>Brithday</ion-label>
            <ion-datetime value="2000-01-26" placeholder="Select Date" min="1950" max="2007" id="userDOB" required></ion-datetime>
          </ion-item>

          <br>

          <ion-button type="button" color="warning" expand="block" id="updateBtn">Update</ion-button>
          <br>

          <form>
          </ion-col>
          </ion-row>
          
        </ion-content>
      `;
    }
  });

  let currentModal2 = null;

  const button5 = document.getElementById('editDetails');

  if(button5){
    button5.addEventListener('click', createModal2);
  }
  else{
      console.log("button5 is null/undefined");
  }

  async function createModal2() {
    const modal = await modalController.create({
      component: 'modal-content2',
      cssClass: 'customModal2'
    });

    await modal.present();
    currentModal2 = modal;
  }

  function dismissModal2() {
    if (currentModal2) {
      currentModal2.dismiss().then(() => { currentModal2 = null; });
    }
  }

  //-----------------Edit dates modal--------------------------------------------------------
customElements.define('modal-content3', class ModalContent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `

      <ion-header>
        <ion-toolbar>
          <ion-title>Set your dates!</ion-title>
          <ion-buttons slot="end">
          <ion-button id="dismiss" onclick="dismissModal3()"><ion-icon name="close" size="large"></ion-icon></ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <br><br>

      <ion-content>
        <ion-row>
        <ion-col class="setDates">
        <form id="log-date-form">
        <ion-item lines="full">
          <ion-label>Period Length</ion-label>
          <ion-datetime placeholder="7" display-format="D" id="periodLength"></ion-datetime>
        </ion-item>
      <br>
        <ion-item lines="full">
          <ion-label>Cycle Length</ion-label>
          <ion-datetime placeholder="25" display-format="D" id="cycleLength"></ion-datetime>
        </ion-item>

        <ion-button type="button" color="warning" expand="block" id="logLengthBtn">Set</ion-button>
        
        <form>
        </ion-col>
        </ion-row>
        
      </ion-content>
    `;
  }
});

let currentModal3 = null;

const button6 = document.getElementById('setLengthBtn');
//const button = document.getElementsByClassName("logDataBtn");
if(button6){
  button6.addEventListener('click', createModal3);
}
else{
    console.log("button is null/undefined");
}

const button7 = document.getElementById('dismiss');
if(button7){
    button7.addEventListener('click', dismissModal3);
}
else{
}

async function createModal3() {
  const modal = await modalController.create({
    component: 'modal-content3',
    cssClass: 'customModal'
  });

  await modal.present();
  currentModal = modal;
}

function dismissModal3() {
  if (currentModal) {
    currentModal.dismiss().then(() => { currentModal = null; });
  }
}
