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
document.getElementById('login_form_id').addEventListener('submit', submitLogin);
var email, password, alreadyExistFlag = 999;

function submitLogin(e) {
  e.preventDefault();

  email = document.getElementById('email_id').value;
  password = document.getElementById('password_id').value;

  userRef.on('value', verifyLogin, errData);
}

function verifyLogin(data) {
  alreadyExistFlag = 999;
  var emails = data.val();
  var keys = Object.keys(emails);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var em = emails[k].email;
    var pw = emails[k].password;
    if (em == email && pw == password) {
      alreadyExistFlag = 1;
      break;
    }
  }
  if (alreadyExistFlag != 1) {
    console.log("Wrong userid or password");
    document.getElementById('wrongEmailAlert').style.display = 'block';
  } else {
    document.getElementById('wrongEmailAlert').style.display = 'none';
    document.location.href = "./user_page/inbox.html?Login=Successful";
  }

}

function errData(err) {
  console.log("Error!!");
  console.log(err);

}