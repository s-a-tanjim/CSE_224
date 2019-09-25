if(sessionStorage.getItem('email')!=null){
  console.log('Logged in as '+sessionStorage.getItem('email'));
}
else{
  console.log('logged out');
  document.location.href="../index.html?invalid_action_from_inbox";
}