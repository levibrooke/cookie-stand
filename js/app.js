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
  allStores.push(this);
}

var allStores = [];

var hours = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'];

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

// Store locations
new Store('1st and Pike', 23, 65, 6.3);
new Store('Seatac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

function renderAllCookies() {
  for (let i = 0; i < allStores.length; i++) {
    allStores[i].calculateCookies(hours);
    allStores[i].render();
    console.log('allStores[i].cookieTotals', allStores[i].cookieTotals);
  }
}

// Invoke
makeTableHeader();
console.log('allStores', allStores);
renderAllCookies();

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
