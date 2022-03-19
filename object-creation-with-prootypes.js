// let pudding = createPet("Cat", "Pudding");
// console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
// pudding.sleep(); // I am sleeping
// pudding.wake();  // I am awake

// let neptune = createPet("Fish", "Neptune");
// console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
// neptune.sleep(); // I am sleeping
// neptune.wake();  // I am awake


// //Use a factory function to create pet objects. The factory should let us create and use pets like this:

// function createPet(animal, name) {
//   return {
//     animal,
//     name,
//     sleep() { console.log("I am sleeping") },
//     wake() { console.log("I am awake") }, 
//   }
// }

// ----


let PetPrototype = {
  sleep() { console.log("I am sleeping") },
  wake() { console.log("I am awake") },
  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  }
}

//Use the OLOO pattern to create an object prototype that we can use to create pet objects. The prototype should let us create and use pets like this:

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake
