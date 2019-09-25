
var email1 = document.getElementById('user_email');
var user_name = document.getElementById('user_name');
var email2 = document.getElementById('user_email_2');
var user_p_number = document.getElementById('user_p_number');
var user_address = document.getElementById('user_address');
var sent_mail_count = document.getElementById('sent_mail_count');
var received_mail_count = document.getElementById('received_mail_count');
var creation_date = document.getElementById('creation_date');


email1.innerHTML = sessionStorage.getItem('email');
user_name.innerHTML = sessionStorage.getItem('first_name') + " " + sessionStorage.getItem('last_name');
email2.innerHTML = sessionStorage.getItem('email');
user_p_number.innerHTML = sessionStorage.getItem('phone_number');
sent_mail_count.innerHTML = sessionStorage.getItem('sent_email');
received_mail_count.innerHTML = sessionStorage.getItem('received_email');

var city=sessionStorage.getItem('city');
var country=sessionStorage.getItem('country');
var postal_code=sessionStorage.getItem('postal_code');

var address = "";
if (city == "N/A" && country == "N/A" && postal_code == "N/A") {
  address = "N/A";
} else {
  if (city !== "N/A")
    address = address + city + ", ";
  if (country !== "N/A")
    address = address + country + ", ";
  if (postal_code !== "N/A")
    address = address + postal_code + ". ";
}
user_address.innerHTML = address;