// https://adventofcode.com/2019/day/6

const fs = require('fs');

const compute = orbits => {
  const mappedOrbits = {};

  orbits.map(orbit => {
    const [_, planet, satellite] = orbit.match(/(.*)\) ?(.*)/);

    if (mappedOrbits[planet] === undefined) {
      mappedOrbits[planet] = {
        planet: planet,
        satellites: []
      };
    }

    mappedOrbits[planet].satellites.push(satellite);

    if (mappedOrbits[satellite] === undefined) {
      mappedOrbits[satellite] = {
        planet: satellite,
        satellites: []
      };
    }
  });

  const totalOrbits = computeAllOrbits('COM', mappedOrbits, 1);
  return totalOrbits;
};

const computeAllOrbits = (planet, mappedOrbits, level) =>
  mappedOrbits[planet].satellites.reduce(
    (total, satellite) =>
      total + level + computeAllOrbits(satellite, mappedOrbits, level + 1),
    0
  );

const orbits = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split('\r\n');

const result = compute(orbits);
console.log(result);
