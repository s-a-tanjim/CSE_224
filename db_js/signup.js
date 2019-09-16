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

var userRef = firebase.database().ref('user');
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
  //console.log("func call er age"+count++);
  alreadyExist(email);
  //console.log("func call er pore"+count++);
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
  //console.log("AlreadyExist()"+count++);
  userRef.on('value', gotData, errData);
}

function gotData(data) {
  alreadyExistFlag = 999;
  //console.log("Gotdata()"+count++);
  var emails = data.val();
  var keys = Object.keys(emails);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var em = emails[k].email;
    //console.log(em+"   "+userEmail);
    if (em == email) {
      //console.log("Equal hoye geche!!");
      alreadyExistFlag = 1;
      break;
    }
  }
  if (alreadyExistFlag != 1) {
    //console.log("false");
    //console.log(count++);
    document.getElementById('alreadyExistAlert').style.display = 'none';
    saveMessage(first_name, last_name, email, phone_number, password);
    document.location.href = "login.html?Signup=Successful";
  } else {
    //console.log(count++);
    //console.log("true");
    document.getElementById('alreadyExistAlert').style.display = 'block';
  }
}

function errData(err) {
  console.log("Error!!");
  console.log(err);
}