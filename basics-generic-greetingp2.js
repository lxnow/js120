class Cat {

  static genericGreeting = function() {
    console.log(`Hello! I'm a cat!`);
  }

  constructor(name) {
    this.name = name;
  }

  personalGreeting() {
    console.log(`Hello, my name is ${this.name}.`)
  }
}

let kitty = new Cat("Sophie");
Cat.genericGreeting();
kitty.personalGreeting();
