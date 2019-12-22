class Computer {
  constructor(codes, input) {
    this.codes = codes;
    this.currentValue = input;
    this.pointer = 0;
    this.result = 0;

    this.operations = {
      1: {
        name: 'ADD',
        opSize: 3,
        func: params => {
          const a = params[0];
          const b = params[1];
          const c = params[2];
          this.codes[c] = a + b;
        }
      },
      2: {
        name: 'MUL',
        opSize: 3,
        func: params => {
          const a = params[0];
          const b = params[1];
          const c = params[2];
          this.codes[c] = a * b;
        }
      },
      3: {
        name: 'IN',
        opSize: 1,
        func: resultIndex => {
          this.codes[resultIndex] = this.currentValue;
        }
      },
      4: {
        name: 'OUT',
        opSize: 1,
        func: index => {
          this.result = this.codes[index];
          return this.result;
        }
      }
    };
  }

  decodeInstruction(instruction) {
    const opCode = instruction % 100;
    const aCode = (instruction / 100) % 10;
    const bCode = (instruction / 1000) % 10;

    const params = [];
    const operation = this.operations[opCode];

    if (operation.opSize > 1) {
      params.push(
        aCode < 1
          ? this.codes[this.codes[this.pointer++]]
          : this.codes[this.pointer++]
      );

      params.push(
        bCode < 1
          ? this.codes[this.codes[this.pointer++]]
          : this.codes[this.pointer++]
      );
    }

    params.push(this.codes[this.pointer++]);

    return { operation, params };
  }

  compute() {
    while (true) {
      const instruction = this.codes[this.pointer];
      this.pointer++;

      if (instruction === 99) {
        console.log(this.codes[this.pointer]);
        return;
      }

      const { operation, params } = this.decodeInstruction(instruction);

      operation.func(params);
    }
  }
}

module.exports = Computer;
