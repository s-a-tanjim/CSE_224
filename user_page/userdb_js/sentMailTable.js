var totalEmail = 0;
var totalMailCount = 0;
var seenEmailCount = 0;
var notSeenEmailCount = 0;

var email = sessionStorage.getItem('email');
var uid = email.substring(0, email.length - 10);
var ref = "emails/" + uid+"/sent";
var emailsRef = firebase.database().ref(ref);

emailsRef.on('value', retrieveTable, errData);

function errData(err) {
  console.log("Error!! id: ");
  console.log(err);
}

var table = document.getElementById('sentTable');
var alldata, keys;

function retrieveTable(data) {
  alldata = data.val();
  keys = Object.keys(alldata);
  totalEmail = keys.length;
  createTable();
}

function createTable() {
  for (var i = 0; i < 15 && totalEmail > totalMailCount; i++) {

    var index = keys[totalMailCount];
    if (alldata[index].bin == '0') {
      var row = table.insertRow();
      var attrib = "document.location.href='message.html?key=" + index + "&prev=sent'";
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
    }
    totalMailCount++;
  }

  document.getElementById('totalMailCount').innerHTML = " (Showing " + totalMailCount + " emails)";
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.getElementById('present_time').innerHTML = "Updated today at " + time;
}

function deleteEmail(key) {
  console.log(key);
  var email = sessionStorage.getItem('email');
  var uid = email.substring(0, email.length - 10);
  var ref = "emails/" + uid + "/sent/" + key;
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