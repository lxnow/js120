function myFilter(array, func, filterObj) {
  let result = [];

  // console.log(filterObj)
  // console.log(filterObj.allowedValues.indexOf(6))


  array.forEach(function(value) {
    let newFunc = func.bind(filterObj, value);
    if (newFunc()) {
      result.push(value);
    }
  });

  return result;
}

let filter = {
  allowedValues: [5, 6, 9],
}

console.log(myFilter([2, 1, 3, 4, 5, 6, 9, 12], function(val) {
  return this.allowedValues.indexOf(val) >= 0;
}, filter)); // returns [5, 6, 9]