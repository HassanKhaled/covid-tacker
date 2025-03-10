"use strict";

var core = document.getElementById("main");

function getCurrentDate() {
  var currentDate = new Date();
  var month = new Intl.DateTimeFormat('en-US', {
    month: '2-digit'
  }).format(currentDate);
  var day = new Intl.DateTimeFormat('en-US', {
    day: '2-digit'
  }).format(currentDate);
  return "".concat(month, "-").concat(day);
}

function fetchData() {
  var date, res, record, data;
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          core.style.visibility = 'hidden';
          date = new Date();
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("https://covid-api.com/api/reports?date=2021-".concat(getCurrentDate(), "&iso=EGY")));

        case 4:
          res = _context.sent;

          if (!(res != null)) {
            _context.next = 20;
            break;
          }

          core.style.visibility = 'visible';
          _context.next = 9;
          return regeneratorRuntime.awrap(res.json());

        case 9:
          record = _context.sent;
          data = record.data[0];
          console.log(data);
          document.getElementById("country").innerHTML = data.region.name;
          document.getElementById("date").value = data.date;
          document.getElementById("active").value = data.active;
          document.getElementById("active_diff").value = data.active_diff;
          document.getElementById("death").value = data.deaths;
          document.getElementById("death_diff").value = data.deaths_diff;
          document.getElementById("confirmed").value = data.confirmed;
          document.getElementById("confirmed_diff").value = data.confirmed_diff;

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
}

fetchData();