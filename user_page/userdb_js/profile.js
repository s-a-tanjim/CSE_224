var email1 = document.getElementById('user_email');
var user_name = document.getElementById('user_name');
var email2 = document.getElementById('user_email_2');
var user_p_number = document.getElementById('user_p_number');
var user_address = document.getElementById('user_address');
var sent_mail_count = document.getElementById('sent_mail_count');
var creation_time = document.getElementById('creation_date');
var user_uid = null;

email1.innerHTML = sessionStorage.getItem('email');
user_name.innerHTML = sessionStorage.getItem('first_name') + " " + sessionStorage.getItem('last_name');
email2.innerHTML = sessionStorage.getItem('email');
user_p_number.innerHTML = sessionStorage.getItem('phone_number');
sent_mail_count.innerHTML = sessionStorage.getItem('sent_email');

var city = sessionStorage.getItem('city');
var country = sessionStorage.getItem('country');
var postal_code = sessionStorage.getItem('postal_code');

var address = "";
if (city == "N/A" && country == "N/A" && postal_code == "N/A") {
  address = "N/A";
} else {
  if (city !== "N/A")
    address = address + city + ", ";
  if (country !== "N/A")
    address = address + country + ", ";
  if (postal_code !== "N/A")
    address = address + postal_code + ". ";
}
user_address.innerHTML = address;

var email = sessionStorage.getItem('email');
var uid = email.substring(0, email.length - 10);
var refUser = "user/" + uid;
var userRef = firebase.database().ref(refUser);

userRef.on('value', retrieveData, errData);

function retrieveData(data) {
  var alldata = data.val();
  const creation_date = alldata.creation_date;
  creation_time.innerHTML = creation_date;
}

function errData(err) {
  console.log("Error!! id: ");
  console.log(err);
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    user_uid = user.uid;
  } else {}
});

function account_delete() {

  var email = sessionStorage.getItem('email');
  var uid = email.substring(0, email.length - 10);
  var refUser = "user/" + uid;
  var userRef = firebase.database().ref(refUser);
  var refMails = "emails/" + uid;
  var emailRef = firebase.database().ref(refMails);


  console.log("Account delete");
  if (user_uid != null) {
    console.log(user_uid);
    var user = firebase.auth().currentUser;
    user.delete().then(function () {
      console.log('Successfully deleted user');
      userRef.remove().then(e => {
        emailRef.remove().then(x => {
          location.reload();
          logout();
        });
      });
    }).catch(function (error) {
      console.log('Error deleting user:', error);
    });
  }
}