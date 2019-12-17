// https://adventofcode.com/2019/day/2
const fs = require('fs');

const compute = codes => {
  for (let i = 0; i <= codes.length - 4; i += 4) {
    const lhs = codes[codes[i + 1]];
    const rhs = codes[codes[i + 2]];
    const resultPosition = codes[i + 3];

    switch (codes[i]) {
      case 1:
        codes[resultPosition] = lhs + rhs;
        break;

      case 2:
        codes[resultPosition] = lhs * rhs;
        break;

      case 99:
        return codes;
    }
  }

  return codes;
};

const intcodes = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split(',')
  .map(intcode => parseInt(intcode, 10));

compute(intcodes);
console.log(intcodes.join());

module.exports = compute;
