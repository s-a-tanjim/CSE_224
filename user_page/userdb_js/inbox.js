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
  const city = alldata[k].city;
  const country = alldata[k].country;
  const postal_code = alldata[k].postal_code;
  const received_email = alldata[k].received_email;
  const sent_email = alldata[k].sent_email;

  sessionStorage.setItem('first_name', first_name);
  sessionStorage.setItem('last_name', last_name);
  sessionStorage.setItem('phone_number', phone_number);
  sessionStorage.setItem('city',city);
  sessionStorage.setItem('country',country);
  sessionStorage.setItem('postal_code',postal_code);
  sessionStorage.setItem('received_email',received_email);
  sessionStorage.setItem('sent_email',sent_email);

}

function errData(err) {
  console.log("Error!! id: ");
  console.log(err);
}