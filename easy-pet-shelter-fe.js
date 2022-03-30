class Pet {
  constructor(species, name) {
    this.species = species;
    this.name = name;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.petsOwned = []; //add pet object
  }

  numberOfPets() {
    return this.petsOwned.length;
  }
}

class Shelter {
  constructor(petsInShelter) {
    this.registeredOwners = [];
    this.petsInShelter = petsInShelter;
  }

  adopt(owner, pet) {
    if (!this.registeredOwners.includes(owner)) {
      this.registeredOwners.push(owner);
    }
    owner.petsOwned.push(pet);
    this.removePetFromShelter(pet);
  }

  removePetFromShelter(pet) {
    if(this.petsInShelter.includes(pet)) {
      let arrayLocation = petsInShelter.indexOf(pet);
      petsInShelter.splice(arrayLocation, 1);
    }
  }

  printAdoptions() {
    this.registeredOwners.forEach(owner => {
      console.log(`${owner.name} has adopted the following pets:`);
      owner.petsOwned.forEach(pet => {
        console.log(`a ${pet.species} named ${pet.name}`);
      })
      console.log(`\n`)
    })
  }

  printUnadoptedPets() {
    console.log(`The Animal Shelter has the following unadopted pets:`);
    this.petsInShelter.forEach(pet =>  {
      console.log(`a ${pet.species} named ${pet.name}`);
    })
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');
let asta         = new Pet('dog', 'Asta');
let laddie       = new Pet('dog', 'Laddie');
let fluffy       = new Pet('cat', 'Fluffy');
let kat          = new Pet('cat', 'Kat');
let ben          = new Pet('cat', 'Ben');
let chatterbox   = new Pet('parakeet', 'Chatterbox');
let bluebell     = new Pet('parakeet', 'Bluebell');

let petsInShelter = [
  butterscotch, pudding, darwin, kennedy, sweetie, molly, chester, asta, laddie, fluffy, kat, ben, chatterbox, bluebell,
];

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter(petsInShelter);
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);

let lxnow = new Owner('L Now');
shelter.adopt(lxnow, chatterbox);

shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

console.log(`${lxnow.name} has ${lxnow.numberOfPets()} adopted pets.`);

console.log(shelter.printUnadoptedPets());
console.log(`The Animal shelter has ${petsInShelter.length} unadopted pets.`)