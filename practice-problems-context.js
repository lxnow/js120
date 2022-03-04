let foo = {
  a: 0,
  incrementA: () => {
    increment = () => {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a) // 3