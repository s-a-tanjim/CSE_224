var user_email = document.getElementById('user_email');
var user_first_name = document.getElementById('user_first_name');
var user_last_name = document.getElementById('user_last_name');
var user_p_number = document.getElementById('user_p_number');
var user_city = document.getElementById('user_city');
var user_country = document.getElementById('user_country');
var user_postal_code = document.getElementById('user_postal_code');
var pw = document.getElementById('password');
var confirm_pw = document.getElementById('confirm_password');
var form_submit_button = document.getElementById('form_submit_button');

user_email.placeholder = sessionStorage.getItem('email');
user_first_name.placeholder = sessionStorage.getItem('first_name');
user_last_name.placeholder = sessionStorage.getItem('last_name');
user_p_number.placeholder = sessionStorage.getItem('phone_number');
user_city.placeholder = sessionStorage.getItem('city');
user_country.placeholder = sessionStorage.getItem('country');
user_postal_code.placeholder = sessionStorage.getItem('postal_code');


var email = sessionStorage.getItem('email');
var uid = email.substring(0, email.length - 10);
var ref = "user/" + uid;
var userRef = firebase.database().ref(ref);

form_submit_button.addEventListener('click', e => {
  e.preventDefault();
  var first_name = user_first_name.value;
  var last_name = user_last_name.value;
  var phone_number = user_p_number.value;
  var city = user_city.value;
  var country = user_country.value;
  var postal_code = user_postal_code.value;
  var password = pw.value;
  var confirm_password = confirm_pw.value;

  if (password.length !== 0) {
    document.getElementById('emptyPassword').style.display = 'none';
    if (password !== confirm_password) {
      document.getElementById('passwordNotMatch').style.display = 'block';
      document.getElementById('shortPassword').style.display = 'none';
    } else if (password.length < 6) {
      document.getElementById('shortPassword').style.display = 'block';
      document.getElementById('passwordNotMatch').style.display = 'none';
    } else {
      document.getElementById('passwordNotMatch').style.display = 'none';
      document.getElementById('shortPassword').style.display = 'none';
      userRef.update({
        'password': password
      });

      if (first_name.length !== 0) {
        userRef.update({
          'first_name': first_name
        });
        sessionStorage.setItem('first_name', first_name);
      }
      if (last_name.length !== 0) {
        userRef.update({
          'last_name': last_name
        });
        sessionStorage.setItem('last_name', last_name);
      }
      if (phone_number.length !== 0) {
        userRef.update({
          'phone_number': phone_number
        });
        sessionStorage.setItem('phone_number', phone_number);
      }
      if (city.length !== 0) {
        userRef.update({
          'city': city
        });
        sessionStorage.setItem('city', city);
      }
      if (country.length !== 0) {
        userRef.update({
          'country': country
        });
        sessionStorage.setItem('country', country);
      }
      if (postal_code.length !== 0) {
        userRef.update({
          'postal_code': postal_code
        });
        sessionStorage.setItem('postal_code', postal_code);
      }
      location.reload();
    }
  }else{
    document.getElementById('emptyPassword').style.display = 'block';
  }

 
});

/* 'dateOfBirth': moment(value.dateOfBirth).toDate().getTime() */


/*
  console.log(first_name);
  console.log(last_name);
  console.log(phone_number);
  console.log(city);
  console.log(country);
  console.log(postal_code);
  console.log(password);
  console.log(confirm_password);
*/