function createTable() {
  var table = document.getElementById('sentTable');

  var email = sessionStorage.getItem('email');
  var uid = email.substring(0, email.length - 10);
  var ref = "emails/" + uid;
  var emailsRef = firebase.database().ref(ref);
  var totalmsg = 0;

  emailsRef.on('value', data => {
    var alldata = data.val();
    var keys = Object.keys(alldata);

    for (var i = 0; i < keys.length; i++) {
      var index = keys[i];
      if (alldata[index].bin == '0' && alldata[index].mode == 'sent') {
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

createTable();