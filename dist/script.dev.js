"use strict";

var core = document.getElementById("main");
var searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener('click', function () {
  fetchData();
});
core.style.visibility = 'hidden';
var date = new Date();

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

function getCountryStatics(iso) {
  var res, record;
  return regeneratorRuntime.async(function getCountryStatics$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("https://covid-api.com/api/reports?date=2021-".concat(getCurrentDate(), "&iso=").concat(iso)));

        case 2:
          res = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          record = _context.sent;
          console.log(record.data[0]);
          return _context.abrupt("return", record.data[0]);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getCountries() {
  var temp, countries;
  return regeneratorRuntime.async(function getCountries$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch("https://covid-api.com/api/regions"));

        case 2:
          temp = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(temp.json());

        case 5:
          countries = _context2.sent;
          return _context2.abrupt("return", countries.data);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function fetchData() {
  var countries, res, newSelect, opt, record, data;
  return regeneratorRuntime.async(function fetchData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(getCountryStatics("CHN"));

        case 2:
          _context3.next = 4;
          return regeneratorRuntime.awrap(getCountries());

        case 4:
          countries = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(fetch("https://covid-api.com/api/reports?date=2021-".concat(getCurrentDate(), "&iso=EGY")));

        case 7:
          res = _context3.sent;
          // const temp = await fetch("https://covid-api.com/api/regions");
          // const countries = await temp.json();
          newSelect = document.getElementById("countrySelect");

          for (element in countries) {
            opt = document.createElement("option");
            opt.value = countries[element].iso;
            opt.innerHTML = countries[element].name; // whatever property it has
            // then append it to the select element

            newSelect.appendChild(opt);
          }

          if (!(res != null)) {
            _context3.next = 27;
            break;
          }

          core.style.visibility = 'visible';
          _context3.next = 14;
          return regeneratorRuntime.awrap(res.json());

        case 14:
          record = _context3.sent;
          data = record.data[0]; //console.log(data);

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

        case 27:
        case "end":
          return _context3.stop();
      }
    }
  });
}