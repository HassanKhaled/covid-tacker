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
          /* 
          data": [
          {
          "date": "2020-04-16",
          "confirmed": 2673,
          "deaths": 196,
          "recovered": 596,
          "confirmed_diff": 168,
          "deaths_diff": 13,
          "recovered_diff": 7,
          "last_update": "2020-04-16 23:30:31",
          "active": 1881,
          "active_diff": 148,
          "fatality_rate": 0.0733,
          "region": {
          "iso": "EGY",
          "name": "Egypt",
          "province": "",
          "lat": "26.8206",
          "long": "30.8025",
          "cities": []
          }
          }
          ]
          
          
          */
          // document.getElementById("date").innerHTML = "12-9-2025";
          // document.getElementById("areaName").innerHTML = "Egypt";
          // document.getElementById("latestBy").innerHTML = "202365";
          // document.getElementById("deathNew").innerHTML = "985";

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}

fetchData();