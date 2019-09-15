

function infoSubmit() {
  
  var info = {
    first_name: document.getElementById('first_name_id').value,
    last_name: document.getElementById('last_name_id').value,
    p_number: document.getElementById('p_number_id').value,
    city: document.getElementById('city_id').value,
    country: document.getElementById('country_id').value,
    postal_code: document.getElementById('postal_code_id').value,
    password: document.getElementById('password').value
  }

  // var first_name=document.getElementById('pro_pic_id').value; 
  showProfile();

  document.getElementById('disp_name_id').innerHTML=info['first_name']+"  "+info['last_name'];

}

function showProfile() {
  document.getElementById('show-profile').style.display = 'block';
  document.getElementById('settings-profile').style.display = 'none';
}

function showAccountSettings() {
  document.getElementById('show-profile').style.display = 'none';
  document.getElementById('settings-profile').style.display = 'block';
}