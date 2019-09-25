// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCn_joi3Mjky9IbXBhxl4J8Ngc9G0HBm2o",
  authDomain: "e-veil.firebaseapp.com",
  databaseURL: "https://e-veil.firebaseio.com",
  projectId: "e-veil",
  storageBucket: "",
  messagingSenderId: "1002308855640",
  appId: "1:1002308855640:web:1e5d0e74edef54f8c9a72d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var userRef = firebase.database().ref('user/ss');
document.getElementById('reg_form_id').addEventListener('submit', submitForm);

var alreadyExistFlag = 999;
var count = 0;
var first_name, last_name, email, phone_number, password;


function submitForm(e) {
  e.preventDefault();
  first_name = getInputVal('first_name_id');
  last_name = getInputVal('last_name_id');
  email = getInputVal('email_id');
  email=email+"@eveil.com";
  phone_number = getInputVal('phone_number_id');
  password = getInputVal('password');

  alreadyExist(email);

  if (alreadyExistFlag === 1) {

  } else if (alreadyExistFlag === 0) {

    //saveMessage(first_name, last_name, email, phone_number, password);
    //document.location.href = "login.html?Signup=Successful";
  }
  //console.log('Sesh!');
}

function saveMessage(first_name, last_name, email, phone_number, password) {
  var newUserRef = userRef.push();
  newUserRef.set({
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone_number: phone_number,
    password: password
  });
}

function getInputVal(id) {
  return document.getElementById(id).value;
}

function alreadyExist(email) {
  userRef.on('value', gotData, errData);
}

function gotData(data) {
  alreadyExistFlag = 999;
  
  var emails = data.val();
  var keys = Object.keys(emails);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var em = emails[k].email;
    
    if (em == email) {
      alreadyExistFlag = 1;
      break;
    }
  }
  if (alreadyExistFlag != 1) {

    document.getElementById('alreadyExistAlert').style.display = 'none';
    const aut=firebase.auth().createUserWithEmailAndPassword(email,password);

  } else {
    document.getElementById('alreadyExistAlert').style.display = 'block';
  }
}

function errData(err) {
  console.log("Error!!");
  console.log(err);
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    saveMessage(first_name, last_name, email, phone_number, password);
    document.location.href = "login.html?Signup=Successful";
  } else {
    // No user is signed in.
  }
});