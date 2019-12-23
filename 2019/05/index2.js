// https://adventofcode.com/2019/day/5
const Computer = require('./computer');

const fs = require('fs');

const intCodes = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split(',')
  .map(code => parseInt(code, 10));

const computer = new Computer(intCodes, 5);
computer.compute();
