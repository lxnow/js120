// class Pet {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// class Cat extends Pet {
//   constructor(name, age, colorFur) {
//     super(name, age);
//     this.colorFur = colorFur;
//   }

//   info() {
//     return `My cat ${this.name} is ${this.age} years old and has ${this.colorFur} fur.`
//   }
// }

class Pet {
  constructor(name, age, colorFur) {
    this.name = name;
    this.age = age;
    this.colorFur = colorFur;
  }

}

class Cat extends Pet {
  info() {
    return `My cat ${this.name} is ${this.age} years old and has ${this.colorFur} fur.`;
  }
}

let pudding = new Cat('Pudding', 7, 'black and white');
let butterscotch = new Cat('Butterscotch', 10, 'tan and white');

console.log(pudding.info());
console.log(butterscotch.info());