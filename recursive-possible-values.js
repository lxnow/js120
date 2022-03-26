function possibleValues(hand, curIndex = 0, curSum = 0, resultsArray = []) {
  if (curIndex === hand.length) {
    resultsArray.push(curSum)
    return;
  }
  
  if (hand[curIndex].length === 2) {
    let branchSum1 = curSum + hand[curIndex][0];
    let branchSum2 = curSum + hand[curIndex][1];
    curIndex += 1;
    possibleValues(hand, curIndex, branchSum1, resultsArray);
    possibleValues(hand, curIndex, branchSum2, resultsArray);
  } else {
    curSum = curSum + hand[curIndex][0]
    curIndex += 1;
    curSum = possibleValues(hand, curIndex, curSum, resultsArray);
  }
  return resultsArray;
}


console.log(possibleValues([[1,11], [5]])) // 6, 16
console.log(possibleValues([[1,11], [2], [1,11]])) // 6, 16
console.log(possibleValues([[10,10], [10,10], [10,10], [1,0] ])) // 7, 17, 17, 27

console.log(possibleValues([[1,11], [2,11], [1,1], [2,2],[3,2], [1,11]]).sort((a, b) => a - b))


/*
input: array of arrays
output: a single arrays
algo:
- evaluate the length of array
- if array is 1 then include it in the elements to add
- if aray is more than 1 then take the first element to add
- ^ apply the recursive function here when going down to add
- ending outcome: when the end the end of the array is met, then return the total number

function x(arrays, curIndex = 0, curSum = 0)
  let returnArray = [curSum, curIndex]
  curIndex += 1

  if arrays[0] is length one, then 
    curSum = curSum + arrays[0]
  else if arrays[0] length > 1, then
    branch1 = x(arrays, curIndex, curSum = curSum + arrays[curIndex][0])
    branch2 = x(arrays, curIndex, curSum = curSum + arrays[curIndex][1])

  if curIndex < arrays.length then keep going forward
    x(arrays, curIndex, curSum = curSum + arrays[curIndex[0]])

  else if curIndex = arrays.length, then
    returnArray = [curSum, curIndex]
    return returnArray;
  if returnArray[1] is as long as arrays.length
    possibleResults.push(curSum);
*/
