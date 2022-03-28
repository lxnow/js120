class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  getWheels() {
    return this.wheels;
  }

  info() {
    return `${this.make} ${this.model}`
  }

}

class Car extends Vehicle {
  constructor(make, model) {
    super(make, model, 4);
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model, 2);
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model, 6); 
    this.payload = payload;
  }
}

let car = new Car('Mitsubishi, Lancer');
let motorcycle = new Motorcycle('Yamaha', 'Raider');
let truck = new Truck('Ford, F-150', '100lbs');

console.log(car.getWheels());
console.log(truck.info());
console.log(motorcycle.info());
console.log(car.info());
// console.log(Vehicle.info())