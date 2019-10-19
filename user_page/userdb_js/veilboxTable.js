var totalEmail = 0;
var totalMailCount = 0;
var seenEmailCount = 0;
var notSeenEmailCount = 0;

var table = document.getElementById('veilboxTable');
var alldata, keys;
messageLoader();

var email = sessionStorage.getItem('email');
var uid = email.substring(0, email.length - 10);
var ref = "emails/" + uid + "/veilbox";
var emailsRef = firebase.database().ref(ref);

emailsRef.on('value', retrieveTable, errData);

function errData(err) {
  console.log("Error!! id: ");
  console.log(err);
}

function retrieveTable(data) {
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
}

function createTable() {
  for (var i = 0; i < 15 && totalEmail > totalMailCount;) {

    var index = keys[totalMailCount];
    if (alldata[index].bin == '0') {
      var row = table.insertRow();
      var attrib = "document.location.href='message.html?key=" + index + "&prev=veilbox'";
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

  document.getElementById('totalMailCount').innerHTML = " (Showing " + totalMailCount + " emails)";
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.getElementById('present_time').innerHTML = "Updated today at " + time;
}

function deleteEmail(key) {
  console.log(key);
  var email = sessionStorage.getItem('email');
  var uid = email.substring(0, email.length - 10);
  var ref = "emails/" + uid + "/veilbox/" + key;
  var userRef = firebase.database().ref(ref);

  userRef.update({
    'bin': "1"
  }).then(e => {
    location.reload();
  });
}

window.onscroll = function (ev) {
  if ((window.innerHeight + window.scrollY + 5) >= document.body.offsetHeight) {
    createTable();
  }
};