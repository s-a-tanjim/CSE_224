const submit = document.getElementById('login_button');
const mail = document.getElementById('email_id');
const pw = document.getElementById('password_id');

checkCookie();  //check if cookie is set or not

submit.addEventListener('click', e => {
  e.preventDefault();
  const email = mail.value;
  const password = pw.value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {

    if (document.getElementById('rememberMe').checked == true) {
      //console.log('Set Cookie');
      setCookie("username", email);
      setCookie("pw", password);
    } else {
      //console.log('not Set Cookie');
    }

    document.getElementById('wrongEmailAlert').style.display = "none";
    sessionStorage.setItem('email', email);
    //console.log("Logged In");
    document.location.href = "user_page/inbox.html?Login=Successful";
  }).catch(e => {
    document.getElementById('wrongEmailAlert').style.display = "block";
    console.log("Error!  id: " + e.message);
  });

});

function setCookie(cookieName, cvalue) {
  var d = new Date();
  exdays = 10; //10days
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cvalue + ";" + expires + ";path=/;secure";
}

function checkCookie() {
  var email = getCookie("username");
  var password = getCookie("pw");
  if (email != "" && password != "") {
    document.getElementById('email_id').value = email;
    document.getElementById('password_id').value = password;
  } else {
    //pass
  }
}

function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}