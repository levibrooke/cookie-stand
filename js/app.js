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
  cookieTotals: [],
  hourlyTotals: {
    '6am': 0,
    '7am': 0,
    '8am': 0
  }
};

var seatacAirport = {
  location: 'SeaTac Airport',
  min: 3,
  max: 24,
  avg: 1.2
};

var seattleCenter = {
  location: 'Seattle Center',
  min: 11,
  max: 38,
  avg: 3.7
};

var capitolHill = {
  location: 'Capitol Hill',
  min: 20,
  max: 38,
  avg: 2.3
};

var alki = {
  location: 'Alki',
  min: 2,
  max: 16,
  avg: 4.6
};

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

// Generate sales reports page
var test = document.getElementById('first');

firstAndPike.calculateCookies(hours);

console.log('firstAndPike.cookieTotals', firstAndPike.cookieTotals);

for (let i = 0; i < firstAndPike.cookieTotals.length; i++) {
  var item = document.createElement('li');
  item.textContent = `${hours[i]}: ${firstAndPike.cookieTotals[i]} cookies`;
  test.appendChild(item);
}
