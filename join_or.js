function joinOr(array, delimiter = ', ', finalDelimiter = 'or') {
  if (array.length === 1) return array.toString();
  else if (array.length === 2) return array[0] + ' ' + finalDelimiter + ' ' + array[1];
  else {
    let stringResult = '';
    for (let counter = 0; counter < array.length - 1; counter++ ){
      stringResult = stringResult + array[counter] + delimiter;
    } 
    stringResult = stringResult +  finalDelimiter + ' ' + array[array.length - 1];
    return stringResult;
  }
}

console.log(joinOr([1]));
console.log(joinOr([1, 2]))
console.log(joinOr([1, 2, 3]))
console.log(joinOr([1, 2, 3], '; '))
console.log(joinOr([1, 2, 3], ', ', 'and'))
console.log(joinOr([1, 2, 3,4, 5, 6], ', ', 'maybe'))

/*
// obj is the context for `joinOr`; replace it with the correct context.
obj.joinOr([1, 2])                   # => "1 or 2"
obj.joinOr([1, 2, 3])                # => "1, 2, or 3"
obj.joinOr([1, 2, 3], '; ')          # => "1; 2; or 3"
obj.joinOr([1, 2, 3], ', ', 'and')   # => "1, 2, and 3"
*/