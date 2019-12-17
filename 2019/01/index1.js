// https://adventofcode.com/2019/day/1
const fs = require('fs');

const entries = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split('\n');

const fuel = entries.map(mass => Math.floor(mass / 3) - 2);
const total = fuel.reduce((currentTotal, current) => currentTotal + current);

console.log(total);
