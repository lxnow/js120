function Animal() {
    this.type = "mammal";

    this.breathe = function() {
      console.log("I'm breathing");
    };
}

console.log(Animal.prototype.constructor === Animal);
console.log(Animal)

function Child(name, school) {
  Person.call(this, name);
  this.school = school;
}