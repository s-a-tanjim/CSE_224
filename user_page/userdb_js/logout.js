function logout() {

  firebase.auth().signOut();
  sessionStorage.clear();
  document.location.href = "../index.html?Logout=Successful";
}
