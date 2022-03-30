/*
problem: test for key-value pair equality
data input: two objects
data output: boolean
objects have the following properties to;
- keys
- values
examples below
algorithm approach:
- compare key lengths of the two objects; if not same, return false
- compare all keys of the two objects via loop; if any is not same, return false; //skip this and go straight to the next one
- compare all values of the two objects returned by each key, if any is not the same, return false;
- else return true;
*/

function objectsEqual(obj1, obj2) {
  let obj1KeysArr = Object.keys(obj1);
  let obj2KeysArr = Object.keys(obj2);

  if (obj1KeysArr.length !== obj2KeysArr.length) return false;
  else {
    for (let counter = 0; counter < obj1KeysArr.length; counter++) {
      if (obj1[obj1KeysArr[counter]] !== obj2[obj1KeysArr[counter]]) return false;
    }
    for (let counter = 0; counter < obj2KeysArr.length; counter++) {
      if (obj2[obj2KeysArr[counter]] !== obj1[obj2KeysArr[counter]]) return false;
    }
  }
  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
console.log(objectsEqual({a: 'foo', b: 'foo'}, {b: 'foo', a: 'foo'}));  // true                                      // true
console.log(objectsEqual({a: 'foo', b: 'foo'}, {b: 'foo', a: 'true'}));  // false                                      // true