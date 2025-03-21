"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var core = document.getElementById("main");
var loader = document.getElementById("loader");
var searchBtn = document.getElementById("search-btn");
var newSelect = document.getElementById("countrySelect");
searchBtn.addEventListener('click', function () {
  fetchData();
});
core.style.visibility = 'hidden';
loader.style.display = 'none';
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

function getFlagEmoji(countryCode) {
  var codePoints = countryCode.toUpperCase().split('').map(function (_char) {
    return 127397 + _char.charCodeAt();
  });
  return String.fromCodePoint.apply(String, _toConsumableArray(codePoints));
}

function fillCountriesSelect() {
  var countries, opt;
  return regeneratorRuntime.async(function fillCountriesSelect$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(getCountries());

        case 2:
          countries = _context3.sent;
          newSelect = document.getElementById("countrySelect");

          for (element in countries) {
            opt = document.createElement("option");
            opt.value = countries[element].iso;
            opt.innerHTML = countries[element].name; // whatever property it has
            // then append it to the select element

            newSelect.appendChild(opt);
          }

        case 5:
        case "end":
          return _context3.stop();
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
  var res, record, data;
  return regeneratorRuntime.async(function fetchData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(fetch("https://covid-api.com/api/reports?date=2021-".concat(getCurrentDate(), "&iso=").concat(newSelect.value)));

        case 2:
          res = _context4.sent;
          toggledisplay(loader); //loader.style.display = 'block';

          if (!(res != null)) {
            _context4.next = 24;
            break;
          }

          //toggleVisbility(core);
          core.style.visibility = 'visible';
          toggledisplay(loader);
          _context4.next = 9;
          return regeneratorRuntime.awrap(res.json());

        case 9:
          record = _context4.sent;
          data = record.data[0];
          console.log(data);
          document.getElementById("country").innerHTML = data["region"].name;
          document.getElementById("date").value = data["date"];
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

        case 24:
        case "end":
          return _context4.stop();
      }
    }
  });
}