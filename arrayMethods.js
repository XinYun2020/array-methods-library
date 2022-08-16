function forEach(array, cb) {
  for (let i = 0; i < array.length; i++) {
    cb(array[i], i, array); // element, index of the element, copy of the array passed in
  }
}

function map(array, cb) {
  const newArray = []; // initialize empty array
  for (let i = 0; i < array.length; i++) {
    newArray.push(cb(array[i], i, array)); // push new values cb returns into the array
  }
  return newArray;
}

function filter(array, cb) {
  const newArray = []; // initialize empty array
  for (let i = 0; i < array.length; i++) {
    const element = array[i]; // check each in array
    if (cb(element, i, array)) newArray.push(element); // if matches successfully, add new element to the array
    // Not match => do nothing
  }
  return newArray;
}

function reduce(array, cb, initialValue) {
  let currentValue = initialValue;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (initialValue == null && i === 0) {
      // only ever run for the first time for the array
      currentValue = element; // if no starting value, default to first element in the array
    } else {
      currentValue = cb(currentValue, element, i, array); // if have starting value
    }
  }

  return currentValue;
}

function some(array, cb) {
  for (let i = 0; i < array.length; i++) {
    if (cb(array[i], i, array)) return true; // if anything returns true from this callback => return true
  }

  return false;
}

function every(array, cb) {
  for (let i = 0; i < array.length; i++) {
    if (!cb(array[i], i, array)) return false; // any false, return false
  }
  return true; // everything returns true from this callback => return true
}

function flat(array, depth = 1) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    // if the current element is an array
    // && depth > 0
    // add this element to the array and call flat again on this element
    if (Array.isArray(element) && depth > 0) {
      // need flattening
      newArray.push(...flat(element, depth - 1));
      // call the method, depth-- bc we are getting one level deeper
      // push the array and spread it
    } else {
      // add current element to the array
      newArray.push(element);
    }
  }
  return newArray;
}
/*
[1, 2, [3, [4, 5]]] With Depth of 1
check 1 if isArray && depth > 0
1 is not, then push 1 to newArray
same for 2
Current newArray [1, 2]
Next element is [3, [4, 5]]
[3, [4, 5]].isArray == True && depth = 1
call flat again and pass in [3, [4, 5]] as array
	The first element 3 is not array and depth is not > 0
	push 3 to new Array
	Next element [4, 5] isArray, but the depth is 0 now
		(if deepth is not 0, call flat again and pass in [4, 5] as array
			The first element 4 => push to array)
	Add [4, 5] to the end of the newArray
	Return as [3, [4, 5]] and use ... to spread it out
Current newArray = [1, 2, 3, [4, 5]]
*/

function find(array, cb) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i]; // get the element
    if (cb(element, i, array)) return element; // if true, return the element
  }
}

module.exports = {
  forEach,
  map,
  filter,
  reduce,
  some,
  every,
  flat,
  find,
};
