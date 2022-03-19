const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}

Object.assign(Car.prototype, Speed);
Object.assign(Truck.prototype, Speed);

let blueTruck = new Truck();
blueTruck.goFast(); // => logs "I'm a Truck and going super fast!"

let smallCar = new Car();
smallCar.goFast(); // => logs "I'm a Car and going super fast!"
console.log('goFast' in smallCar);

/*
When we mixed in Speed into the Car prototype (not the Car object, but it's prototype object) using object.assign, we made the Speed object available to the Car object. Since goFast is a function of the Speed object, it can then be accessed by the Car object. When we created a `new` object smallCar from the class Car, the object inhertis all of these properties, i.e. it's [[Prototype]] or __proto__ property points to the class's `prototype` object. Recall taht this prototype object has access to the goFast function. So running `smallCar.goFast` works. Because goFast logs a string usign a template literal with the `this.constructor.name, the following happens: (1) this refers to the calling object which is smallCar, (2) constructor refers to smallCar's constructor, which is Car -- the object / class that created it, and (3) `name` is the `... constructor has a name property!
*/

console.log(Object.getOwnPropertyNames(Car))
console.log(Object.getPrototypeOf(Car))
console.log(smallCar.constructor.name)
console.log(Car.constructor === Object.constructor)
console.log(Object.constructor)
