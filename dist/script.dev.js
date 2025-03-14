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
  var date, res, temp, countries, newSelect, opt, record, data;
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
          _context.next = 7;
          return regeneratorRuntime.awrap(fetch("https://covid-api.com/api/regions"));

        case 7:
          temp = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(temp.json());

        case 10:
          countries = _context.sent;
          newSelect = document.getElementById("countrySelect");
          console.log(newSelect);

          for (element in countries.data) {
            opt = document.createElement("option");
            console.log(countries.data[element].name);
            console.log(countries.data[element].iso);
            opt.value = countries.data[element].iso;
            opt.innerHTML = countries.data[element].name; // whatever property it has
            // then append it to the select element

            newSelect.appendChild(opt);
          }

          if (!(res != null)) {
            _context.next = 32;
            break;
          }

          core.style.visibility = 'visible';
          _context.next = 18;
          return regeneratorRuntime.awrap(res.json());

        case 18:
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
          document.getElementById("recovered").value = data.recovered;
          document.getElementById("recovered_diff").value = data.recovered_diff;
          document.getElementById("fatality_rate").value = data.fatality_rate;

        case 32:
        case "end":
          return _context.stop();
      }
    }
  });
}

fetchData();