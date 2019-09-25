const submit = document.getElementById('login_button');
const mail = document.getElementById('email_id');
const pw = document.getElementById('password_id');


submit.addEventListener('click', e => {
  e.preventDefault();
  const email = mail.value;
  const password = pw.value;
  const aut = firebase.auth().signInWithEmailAndPassword(email, password).then(cred=>{
    document.getElementById('wrongEmailAlert').style.display = "none";
    sessionStorage.setItem('email', email);
    console.log("Logged In");
    document.location.href = "user_page/inbox.html?Login=Successful";
  }).catch(e=>{
    document.getElementById('wrongEmailAlert').style.display = "block";
    console.log("Error!  id: "+e.message);
  });

});