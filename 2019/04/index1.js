// https://adventofcode.com/2019/day/4

function isValid(password) {
  const passwordChars = password.toString().split('');

  return has2AdjacentNumbers(passwordChars) && isIncreasingOrEqual(passwordChars);
}

function isIncreasingOrEqual(password) {
  let isAlwaysIncreasingOrEqual = true;

  password.reduce((previousChar, currentChar) => {
    if (previousChar > currentChar) {
      isAlwaysIncreasingOrEqual = false;
    }
    return currentChar;
  });

  return isAlwaysIncreasingOrEqual;
}

function has2AdjacentNumbers(password) {
  let has2AdjacentNumbers = false;

  password.reduce((previousChar, currentChar) => {
    if (previousChar === currentChar) {
      has2AdjacentNumbers = true;
    }
    return currentChar;
  });

  return has2AdjacentNumbers;
}

function compute(lower, upper) {
  let validPasswordCount = 0;

  for (let i = lower; i < upper; ++i) {
    if (isValid(i)) {
      validPasswordCount++;
    }
  }

  return validPasswordCount;
}

if (require.main === module) {
  const response = compute(254032, 789860);
  console.log(response);
}
