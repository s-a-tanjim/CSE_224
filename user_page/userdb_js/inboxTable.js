var totalEmail = 0;
var totalMailCount = 0;
var seenEmailCount = 0;
var notSeenEmailCount = 0;

var table = document.getElementById('inboxTable');
var alldata, keys;

messageLoader();

var email = sessionStorage.getItem('email');
var uid = email.substring(0, email.length - 10);
var refUser = "user/" + uid;
var userRef = firebase.database().ref(refUser);

userRef.on('value', retrieveData, errData);

function retrieveData(data) { //For session only

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
  retrieveTable(); //to create table
}

function errData(err) {
  console.log("Error!! id: ");
  console.log(err);
}

function retrieveTable() {
  var refEmail = "emails/" + uid + "/received";
  var emailsRef = firebase.database().ref(refEmail);
  emailsRef.on('value', data => {
    alldata = data.val();
    if (alldata === null || alldata === undefined) {
      var row = table.insertRow();
      var cell = row.insertCell();
      cell.setAttribute('colspan', 4);
      cell.setAttribute('style', 'text-align:center;')
      cell.innerHTML = "No Data Available";
      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      document.getElementById('present_time').innerHTML = "Updated today at " + time;
    } else {
      keys = Object.keys(alldata);
      keys.reverse();
      totalEmail = keys.length;
      createTable();
    }
    document.getElementById('messageLoader').style.display='none';
  }, errEmailsData);
}

function createTable() {

  for (var i = 0; i < 15 && totalEmail > totalMailCount;) {

    var index = keys[totalMailCount];
    if (alldata[index].bin == '0') {
      var row = table.insertRow();
      var attrib = "document.location.href='message.html?key=" + index + "&prev=received'";
      //document.location.href="../index.html?invalid_action_from_inbox"
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = alldata[index].from;
      cell2.innerHTML = alldata[index].subject;
      cell3.innerHTML = alldata[index].date;
      cell4.innerHTML = '<a onClick="deleteEmail(\'' + index + '\')"><i class="far fa-trash-alt"></i></a>';
      cell1.setAttribute('onClick', attrib);
      cell2.setAttribute('onClick', attrib);
      cell3.setAttribute('onClick', attrib);

      if (alldata[index].seen == '0') {
        row.setAttribute('style', 'background-color:rgba(0,0,0,0.2)');
        notSeenEmailCount++;
      } else {
        seenEmailCount++;
      }
      i++;
    }
    totalMailCount++;
  }


  document.getElementById('totalMailCount').innerHTML = " (Showing " + (seenEmailCount + notSeenEmailCount) + " emails)";
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.getElementById('present_time').innerHTML = "Updated today at " + time;
}

function errEmailsData(err) {
  console.log("Error!! id: ");
  console.log(err);
}

function deleteEmail(key) {
  console.log(key);
  var email = sessionStorage.getItem('email');
  var uid = email.substring(0, email.length - 10);
  var ref = "emails/" + uid + "/received/" + key;
  var userRef = firebase.database().ref(ref);

  userRef.update({
    'bin': "1"
  }).then(e => {
    location.reload();
  });
}

var tableData = document.getElementsByClassName('tableData');

function onMouseEffect(x) {
  //x.style="background-color:rgba(0,0,0,0.2);";
}

function mouseLeaveEffect(x) {
  //x.style="background-color:white";
}

window.onscroll = function (ev) {
  //console.log("winHeight: " + window.innerHeight);
  //console.log("WinScrollTop: " + window.scrollY);
  //console.log("DocHeight: " + document.body.offsetHeight);
  if ((window.innerHeight + window.scrollY + 5) >= document.body.offsetHeight) {
    // We're at the bottom of the page
    //console.log('end');
    createTable();
  }
};
