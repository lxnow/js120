function Greeting() {}

Greeting.prototype.greet = function(message) {
  console.log(message);
};

function Hello() {
};

Hello.prototype = Object.create(Greeting.prototype);

Hello.wave = function() { console.log('I am waving.') };
Hello.prototype.wave = function() { console.log('I am waving.') };

Hello.prototype.hi = function() {
  this.greet('Hello!');
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function() {
  this.greet("Goodbye");
};

let hello = new Hello();
hello.hi();
Hello.wave();
hello.wave(); // does not inherit the wave function in Hello because not in prototype
