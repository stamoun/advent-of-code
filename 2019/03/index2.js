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

  let intersections = wire1Positions.filter(pos =>
    wire2Positions.some(pos2 => pos.x === pos2.x && pos.y === pos2.y)
  );

  const stepsPerIntersection = getStepsPerIntersections(
    intersections,
    wire1Positions,
    wire2Positions
  );

  const minimumSteps = getLeastSteps(stepsPerIntersection);

  return minimumSteps;
}

function getPoints(wirePath) {
  const movementData = wirePath.split(',');
  let positions = [{ x: 0, y: 0 }];

  movementData.map(movement => {
    const direction = movement.substr(0, 1);
    const distance = parseInt(movement.substr(1), 10);
    let previousPosition = positions[positions.length - 1];

    for (let i = 0; i < distance; ++i) {
      const point = {
        x: previousPosition.x + operations[direction].x,
        y: previousPosition.y + operations[direction].y
      };

      positions.push(point);
      previousPosition = point;
    }
  });

  return positions;
}

function getStepsPerIntersections(
  intersections,
  wire1Positions,
  wire2Positions
) {
  let stepsPerIntersections = [];

  intersections.map(intersection => {
    if (intersection.x !== 0 && intersection.y !== 0) {
      const wire1Steps = getStepsPerIntersection(intersection, wire1Positions);
      const wire2Steps = getStepsPerIntersection(intersection, wire2Positions);

      stepsPerIntersections.push({
        intersection: intersection,
        steps: wire1Steps + wire2Steps
      });
    }
  });

  return stepsPerIntersections;
}

function getStepsPerIntersection(intersection, wirePositions) {
  for (let steps = 1; steps < wirePositions.length; ++steps) {
    const position = wirePositions[steps];

    if (position.x === 0 && position.y === 0) {
      continue;
    }

    if (position.x === intersection.x && position.y === intersection.y) {
      return steps;
    }
  }

  throw new Error('No intersection found');
}

function getLeastSteps(stepsPerIntersections) {
  const stepsPerIntersection = stepsPerIntersections.reduce((acc, cv) => {
    return acc.steps < cv.steps ? acc : cv;
  });

  return stepsPerIntersection.steps;
}

if (require.main === module) {
  const paths = fs.readFileSync(`${__dirname}/input`).toString();
  const distance = compute(paths);

  console.log(distance);
}

module.exports = compute;
