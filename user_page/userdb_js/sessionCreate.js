var email = sessionStorage.getItem('email');
var uid = email.substring(0, email.length - 10);
var refUser = "user/" + uid;
var userRef = firebase.database().ref(refUser);

userRef.on('value', retrieveData, errData);

var sessionLoadedFlag=0;

function retrieveData(data) { //For session only

  var alldata = data.val();

  const first_name = alldata.first_name;
  const last_name = alldata.last_name;
  const phone_number = alldata.phone_number;
  const city = alldata.city;
  const country = alldata.country;
  const postal_code = alldata.postal_code;
  const sent_email = alldata.sent_email;

  sessionStorage.setItem('first_name', first_name);
  sessionStorage.setItem('last_name', last_name);
  sessionStorage.setItem('phone_number', phone_number);
  sessionStorage.setItem('city', city);
  sessionStorage.setItem('country', country);
  sessionStorage.setItem('postal_code', postal_code);
  sessionStorage.setItem('sent_email', sent_email);
  document.getElementById('page-top').setAttribute('style', 'background-color: white;');
  document.getElementById('page-loader').style.display = 'none';
  document.getElementById('wholePage').style.display = 'block';

}

function errData(err) {
  console.log("Error!! id: ");
  console.log(err);
}