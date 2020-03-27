exports.myDateTime = function () {
  return this.myTime() + ' on the ' + this.myDate();
};


exports.myDate = function () {

  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var date = d.getDate();

  return date + '/' + (month+1) + '/' + year;
};


exports.myTime = function () {
  var d = new Date();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();

  return hour + ':' + minute + ':' + second
};
