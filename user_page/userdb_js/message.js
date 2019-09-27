var from_to = document.getElementById('to_or_from_id');
var email_address = document.getElementById('email_address_id');
var message = document.getElementById('message_id');
var subject = document.getElementById('subject_id');

var key = null,
  tmp = [];
location.search
  .substr(1)
  .split("&")
  .forEach(function (item) {
    tmp = item.split("=");
    if (tmp[0] === "key") key = decodeURIComponent(tmp[1]);
  });

var email = sessionStorage.getItem('email');
var uid = email.substring(0, email.length - 10);
var ref = "emails/" + uid + "/" + key;
var userRef = firebase.database().ref(ref);

userRef.on('value', retrieveData, errData);

function retrieveData(data) {

  var alldata = data.val();
  if (alldata.mode == "sent") {
    from_to.innerHTML = "To: ";
  } else {
    from_to.innerHTML = "From: ";
  }

  email_address.innerHTML = alldata.from;
  message.innerHTML = alldata.message;
  subject.innerHTML = alldata.subject;
}


function errData(err) {
  console.log("Error!! id: ");
  console.log(err);
  message.innerHTML=err;
}