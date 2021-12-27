var getJSON = function (func, name){
  var url = "./Line.json"
  var request = new XMLHttpRequest();
  request.open("get", url);
  request.send(null);
  request.onload = function () {
      if (request.status == 200) {
          var json = JSON.parse(request.responseText);
          func(json[name]);
      }
  }
}

var data = (func) => {
  getJSON(func,"world_line")
}

var cdata = (func) => {
  getJSON(func,"china_line")
}