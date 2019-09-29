var email = sessionStorage.getItem('email');
var uid = email.substring(0, email.length - 10);
var refUser = "user/" + uid;
var userRef = firebase.database().ref(refUser);

userRef.on('value', retrieveData, errData);

function retrieveData(data) {

  var alldata = data.val();
  //var keys = Object.keys(alldata);
  //var k = keys[0];

  const first_name = alldata.first_name;
  const last_name = alldata.last_name;
  const phone_number = alldata.phone_number;
  const city = alldata.city;
  const country = alldata.country;
  const postal_code = alldata.postal_code;
  const sent_email = alldata.sent_email;

  sessionStorage.setItem('first_name', first_name);
  sessionStorage.setItem('last_name', last_name);
  sessionStorage.setItem('phone_number', phone_number);
  sessionStorage.setItem('city', city);
  sessionStorage.setItem('country', country);
  sessionStorage.setItem('postal_code', postal_code);
  sessionStorage.setItem('sent_email', sent_email);
  createTable();
}

function errData(err) {
  console.log("Error!! id: ");
  console.log(err);
}

function createTable() {
  var table = document.getElementById('inboxTable');

  var refEmail = "emails/" + uid;
  var emailsRef = firebase.database().ref(refEmail);
  var totalmsg = 0;
  emailsRef.on('value', data => {
    var alldata = data.val();
    var keys = Object.keys(alldata);
    

    for (var i = 0; i < keys.length; i++) {
      var index = keys[i];
      if (alldata[index].bin == '0' && alldata[index].mode == 'received') {
        if (totalmsg == 0)
          table.deleteRow(0);
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = alldata[index].from;
        cell2.innerHTML = '<a href="message.html?key=' + index + '">' + alldata[index].subject + '</a>';
        cell3.innerHTML = alldata[index].date;
        //cell4.innerHTML = '<a href="userdb_js/deleteEmail.html?key='+index+'"><i class="far fa-trash-alt"></i></a>';
        cell4.innerHTML = '<a onClick="deleteEmail(\'' + index + '\')"><i class="far fa-trash-alt"></i></a>';
        totalmsg++;
      }
    }
    document.getElementById('dataTable_info').innerHTML = "Showing " + totalmsg + " emails";
  }, errEmailsData);

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.getElementById('present_time').innerHTML = "Updated today at " + time;
}

function errEmailsData(err) {
  console.log("Error!! id: ");
  console.log(err);
}

function deleteEmail(key) {
  var email = sessionStorage.getItem('email');
  var uid = email.substring(0, email.length - 10);
  var ref = "emails/" + uid + "/" + key;
  var userRef = firebase.database().ref(ref);

  userRef.update({
    'bin': "1"
  }).then(e => {
    location.reload();
  });
}