var form_to_email = document.getElementById('to_email_id');
var form_subject = document.getElementById('subject_id');
var form_message = document.getElementById('message_id');
const form_send_button = document.getElementById('send_id');
const form_anonymous_send_button = document.getElementById('send_anonymous_id');


var email = sessionStorage.getItem('email');
var uid = email.substring(0, email.length - 10);
var ref = "emails/" + uid
var from_userRef = firebase.database().ref(ref);


form_send_button.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('successMessage').style.display = 'none';

  var to_email = form_to_email.value;
  var subject = form_subject.value;
  var message = form_message.value;

  var to_uid = to_email.substring(0, to_email.length - 10);
  ref = "emails/" + to_uid;
  var to_userRef = firebase.database().ref(ref);

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  if (to_email.length && subject.length && message) {
    document.getElementById('emptyField').style.display = 'none';

    if (to_email.substr(to_email.length - 10) == "@eveil.com") {
      document.getElementById('incorrectEmail').style.display = 'none';
      //Sender db update
      var newEmailRef = from_userRef.push();
      newEmailRef.set({
        'from': to_email,
        'subject': subject,
        'message': message,
        'bin': "0",
        'mode': "sent",
        'time': time,
        'date': date
      });

      //Receiver db update
      var newEmailRef = to_userRef.push();
      newEmailRef.set({
        'from': to_email,
        'subject': subject,
        'message': message,
        'bin': "0",
        'mode': "received",
        'time': time,
        'date': date
      });

      document.getElementById("user_form_id").reset();
      document.getElementById('successMessage').style.display = 'block';

    } else {
      document.getElementById('incorrectEmail').style.display = 'block';
    }
  } else {
    document.getElementById('emptyField').style.display = 'block';
  }
});

form_anonymous_send_button.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('successMessage').style.display = 'none';

  var to_email = form_to_email.value;
  var subject = form_subject.value;
  var message = form_message.value;

  
  var to_uid = to_email.substring(0, to_email.length - 10);
  ref = "emails/" + to_uid;
  var to_userRef = firebase.database().ref(ref);

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  if (to_email.length && subject.length && message) {
    document.getElementById('emptyField').style.display = 'none';

    if (to_email.substr(to_email.length - 10) == "@eveil.com") {
      document.getElementById('incorrectEmail').style.display = 'none';
      //Sender db update
      var newEmailRef = from_userRef.push();
      newEmailRef.set({
        'from': to_email,
        'subject': subject,
        'message': message,
        'bin': "0",
        'mode': "sent",
        'time': time,
        'date': date
      });

      //Receiver db update
      var newEmailRef = to_userRef.push();
      newEmailRef.set({
        'from': "anonymous@eveil.com",
        'subject': subject,
        'message': message,
        'bin': "0",
        'mode': "veilbox",
        'time': time,
        'date': date
      });

      document.getElementById("user_form_id").reset();
      document.getElementById('successMessage').style.display = 'block';

    } else {
      document.getElementById('incorrectEmail').style.display = 'block';
    }
  } else {
    document.getElementById('emptyField').style.display = 'block';
  }
});