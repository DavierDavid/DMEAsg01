
//-----------hide signup page on load---------------------------------------------------------------------------------------
$(document).ready(function(){
    $('#signup-page').hide();
    //$('#slpText').hide();
    //$('#flowText').hide();
    //$("#noDateCircle").hide();

//----------------------------create var to store today's date--------------------------------------------------------------
var d = new Date();
var todayDate = parseInt(d.getDate());

//console.log(todayDate);

//-----------------create var to store user details on signup---------------------------------------------------------------

var username = $('#userName:nth-child(2)');
var userpass = $('#userPassword:nth-child(2)');
var useremail = $('#userEmail:nth-child(2)');
var userbday = $('#userDOB:nth-child(2)');

var logname;
var logpass;
var logemail;
var logbday;

//-----------------create var to store user mood----------------------------------------------------------------------------
var logFlow;
var logSleep;

//-----------------create var to store user period/cycle dates--------------------------------------------------------------
var logStart 
var logEnd;
var logStartDay = localStorage.getItem('storedStartDay');
var logStartMonth;
var logEndDay = localStorage.getItem('storedEndDay');
var logEndMonth;


//------------store default period/cycle lengths----------------------------------------------------------------------------
var userPeriod = 7;
var userCycle = 25;

//------------buttons on click----------------------------------------------------------------------------------------------

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

//-----------For the script to track buttons easily-------------------------------------------------------------------------

$("body").on("click", "#setDateBtn", function(e) {
    e.preventDefault();
    logDates();
    checkDate();
  });

  $("body").on("click", "#updateBtn", function(e) {
    e.preventDefault();
    updateDetails();
  });

  $("body").on("click", "#logLengthBtn", function(e) {
    e.preventDefault();
    setLength();
  });
  $("body").on("click", "#logMoodBtn", function(e) {
    e.preventDefault();
    setMood();
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

//-------------sign up function---------------------------------------------------------------------------------------------

function signup(){

    logname = username.val();
    logpass = userpass.val();
    logemail = useremail.val();
    logbday = userbday.val();

    localStorage.setItem('storedName', logname);
    localStorage.setItem('storedPass', logpass);
    localStorage.setItem('storedEmail', logemail);
    localStorage.setItem('storedBday', logbday);

    logbday = logbday.slice(5, 11);

    $('#signup-page').hide();
    $('#login-page').show();

    console.log("Sign up success! " + logname + " " + logemail + " " + logpass + " " + logbday);
}


//-----------------log in function------------------------------------------------------------------------------------------

function login(){

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

//-------------------Update profile details---------------------------------------------------------------------------------

function updateDetails(){
    logname = $('#userName').val();
    logpass = $('#userPassword').val();
    logemail = $('#userEmail').val();
    logbday = $('#userDOB').val();

    localStorage.setItem('storedName', logname);
    localStorage.setItem('storedPass', logpass);
    localStorage.setItem('storedEmail', logemail);
    localStorage.setItem('storedBday', logbday);

    console.log("Update success! " + logname + " " + logemail + " " + logpass + " " + logbday);
    window.location.href = "./main.html";
}


  //----------function to show signup page----------------------------------------------------------------------------------

function loadSignup(){
    $('#signup-page').show();
    $('#login-page').hide();
}
//----------function to show login page-------------------------------------------------------------------------------------

function loadLogin(){
    $('#signup-page').hide();
    $('#login-page').show();
}

/*----------------------------------------------------select date page----------------------------------------------------*/

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

    calculateOngoing();
    calculateUpcoming();
  
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

  calculateUpcoming()
  window.location.href = "./main.html";
}

//-------------------Set profile details------------------------------------------------------------------------------------
document.getElementById("displayName").innerHTML = localStorage.getItem('storedName');
document.getElementById("displayEmail").innerHTML = localStorage.getItem('storedEmail');

//-------------------Set sleep and flow details-----------------------------------------------------------------------------

document.getElementById("slpText").innerHTML = localStorage.getItem('storedSleep');
document.getElementById("flowText").innerHTML = localStorage.getItem('storedFlow');

//--------------------Change page to preview--------------------------------------------------------------------------------
function checkDate(){

  if(localStorage['storedStartDay']){
    console.log('date set ' + logStartDay + " " + logEndDay);
    $("#noDateCircle").hide();
    $("#startDateCircle").show();
    $("#endDateCircle").hide(); 
  }
  else if(localStorage['storedEndDay']){
    console.log("no start date but got end date " + logEndDay);
    $("#noDateCircle").hide();
    $("#startDateCircle").hide();
    $("#endDateCircle").show();
  }
  else{
    console.log('no dates set ' + logStartDay + " " + logEndDay);
    $("#noDateCircle").show();
    $("#startDateCircle").hide();
    $("#endDateCircle").hide();
  }
}

//-----------------------function to calculate when period is coming--------------------------------------------------------
function calculateUpcoming(){
  if(logEndDay < todayDate){

    var edDate = parseInt(localStorage.getItem('storedEndDay'));
    var stCycle = parseInt(localStorage.getItem('storedCycle'));

    //console.log(stCycle + edDate);

    if(localStorage['storedCycle']){
      var dueDate = edDate + stCycle;
      document.getElementById("cir-ed-date").innerHTML = dueDate + " Days";
      //console.log("stCycle got value");
    }
    else{
      var dueDate = edDate + 25;
      document.getElementById("cir-ed-date").innerHTML = dueDate + " Days";
      //console.log("stCycle no value");
    }
    
  }
  /*
  if end date is < current date
  then take end date add cycle length = due date
  due date minus current date = diff
  period text = diff days
  
  else if end date >= current date
  then period text = period coming soon
  */
}


//--------------------function to calculate period days---------------------------------------------------------------------
function calculateOngoing(){
  if(todayDate > logStartDay){
    var stDate = parseInt(localStorage.getItem('storedStartDay'));
    var difference = todayDate - stDate;
    document.getElementById("cir-st-date").innerHTML = "Day " + difference;
    //console.log("Day " + difference);
  }
  else{
    document.getElementById("cir-st-date").innerHTML = "Day 1";
  }

  //never include month, can only calculate based on days. -----------------------------------------------------------------
}


//-------------------------function to set user mood------------------------------------------------------------------------
function setMood(){
  logFlow = $('#moodFlow').val();
  logSleep = $('#moodSleep').val();

  /*logSleep = parseInt(logSleep);
  logFlow = parseInt(logFlow);*/

  localStorage.setItem('storedSleep', logSleep);
  localStorage.setItem('storedFlow', logFlow);

  console.log(logSleep + " " + logFlow);

  checkMood();
}

//-----------------------function if check if flow/sleep hours is empty and display accordingly-----------------------------
function checkMood(){

  if(localStorage['storedFlow']){
    $('#flowText').show();
    document.getElementById("flowText").innerHTML = "You're having " + localStorage.getItem('storedFlow') + " flow";
    console.log("flow not empty, showing desc");
  }
  else{
    $('#flowText').hide();
    console.log("flow empty, hiding desc");
  }

  if(localStorage['storedSleep']){
    $('#slpText').show();
    document.getElementById("slpText").innerHTML = "You slept for " + localStorage.getItem('storedSleep') + " hours";
    console.log("sleep not empty, showing desc");
  }
  else{
    $('#slpText').hide();
    console.log("sleep empty, hiding desc");
  }
  
}

//--------------------------------------function for alert and button to reset all data-------------------------------------
const button10 = document.getElementById('resetBtn');
    button10.addEventListener('click', presentAlertConfirm);

    async function presentAlertConfirm() {
      const alert = document.createElement('ion-alert');
      alert.cssClass = 'my-custom-class';
      alert.header = 'Reset all data?';
      alert.message = 'Confirm reset and delete all data? Your account will not be deleted';
      alert.buttons = [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            resetData();
            console.log('Confirm clicked')
          }
        }
      ];
    
      document.body.appendChild(alert);
      return alert.present();
    }
    
    /*function handleButtonClick() {
      const alert = await alertController.create({
        header: 'Use this lightsaber?',
        message: 'Do you agree to use this lightsaber to do good across the galaxy?',
        buttons: ['Disagree', 'Agree']
      });

      await alert.present();
    }*/

//-----------------------functoin to reset data-----------------------------------------------------------------------------
    function resetData(){
      localStorage.removeItem('storedStartDay');
      localStorage.removeItem('storedStartMonth');
      localStorage.removeItem('storedEndDay');
      localStorage.removeItem('storedEndMonth');
      localStorage.removeItem('storedSleep');
      localStorage.removeItem('storedFlow');
      localStorage.removeItem('storedCycle');
      localStorage.removeItem('storedPeriod');

    }


//--------run these functions on load---------------------------------------------------------------------------------------
checkMood();
checkDate();
calculateOngoing();
calculateUpcoming();

});

