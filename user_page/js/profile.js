

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
  if(info['first_name'].length==0){
    info['first_name']='n/a';
  }
  if(info['last_name'].length==0){
    info['last_name']='n/a';
  }
  if(info['p_number'].length==0){
    info['p_number']='n/a';
  }
  if(info['city'].length==0){
    info['city']='n/a';
  }
  if(info['country'].length==0){
    info['country']='n/a';
  }
  if(info['postal_code'].length==0){
    info['postal_code']='n/a';
  }
  // var first_name=document.getElementById('pro_pic_id').value; 
  showProfile();
  
  document.getElementById('disp_name_id').innerHTML=info['first_name']+"  "+info['last_name'];
  document.getElementById('disp_email_id').innerHTML=info['first_name']+"@eveil.com";
  document.getElementById('disp_p_number_id').innerHTML=info['p_number'];
  document.getElementById('disp_address_id').innerHTML=info['city']+" ,"+info['country']+" - "+info['postal_code'];

}

function showProfile() {
  document.getElementById('show-profile').style.display = 'block';
  document.getElementById('settings-profile').style.display = 'none';
}

function showAccountSettings() {
  document.getElementById('show-profile').style.display = 'none';
  document.getElementById('settings-profile').style.display = 'block';
}