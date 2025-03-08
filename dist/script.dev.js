"use strict";

function getCurrentDate() {
  var currentDate = new Date();
  var month = new Intl.DateTimeFormat('en-US', {
    month: '2-digit'
  }).format(currentDate);
  var day = new Intl.DateTimeFormat('en-US', {
    day: '2-digit'
  }).format(currentDate);
  console.log("Current Date: ".concat(month, "-").concat(day));
  return "".concat(month, "-").concat(day);
}

function fetchData() {
  var date, res, record, data;
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          date = new Date();
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("https://covid-api.com/api/reports?date=2021-".concat(getCurrentDate(), "&iso=EGY")));

        case 3:
          res = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(res.json());

        case 6:
          record = _context.sent;
          data = record.data[0];
          document.getElementById("country").innerHTML = data.region.name;
          document.getElementById("date").value = data.date;
          document.getElementById("active").value = data.active;
          document.getElementById("deathNew").value = data.deaths;
          document.getElementById("confirmed").value = data.confirmed;

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}

fetchData();