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

  const youToCom = [];
  computePlanetsToCom(mappedOrbits, 'YOU', youToCom);

  const sanToCom = [];
  computePlanetsToCom(mappedOrbits, 'SAN', sanToCom);

  const youOrbits = youToCom.reduce((stepsToCommonPlanet, planet) => {
    if (!sanToCom.includes(planet)) {
      stepsToCommonPlanet++;
    }
    return stepsToCommonPlanet;
  }, 0);

  const sanOrbits = sanToCom.reduce((stepsToCommonPlanet, planet) => {
    if (!youToCom.includes(planet)) {
      stepsToCommonPlanet++;
    }
    return stepsToCommonPlanet;
  }, 0);

  const result = youOrbits + sanOrbits;
  return result;
};

const computePlanetsToCom = (mappedOrbits, startPlanet, result) => {
  for (const planet in mappedOrbits) {
    if (mappedOrbits[planet].satellites.includes(startPlanet)) {
      result.push(planet);
      computePlanetsToCom(mappedOrbits, planet, result);
    }
  }
};

const orbits = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split('\r\n');

const result = compute(orbits);
console.log(result);
