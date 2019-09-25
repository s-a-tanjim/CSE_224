
var user_email = document.getElementById('user_email');
var user_first_name = document.getElementById('user_first_name');
var user_last_name = document.getElementById('user_last_name');
var user_p_number = document.getElementById('user_p_number');
var user_city = document.getElementById('user_city');
var user_country = document.getElementById('user_country');
var user_postal_code = document.getElementById('user_postal_code');
var pw = document.getElementById('password');
var confirm_pw = document.getElementById('confirm_password');
var user_pro_pic = document.getElementById('user_pro_pic');
var form_submit_button = document.getElementById('form_submit_button');

user_email.placeholder = sessionStorage.getItem('email');
user_first_name.placeholder = sessionStorage.getItem('first_name');
user_last_name.placeholder = sessionStorage.getItem('last_name');
user_p_number.placeholder = sessionStorage.getItem('phone_number');
user_city.placeholder = sessionStorage.getItem('city');
user_country.placeholder = sessionStorage.getItem('country');
user_postal_code.placeholder = sessionStorage.getItem('postal_code');


form_submit_button.addEventListener('click', e => {
  

});