'use strict';

// Store locations
var firstAndPike = {
  location: '1st and Pike',
  min: 23,
  max: 65,
  avg: 6.3,
  generateCustomers: function(min, max) {
    return Math.random() * (max - min) + min;
  },
  calculateCookies: function(hours) {
    for (let i = 0; i < hours.length; i++) {
      var customers = this.generateCustomers(this.min, this.max);
      this.cookieTotals.push(Math.ceil(customers * this.avg));
    }
    return;
  },
  cookieTotals: []
};

var seatacAirport = {
  location: 'SeaTac Airport',
  min: 3,
  max: 24,
  avg: 1.2,
  generateCustomers: function(min, max) {
    return Math.random() * (max - min) + min;
  },
  calculateCookies: function(hours) {
    for (let i = 0; i < hours.length; i++) {
      var customers = this.generateCustomers(this.min, this.max);
      this.cookieTotals.push(Math.ceil(customers * this.avg));
    }
    return;
  },
  cookieTotals: []
};

var seattleCenter = {
  location: 'Seattle Center',
  min: 11,
  max: 38,
  avg: 3.7,
  generateCustomers: function(min, max) {
    return Math.random() * (max - min) + min;
  },
  calculateCookies: function(hours) {
    for (let i = 0; i < hours.length; i++) {
      var customers = this.generateCustomers(this.min, this.max);
      this.cookieTotals.push(Math.ceil(customers * this.avg));
    }
    return;
  },
  cookieTotals: []
};

var capitolHill = {
  location: 'Capitol Hill',
  min: 20,
  max: 38,
  avg: 2.3,
  generateCustomers: function(min, max) {
    return Math.random() * (max - min) + min;
  },
  calculateCookies: function(hours) {
    for (let i = 0; i < hours.length; i++) {
      var customers = this.generateCustomers(this.min, this.max);
      this.cookieTotals.push(Math.ceil(customers * this.avg));
    }
    return;
  },
  cookieTotals: []
};

var alki = {
  location: 'Alki',
  min: 2,
  max: 16,
  avg: 4.6,
  generateCustomers: function(min, max) {
    return Math.random() * (max - min) + min;
  },
  calculateCookies: function(hours) {
    for (let i = 0; i < hours.length; i++) {
      var customers = this.generateCustomers(this.min, this.max);
      this.cookieTotals.push(Math.ceil(customers * this.avg));
    }
    return;
  },
  cookieTotals: []
};

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

// Target lists
var pikeList = document.getElementById('first-pike');
var seatacList = document.getElementById('seatac');
var seattleCenterList = document.getElementById('seattle-center');
var capHillList = document.getElementById('cap-hill');
var alkiList = document.getElementById('alki');

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

createReport(pikeList, firstAndPike);
createReport(seatacList, seatacAirport);
createReport(seattleCenterList, seattleCenter);
createReport(capHillList, capitolHill);
createReport(alkiList, alki);
