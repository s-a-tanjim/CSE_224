var from_to = document.getElementById('to_or_from_id');
var email_address = document.getElementById('email_address_id');
var message = document.getElementById('message_id');
var subject = document.getElementById('subject_id');

var key = null,
  prev_page = null,
  tmp = [];
location.search
  .substr(1)
  .split("&")
  .forEach(function (item) {
    tmp = item.split("=");
    if (tmp[0] === "key") key = decodeURIComponent(tmp[1]);
    else if (tmp[0] === "prev") prev_page = decodeURIComponent(tmp[1]);
  });

console.log(key);
console.log(prev_page);
var email = sessionStorage.getItem('email');
var uid = email.substring(0, email.length - 10);
var ref = "emails/" + uid + "/" + prev_page + "/" + key;
var userRef = firebase.database().ref(ref);

userRef.on('value', retrieveData, errData);

function retrieveData(data) {

  var alldata = data.val();
  if (prev_page == "sent") {
    from_to.innerHTML = "To: ";
  } else {
    from_to.innerHTML = "From: ";
  }
  email_address.innerHTML = alldata.from;
  message.innerHTML = alldata.message;
  subject.innerHTML = alldata.subject;
}

userRef.update({  //Update seen
  'seen': "1"
});

function errData(err) {
  console.log("Error!! id: ");
  console.log(err);
  message.innerHTML = err;
}