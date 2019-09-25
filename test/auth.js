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
  const pass = pw.value;
  const aut = firebase.auth().signInWithEmailAndPassword(email, pass);

  aut.catch(e => console.log(e.message));


  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      sessionStorage.setItem('email', mail.value);
      if (sessionStorage.getItem('email') != null) {
        document.location.href = "user_page/inbox.html?Signin=Successful";
        console.log("not null   " + mail.value);
      } else {
        console.log("null   " + mail.value);
      }
    } else {
      // No user is signed in.
      //document.location.href = "index.html?invalid_action";
    }
  });

});