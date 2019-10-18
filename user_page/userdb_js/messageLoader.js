function messageLoader(){
  var row = table.insertRow();
  var cell = row.insertCell();
  cell.setAttribute('style','text-align:center;padding-top:28px;');
  cell.setAttribute('id','messageLoader');
  cell.setAttribute('colspan', 4);
  var span1=document.createElement('span');
  span1.setAttribute('class','message-loader');
  cell.appendChild(span1);
  var span=document.createElement('span');
  span.setAttribute('class','message-loader-inner');
  cell.appendChild(span);
}