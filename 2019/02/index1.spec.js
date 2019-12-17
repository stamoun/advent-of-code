const compute = require('./index1');

test('"1,0,0,0,99" becomes "2,0,0,0,99"', () => {
  const intcodes = [1, 0, 0, 0, 99];
  expect(compute(intcodes).join()).toBe('2,0,0,0,99');
});

test('"2,3,0,3,99" becomes "2,3,0,6,99"', () => {
  const intcodes = [2, 3, 0, 3, 99];
  expect(compute(intcodes).join()).toBe('2,3,0,6,99');
});

test('"2,4,4,5,99,0" becomes "2,4,4,5,99,9801"', () => {
  const intcodes = [2, 4, 4, 5, 99, 0];
  expect(compute(intcodes).join()).toBe('2,4,4,5,99,9801');
});

test('"1,1,1,4,99,5,6,0,99" becomes "30,1,1,4,2,5,6,0,99"', () => {
  const intcodes = [1, 1, 1, 4, 99, 5, 6, 0, 99];
  expect(compute(intcodes).join()).toBe('30,1,1,4,2,5,6,0,99');
});
