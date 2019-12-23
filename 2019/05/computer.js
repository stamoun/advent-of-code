class Computer {
  constructor(codes, input) {
    this.codes = codes;
    this.currentValue = input;
    this.pointer = 0;
    this.result = 0;
  }

  computeInstruction(instruction) {
    const opCode = instruction % 100;
    const aMode = Math.floor(instruction / 100) % 10;
    const bMode = Math.floor(instruction / 1000) % 10;

    const a =
      aMode === 0
        ? this.codes[this.codes[this.pointer + 1]]
        : this.codes[this.pointer + 1];

    const b =
      bMode === 0
        ? this.codes[this.codes[this.pointer + 2]]
        : this.codes[this.pointer + 2];

    const dest = this.codes[this.pointer + 3];

    switch (opCode) {
      case 1:
        this.codes[dest] = a + b;
        this.pointer += 4;
        break;

      case 2:
        this.codes[dest] = a * b;
        this.pointer += 4;
        break;

      case 3:
        this.codes[this.codes[this.pointer + 1]] = this.currentValue;
        this.pointer += 2;
        break;

      case 4:
        this.result = a;
        this.pointer += 2;
        break;

      case 5:
        if (a !== 0) {
          this.pointer = b;
        } else {
          this.pointer += 3;
        }
        break;

      case 6:
        if (a === 0) {
          this.pointer = b;
        } else {
          this.pointer += 3;
        }
        break;

      case 7:
        this.codes[dest] = a < b ? 1 : 0;
        this.pointer += 4;
        break;

      case 8:
        this.codes[dest] = a === b ? 1 : 0;
        this.pointer += 4;
        break;

      default:
        throw new Error(`Invalid opCode ${opCode}`);
    }
  }

  compute() {
    while (true) {
      const instruction = this.codes[this.pointer];

      if (instruction === 99) {
        console.log(this.result);
        return;
      }

      this.computeInstruction(instruction);
    }
  }
}

module.exports = Computer;
