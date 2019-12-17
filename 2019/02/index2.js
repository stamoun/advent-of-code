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

for (let noun = 0; noun <= 99; ++noun) {
  for (let verb = 0; verb <= 99; ++verb) {
    const initialCodes = [...intcodes];
    initialCodes[1] = noun;
    initialCodes[2] = verb;

    const codes = compute(initialCodes);

    if (codes[0] === 19690720) {
      console.log(100 * noun + verb);
    }
  }
}

compute(intcodes);
