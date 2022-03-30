class LivingThingWithLegs {
  constructor(name, walkingStyle) {
    this.name = name;
    this.walkingStyle = walkingStyle;
  }

  walk() {
    return `${this.name} ${this.walkingStyle} forward`
  }
}

class Person extends LivingThingWithLegs {
  constructor(name) {
    super(name, 'strolls')
  }
}

class Cat extends LivingThingWithLegs {
  constructor(name) {
    super(name, 'saunters')
  }
}

class Cheetah extends LivingThingWithLegs {
  constructor(name) {
    super(name, 'runs')
  }
}

let mike = new Person("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = new Cat("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"