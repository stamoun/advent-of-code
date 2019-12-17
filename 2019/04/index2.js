// https://adventofcode.com/2019/day/4

function isValid(password) {
  const passwordChars = password.toString().split('');

  return hasOneDoubleDigit(passwordChars) && isIncreasingOrEqual(passwordChars);
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

function hasOneDoubleDigit(password) {
  let streak = password[0];

  for (let i = 1; i < password.length; ++i) {
    var currentChar = password[i];

    if (currentChar === streak[0]) {
      streak = streak.concat(currentChar);
    } else {
      if (streak.length === 2) {
        return true;
      }

      streak = currentChar;
    }
  }

  return streak.length === 2;
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
