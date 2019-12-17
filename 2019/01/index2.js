// https://adventofcode.com/2019/day/1
const fs = require('fs');

const entries = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split('\n');

const compute = mass => {
  const fuel = Math.max(Math.floor(mass / 3) - 2, 0);
  const fuelWeight = fuel > 0 ? compute(fuel) : 0;

  return fuel + fuelWeight;
};

const fuel = entries.map(compute);
const total = fuel.reduce((currentTotal, current) => currentTotal + current);

console.log(total);
