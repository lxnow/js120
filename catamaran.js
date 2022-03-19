class Vehicle {
  constructor(kmTravelledPerLiter, fuelCapInLiter) {
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }

}

class WheeledVehicle extends Vehicle {
  constructor(tirePressure) {
    super(kmTravelledPerLiter, fuelCapInLiter);
    this.tires = tirePressure;
    // this.fuelEfficiency = kmTravelledPerLiter;
    // this.fuelCap = fuelCapInLiter;
  }
  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }
}

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30,30,32,32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20,20], 80, 8.0);
  }
}

class Catamaran extends Vehicle {
  constructor(propellerCount, hullCount) {
    // catamaran specific logic
    super(kmTravelledPerLiter, fuelCapInLiter);
    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
  }
}


console.log(Vehicle.prototype)
/*
This new class doesn't fit well with our existing class hierarchy: Catamarans don't have tires, and aren't wheeled vehicles. However, we still want to share the code for tracking fuel efficiency and range. Modify the class definitions and move code into a mix-in, as needed, to share code between the Catamaran and the wheeled vehicle classes.
*/