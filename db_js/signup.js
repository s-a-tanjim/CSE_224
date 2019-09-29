const submit = document.getElementById('signup_submit');
const mail = document.getElementById('email_id');
const pw = document.getElementById('password_id');
const fm = document.getElementById('first_name_id');
const lm = document.getElementById('last_name_id');
const pn = document.getElementById('phone_number_id');
const con_pw = document.getElementById('confirm_password_id');

submit.addEventListener('click', e => {
  e.preventDefault();
  const password = pw.value;
  const confirm_pw = con_pw.value;
  var email = mail.value;
  const uid = email;
  email = email + "@eveil.com";
  const first_name = fm.value;
  const last_name = lm.value;
  const phone_number = pn.value;

  var ref = "user/" + uid;

  var userRef = firebase.database().ref(ref);

  if (email.length && password.length && first_name.length && last_name.length && phone_number.length) { //All value filled up

    document.getElementById('incompleteForm').style.display = "none";
    if (password !== confirm_pw) { //Password Match
      document.getElementById('passwordMatch').style.display = "block";
      console.log("Passwords Don't Match");
    } else {
      document.getElementById('passwordMatch').style.display = "none";

      if (password.length >= 6) {

        const aut = firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
          document.getElementById('alreadyExistAlert').style.display = "none";
          var today=new Date();
          var time = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear();
          userRef.set({
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
            password: password,
            city: "N/A",
            country:"N/A",
            postal_code:"N/A",
            sent_email:0,
            creation_date: time
          });

          document.getElementById('reg_form_id').reset();

          firebase.auth().signOut().then(x=>{
            document.location.href = "./login.html?Signup=Successful";
          });

        }).catch(e => {
          console.log("Connection Error!  id:" + e.message);
          document.getElementById('alreadyExistAlert').style.display = "block";
        });

      } else {
        //Short password
        console.log("Short Password!");
      }
    }
  } else {
    //Insufficient info
    document.getElementById('incompleteForm').style.display = "block";
  }
})
