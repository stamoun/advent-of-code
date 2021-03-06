// https://adventofcode.com/2019/day/3
const fs = require('fs');

const direction = { up: 'U', right: 'R', down: 'D', left: 'L' };
const operations = {
  [direction.up]: { x: 0, y: 1 },
  [direction.right]: { x: 1, y: 0 },
  [direction.down]: { x: 0, y: -1 },
  [direction.left]: { x: -1, y: 0 }
};

function compute(wirePaths) {
  const wires = wirePaths.split('\n');

  const wire1Positions = getPoints(wires[0]);
  const wire2Positions = getPoints(wires[1]);

  let intersections = [];
  for (const [key, value] of Object.entries(wire1Positions)) {
    if (key !== '0, 0' && !!wire2Positions[key]) {
      intersections.push(value);
    }
  }

  const distance = computeShortestDistance(intersections);

  return distance;
}

function getPoints(wirePath) {
  const movementData = wirePath.split(',');
  let positions = {};
  let previousPosition = { x: 0, y: 0 };

  movementData.map(movement => {
    const direction = movement.substr(0, 1);
    const distance = parseInt(movement.substr(1), 10);

    for (let i = 0; i < distance; ++i) {
      const point = {
        x: previousPosition.x + operations[direction].x,
        y: previousPosition.y + operations[direction].y
      };

      positions[`${point.x}, ${point.y}`] = point;
      previousPosition = point;
    }
  });

  return positions;
}

function getDistance(point) {
  return Math.abs(point.x) + Math.abs(point.y);
}

function computeShortestDistance(intersections) {
  let shortestDistance = Number.MAX_SAFE_INTEGER;

  intersections.map(intersection => {
    const currentDistance = getDistance(intersection);
    if (
      currentDistance !== null &&
      currentDistance !== 0 &&
      currentDistance < shortestDistance
    ) {
      shortestDistance = currentDistance;
    }
  });

  if (shortestDistance === Number.MAX_SAFE_INTEGER) {
    throw new Error('Shortest distance not found');
  }

  return shortestDistance;
}

if (require.main === module) {
  const paths = fs.readFileSync(`${__dirname}/input`).toString();
  const distance = compute(paths);

  console.log(distance);
}

module.exports = compute;
