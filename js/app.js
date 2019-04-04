'use strict';

var allStores = [];

var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

// Store constructor
function Store(location, min, max, avg) {
  this.location = location;
  this.min = min;
  this.max = max;
  this.avg = avg;
  this.generateCustomers = function(min, max) {
    return Math.random() * (max-min) + min;
  };
  this.calculateCookies = function(hours) {
    for (let i = 0; i < hours.length; i++) {
      var customers = this.generateCustomers(this.min, this.max);
      this.cookieTotals.push(Math.ceil(customers * this.avg));
    }
  };
  this.cookieTotals = [];
  allStores.push(this);
}

// Render cookie sales
Store.prototype.render = function() {
  var row = document.createElement('tr');

  var storeLabel = document.createElement('td');
  storeLabel.textContent = this.location;
  row.appendChild(storeLabel);

  for (let i = 0; i < this.cookieTotals.length; i++) {
    var entry = document.createElement('td');
    entry.textContent = this.cookieTotals[i];
    row.appendChild(entry);
  }

  var sum = 0;
  this.cookieTotals.reduce(function(prev, curr) {
    return sum = prev + curr;
  });

  var storeTotal = document.createElement('td');
  storeTotal.textContent = sum;
  row.appendChild(storeTotal);

  var table = document.getElementById('table');
  table.appendChild(row);
};

// Render table header
function makeTableHeader() {
  var row = document.createElement('tr');
  var emptyHeader = document.createElement('th');
  emptyHeader.textContent = '';
  row.appendChild(emptyHeader);

  for (let i = 0; i < hours.length; i++) {
    var header = document.createElement('th');
    header.textContent = hours[i];
    row.appendChild(header);
  }

  var totalHeader = document.createElement('th');
  totalHeader.textContent = 'Daily Location Total';
  row.appendChild(totalHeader);

  var table = document.getElementById('table');
  table.appendChild(row);
}

// Render table footer
function makeTableFooter() {
  var row = document.createElement('tr');
  row.id = 'table-footer';
  var totalsLabel = document.createElement('td');
  totalsLabel.textContent = 'Totals';
  row.appendChild(totalsLabel);

  var hourTotals = [];

  for (let i = 0; i < hours.length; i++) {

    var hourTotal = 0;
    var hourTotalContent = document.createElement('td');

    for (let j = 0; j < allStores.length; j++) {
      hourTotal = hourTotal + allStores[j].cookieTotals[i];
    }
    hourTotalContent.textContent = hourTotal;
    hourTotals.push(hourTotal);
    row.appendChild(hourTotalContent);
  }

  var sum = 0;
  hourTotals.reduce(function(prev, curr) {
    return sum = prev + curr;
  });

  var grandTotal = document.createElement('td');
  grandTotal.textContent = sum;
  row.appendChild(grandTotal);

  var table = document.getElementById('table');
  table.appendChild(row);
}

function renderAllCookies(stores) {
  for (let i = 0; i < stores.length; i++) {
    stores[i].calculateCookies(hours);
    stores[i].render();
  }
}

function renderNewStore(store) {
  var rowCheck = document.getElementById('table-footer');
  if (rowCheck) {
    rowCheck.innerHTML = '';
  }

  store.calculateCookies(hours);
  store.render();
}

// Create stores
new Store('1st and Pike', 23, 65, 6.3);
new Store('Seatac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

// Call functions
makeTableHeader();
renderAllCookies(allStores);
makeTableFooter();

// Handle new store form
var addLocationSubmit = document.getElementById('add-location');

function handleNewLocation(e) {
  e.preventDefault();

  var newLocation = e.target.location.value;
  var newMin = e.target.min.value;
  var newMax = e.target.max.value;
  var newAvg = e.target.avg.value;

  var newStore = new Store(newLocation, newMin, newMax, newAvg);

  renderNewStore(newStore);
  makeTableFooter();

  // clear form
  addLocationSubmit.reset();
}

addLocationSubmit.addEventListener('submit', handleNewLocation);