//=================END OF DOCUMENT ON READY=================================================================================


//-----------------Edit dates modal-----------------------------------------------------------------------------------------
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

          <ion-button type="button" color="main" expand="block" id="setDateBtn">Set</ion-button>
          
          <form>
          </ion-col>
          </ion-row>
          
        </ion-content>
      `;
    }
  });

  //------------buttons and functions for edit dates------------------------------------------------------------------------

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

//-----------------Update login details modal-------------------------------------------------------------------------------

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

          <ion-button type="button" color="main" expand="block" id="updateBtn">Update</ion-button>
          <br>

          <form>
          </ion-col>
          </ion-row>
          
        </ion-content>
      `;
    }
  });

  //---------------function and buttons for update user details-------------------------------------------------------------
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

//-----------------Edit period/cycle dates modal-----------------------------------------------------------------------------------------
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

        <ion-button type="button" color="main" expand="block" id="logLengthBtn">Set</ion-button>
        
        <form>
        </ion-col>
        </ion-row>
        
      </ion-content>
    `;
  }
});

//-----------------function and buttons to set cycle/period length----------------------------------------------------------
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
    currentModal.dismiss().then(() => { currentModal3 = null; });
  }
}

//-----------------Edit mood modal------------------------------------------------------------------------------------------
customElements.define('modal-content4', class ModalContent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `

      <ion-header>
        <ion-toolbar>
          <ion-title>How are you feeling?</ion-title>
          <ion-buttons slot="end">
          <ion-button id="dismiss" onclick="dismissModal4()"><ion-icon name="close" size="large"></ion-icon></ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <br>

      <ion-content>
        <ion-row>
        <ion-col class="setDates">
        <form id="log-mood-form">

        <ion-radio-group id="moodFlow">
            <ion-label><div class="formTitle">Menstrual flow</div></ion-label>
          <ion-item>
            <ion-label>Light</ion-label>
            <ion-radio slot="start" color="main" value="light"></ion-radio>
          </ion-item>

          <ion-item>
            <ion-label>Medium</ion-label>
            <ion-radio slot="start" color="main" value="medium"></ion-radio>
          </ion-item>

          <ion-item>
            <ion-label>Heavy</ion-label>
            <ion-radio slot="start" color="main" value="heavy"></ion-radio>
          </ion-item>
        </ion-radio-group>
        <br>
        
        <ion-label><div class="formTitle">Hours of sleep</div></ion-label>
        <ion-item>
          <ion-range id="moodSleep" min="1" max="20" step="1" value="8" pin snaps color="sub">
            <ion-icon slot="start" size="small" color="sub" name="bed"></ion-icon>
            <ion-icon slot="end" size="large" color="sub" name="bed"></ion-icon>
          </ion-range>
        </ion-item>
        <br>

        <ion-button type="button" color="main" expand="block" id="logMoodBtn">Set</ion-button>
        
        <form>
        </ion-col>
        </ion-row>
        
      </ion-content>
    `;
  }
});

//-----------------function and buttons to edit mood------------------------------------------------------------------------
let currentModal4 = null;

const button8 = document.getElementById('logFeelingBtn');
//const button = document.getElementsByClassName("logDataBtn");
if(button8){
  button8.addEventListener('click', createModal4);
}
else{
    console.log("button is null/undefined");
}

const button9 = document.getElementById('dismiss');
if(button9){
    button9.addEventListener('click', dismissModal4);
}
else{
}

async function createModal4() {
  const modal = await modalController.create({
    component: 'modal-content4',
    cssClass: 'customModal4'
  });

  await modal.present();
  currentModal = modal;
}

function dismissModal4() {
  if (currentModal) {
    currentModal.dismiss().then(() => { currentModal4 = null; });
  }
}


//=================END======================================================================================================