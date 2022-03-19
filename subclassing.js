let carPrototype = {
  start: function() {
    this.started = true;
  },

  stop: function() {
    this.started = false;
  },

  init(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    return this
  },
};

let car1 = Object.create(carPrototype);
car1.init('Toyota', 'Corolla', 2016);

console.log(car1);
