
//-----------hide signup page on load------------------------------
$(document).ready(function(){
    $('#signup-page').hide();
});

//create var to store user details on signup

var username = $('#userName:nth-child(2)');
var userpass = $('#userPassword');
var useremail = $('#userEmail');
var userbday = $('#userDOB');
var logname;
var logpass;
var logemail;
var logbday;


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

    logname = username.value;
    logpass = userpass.value;
    logemail = useremail.value;
    logbday = userbday.value;

    localStorage.setItem('storedName', logname);
    localStorage.setItem('storedPass', logpass);
    localStorage.setItem('storedEmail', logemail);
    localStorage.setItem('storedBday', logbday);

    //var test1 = localStorage.getItem("storedName");

    //alert(test1);

    console.log("Sign up success! " + logname + " " + logpass + " " + logemail + " " + logbday);
}


//-----------------log in function---------------------------------

function login(event){
    event.preventDefault;
    var storedEmail = localStorage.getItem('storedEmail');
    var storedPass = localStorage.getItem('storedPass');

    var enteredEmail = $('#logEmail:nth-child(0)');
    var enteredPass =  $('#logPassword:nth-child(0)');

    if ((enteredEmail.value == storedEmail) && (enteredPass.value == storedPass)){
        console.log("logged in!")
        alert("successfully logged in!");
        window.location("./main.html");
    }
    else{
        console.log("wrong email/pass");
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
customElements.define('modal-content', class ModalContent extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <ion-header translucent>
          <ion-toolbar>
            <ion-title>Log your dates!</ion-title>
            <ion-buttons slot="end">
              <ion-button onclick="dismissModal()">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content fullscreen>

          put your calendar here
          
        </ion-content>
      `;
    }
  });

  let currentModal = null;
  const button = document.getElementById('logDateBtn');
  if(button){
    button.addEventListener('click', createModal);
  }
  else{
      console.log("button is null/undefined");
  }
  

  async function createModal() {
    const modal = await modalController.create({
      component: 'modal-content'
    });

    await modal.present();
    currentModal = modal;
  }

  function dismissModal() {
    if (currentModal) {
      currentModal.dismiss().then(() => { currentModal = null; });
    }
  }