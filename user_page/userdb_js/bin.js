function createTable() {
  var table = document.getElementById('binTable');

  var email = sessionStorage.getItem('email');
  var uid = email.substring(0, email.length - 10);
  var ref = "emails/" + uid;
  var emailsRef = firebase.database().ref(ref);
 
  emailsRef.on('value', data => {
    var alldata = data.val();
    var keys = Object.keys(alldata);
    var totalmsg = 0;

    for (var i = 0; i < keys.length; i++) {
      var index = keys[i];
      if (alldata[index].bin == '1') {
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
        cell4.innerHTML = '<a onClick="undoDelete(\'' + index+'\')">'+ 
        '<i class="fas fa-undo"></i></a><a onClick="deleteEmail(\''+index+'\')">'
        +'<i class="far fa-trash-alt"></i></a>';
        totalmsg++;
        cell4.style.display = 'flex';
        cell4.style.justifyContent = 'space-around';
      }
    }

    document.getElementById('dataTable_info').innerHTML = "Showing " + totalmsg + " emails";

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    document.getElementById('present_time').innerHTML = "Updated today at " + time;
  }, errEmailsData);
}

function errEmailsData(err) {
  console.log("Error!! id: ");
  console.log(err);
}

function undoDelete(key){
  var email = sessionStorage.getItem('email');
  var uid = email.substring(0, email.length - 10);
  var ref = "emails/" + uid + "/" + key;
  var userRef = firebase.database().ref(ref);
  userRef.update({
    'bin': "0"
  }).then(e => {
    location.reload();
  });
}

function deleteEmail(key){
  var email = sessionStorage.getItem('email');
  var uid = email.substring(0, email.length - 10);
  var ref = "emails/" + uid + "/" + key;
  var userRef = firebase.database().ref(ref);

  userRef.remove().then(e => {
    location.reload();
  });
}

createTable();