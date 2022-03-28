console.log(Object.getPrototypeOf("Hello").constructor.name);
console.log(Object.getPrototypeOf([1,2,3]).constructor.name);
console.log(Object.getPrototypeOf({name: 'Srdjan'}).constructor.name);


console.log("Hello".constructor.name);
console.log([1,2,3].constructor.name);
console.log({name: 'Srdjan'}.constructor.name);