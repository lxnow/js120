const walkMixIn = {
  walk() { 
    return "Let's go for a walk!"
  }
}

class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello! My name is ${this.name}!`;
  }
}

Object.assign(Cat.prototype, walkMixIn);

let kitty = new Cat("Sophie");

Object.assign(kitty, walkMixIn)

console.log(kitty.greet());
console.log(kitty.walk());