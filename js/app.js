'use strict';

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
}

// Store locations
new Store('1st and Pike', 23, 65, 6.3);
new Store('Seatac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

// Render table header
function makeTable() {
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

makeTable();


// Generate sales reports page
function createReport(list, store) {

  store.calculateCookies(hours);

  console.log('store.cookieTotals', store.cookieTotals);

  for (let i = 0; i < store.cookieTotals.length; i++) {
    var item = document.createElement('li');
    item.textContent = `${hours[i]}: ${store.cookieTotals[i]} cookies`;
    list.appendChild(item);
  }

  var sum = 0;
  store.cookieTotals.reduce(function(prev, curr) {
    return sum = prev + curr;
  });
  console.log('sum', sum);
  var sumItem = document.createElement('li');
  sumItem.textContent = `Total: ${sum} cookies`;
  list.appendChild(sumItem);
}
