var totalEmail = 0;
var totalMailCount = 0;
var seenEmailCount = 0;
var notSeenEmailCount = 0;

var table = document.getElementById('binTable');
var alldata, keys;
messageLoader();

var email = sessionStorage.getItem('email');
var uid = email.substring(0, email.length - 10);

var refRec = "emails/" + uid + "/received";
var refSent = "emails/" + uid + "/sent";
var refVail = "emails/" + uid + "/veilbox";
var ReceivedRef = firebase.database().ref(refRec);
var SentRef = firebase.database().ref(refSent);
var VailRef = firebase.database().ref(refVail);

ReceivedRef.on('value', data => {
  alldata = data.val();
  if (nullChecker(alldata)) {
    //pas// No table will be created
  } else {
    keys = Object.keys(alldata);
    keys.reverse();
    totalEmail = keys.length;
    createTable("received");
  }
}, errData);
SentRef.on('value', data => {
  alldata = data.val();
  if (nullChecker(alldata)) {
    //pas// No table will be created
  } else {
    keys = Object.keys(alldata);
    keys.reverse();
    totalEmail = keys.length;
    createTable("sent");
  }
}, errData);
VailRef.on('value', data => {
  alldata = data.val();
  if (nullChecker(alldata)) {
    if(totalMailCount==0){
      var row = table.insertRow();
      var cell = row.insertCell();
      cell.setAttribute('colspan', 4);
      cell.setAttribute('style', 'text-align:center;')
      cell.innerHTML = "No Data Available";
    }
  } else {
    keys = Object.keys(alldata);
    keys.reverse();
    totalEmail = keys.length;
    createTable("veilbox");
  }
  document.getElementById('messageLoader').style.display='none';
}, errData);

function createTable(from) {
  for (var i = 0; i < totalEmail; i++) {

    var index = keys[i];
    if (alldata[index].bin == '1') {
      var row = table.insertRow();
      var attrib = "document.location.href='message.html?key=" + index + "&prev=" + from + "'";
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = alldata[index].from;
      cell2.innerHTML = alldata[index].subject;
      cell3.innerHTML = alldata[index].date;

      var parameter = from + "/" + index;
      cell4.innerHTML = '<a onClick="undoDelete(\'' + parameter + '\')">' +
        '<i class="fas fa-undo"></i></a><a onClick="deleteEmail(\'' + parameter + '\')">' +
        '<i class="far fa-trash-alt"></i></a>';
      cell4.style.display = 'flex';
      cell4.style.justifyContent = 'space-around';

      cell1.setAttribute('onClick', attrib);
      cell2.setAttribute('onClick', attrib);
      cell3.setAttribute('onClick', attrib);

      if (alldata[index].seen == '0') {
        row.setAttribute('style', 'background-color:rgba(0,0,0,0.2)');
        notSeenEmailCount++;
      } else {
        seenEmailCount++;
      }
      totalMailCount++;
    }
  }

  document.getElementById('totalMailCount').innerHTML = " (Showing " + totalMailCount + " emails)";
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.getElementById('present_time').innerHTML = "Updated today at " + time;
}

function deleteEmail(parameter) {
  var email = sessionStorage.getItem('email');
  var uid = email.substring(0, email.length - 10);
  var ref = "emails/" + uid + "/" + parameter;
  var userRef = firebase.database().ref(ref);

  userRef.remove().then(e => {
    location.reload();
  });
}

function undoDelete(parameter) {
  var email = sessionStorage.getItem('email');
  var uid = email.substring(0, email.length - 10);
  var ref = "emails/" + uid + "/" + parameter;
  var userRef = firebase.database().ref(ref);
  userRef.update({
    'bin': "0"
  }).then(e => {
    location.reload();
  });
}s

function errData(err) {
  console.log("Error!! id: ");
  console.log(err);
}

function nullChecker(alldata) {
  if (alldata === null || alldata === undefined) {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.getElementById('present_time').innerHTML = "Updated today at " + time;
    return true;
  } else {
    return false;
  }
}