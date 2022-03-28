// function Person() {
// }
// Person.prototype.greeting = function(text) {
//   console.log(text);
// }

// function Shouter() {
//   Person.call(this);
// }
// Shouter.prototype = Object.create(Person.prototype)
// Shouter.prototype.greeting = function(text) {
//   Person.prototype.greeting.call(this, text.toUpperCase());
// }

class Person {
  greeting(text) {
    console.log(text);
  }
}

class Shouter extends Person {
  greeting(text) {
    return super.greeting(text.toUpperCase());
  }
}

let person = new Person();
let shouter = new Shouter();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.

/*The original function created linked the two pobjects via their prototypes. 
This can be seen with the Object.create methods applied to Person and assigned
to Shouter's prototype. By doing this, the Shouter object willl have its object
prototype referecing the PErson object. So at this point, if the only thing we have done
is to link the Shouter prototype to the PErson prototype, then the greeting method
would only return the same as Person's greeting method. However, on line 12 the code
overrides the Person's greeting method with its own Shouter greeting method, which
just so happens to be related to the original Person greeting method as can be
seen in how it uses `call`.*/