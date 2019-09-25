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

var email = sessionStorage.getItem('email');
var uid = email.substring(0, email.length - 10);
var ref = "user/" + uid;
var userRef = firebase.database().ref(ref);

userRef.on('value', retrieveData, errData);


function retrieveData(data) {

  var alldata = data.val();
  var keys = Object.keys(alldata);
  var k = keys[0];

  const first_name = alldata[k].first_name;
  const last_name = alldata[k].last_name;
  const phone_number = alldata[k].phone_number;

  sessionStorage.setItem('first_name', first_name);
  sessionStorage.setItem('last_name', last_name);
  sessionStorage.setItem('phone_number', phone_number);

}

function errData(err) {
  console.log("Error!! id: ");
  console.log(err);
}