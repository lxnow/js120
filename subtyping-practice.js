class Greeting {
  greet(str) {
    console.log(str);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet('Hello');
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet('Goodbye');
  }
}

let test = new Hello;
test.hi();  
let test2 = new Goodbye;
test2.bye();

/*
input: none
output: print out strings without using console.log


*/