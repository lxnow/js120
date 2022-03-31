// name property added to make objects easier to identify
let foo = {
  name: 'foo',
  ancestors: function(obj=this, nameArr=[]) {
    let currentProto = Object.getPrototypeOf(obj);
    if (currentProto.name === undefined) {
      nameArr.push('Object.prototype');
      return nameArr;
    } else {
      nameArr.push(currentProto.name);
      this.ancestors(currentProto, nameArr);
    }
    return nameArr;
  }
};

let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';



console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']

/*
recursive function
- ending condition: prototype name is undefined
get current execution context prototype
if prototype.name is null then 
  push name 'Object.prototype' into array
  return
else 
  push the prototype name into array
  call ancestor() method again`
*/