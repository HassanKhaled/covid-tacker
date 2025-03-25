"use strict";

var core = document.getElementById("main");
var loader = document.getElementById("loader");
var dateQuery = document.getElementById("date");
var searchBtn = document.getElementById("search-btn");
var newSelect = document.getElementById("countrySelect");
core.style.visibility = 'hidden';
loader.style.display = 'none';
var date = new Date();
dateQuery.value = "2021-".concat(getCurrentDate());
searchBtn.addEventListener('click', function () {
  fetchData();
});

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

function getProvincesByCountryIso(iso) {
  var results, record;
  return regeneratorRuntime.async(function getProvincesByCountryIso$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("https://covid-api.com/api/provinces?iso=".concat(iso)));

        case 2:
          results = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(results.json());

        case 5:
          record = _context.sent;
          return _context.abrupt("return", record.data);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getCountryStatics(iso) {
  var res, record;
  return regeneratorRuntime.async(function getCountryStatics$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(fetch("https://covid-api.com/api/reports?date=".concat(dateQuery.value, "&iso=").concat(iso)));

        case 2:
          res = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(res.json());

        case 5:
          record = _context2.sent;
          return _context2.abrupt("return", record);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getCountries() {
  var temp, countries;
  return regeneratorRuntime.async(function getCountries$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(fetch("https://covid-api.com/api/regions"));

        case 2:
          temp = _context3.sent;
          _context3.next = 5;
          return regeneratorRuntime.awrap(temp.json());

        case 5:
          countries = _context3.sent;
          return _context3.abrupt("return", countries.data);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function fillCountriesSelect() {
  var countries, opt;
  return regeneratorRuntime.async(function fillCountriesSelect$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(getCountries());

        case 2:
          countries = _context4.sent;
          newSelect = document.getElementById("countrySelect");

          for (element in countries) {
            opt = document.createElement("option");
            opt.value = countries[element].iso;
            opt.innerHTML = countries[element].name;
            newSelect.appendChild(opt);
          }

          fillProvinceSelect(newSelect.value);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function fillProvinceSelect(iso) {
  var provinces, opt;
  return regeneratorRuntime.async(function fillProvinceSelect$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(getProvincesByCountryIso(iso));

        case 2:
          provinces = _context5.sent;
          newSelect = document.getElementById("provinceSelect");
          console.log(provinces);

          for (element in provinces) {
            opt = document.createElement("option");
            opt.value = provinces[element].iso;
            opt.innerHTML = provinces[element].province; // whatever property it has
            // then append it to the select element

            newSelect.appendChild(opt);
          }

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
}

fillCountriesSelect();

function fillElementByRequest(id, data, attr) {
  document.getElementById(id).value = data[attr];
}

function toggledisplay(elem) {
  elem.style.visibility = elem.style.visibility == 'block' ? 'none' : 'block';
}

function fetchData() {
  var record, data;
  return regeneratorRuntime.async(function fetchData$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(getCountryStatics(newSelect.value));

        case 2:
          record = _context6.sent;
          toggledisplay(loader);

          if (record != null) {
            core.style.visibility = 'visible';
            toggledisplay(loader);
            data = record.data[0];
            document.getElementById("country").innerHTML = data["region"].name;
            dateQuery.value = data["date"];
            document.title = "Covid-19 Stats- ".concat(data["region"].name);
            fillElementByRequest("active", data, "active");
            fillElementByRequest("active_diff", data, "active_diff");
            fillElementByRequest("death", data, "deaths");
            fillElementByRequest("death_diff", data, "deaths_diff");
            fillElementByRequest("confirmed", data, "confirmed");
            fillElementByRequest("confirmed_diff", data, "confirmed_diff");
            fillElementByRequest("recovered", data, "recovered");
            fillElementByRequest("recovered_diff", data, "recovered_diff");
            fillElementByRequest("fatality_rate", data, "fatality_rate");
          }

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
}