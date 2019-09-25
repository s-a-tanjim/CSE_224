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