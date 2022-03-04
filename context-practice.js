let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    function bar() {
      // console.log(this)
      // console.log(this.a + ' ' + this.b);
      // console.log(this)
    }
    console.log(this)
    // bar.call(this);
    bar()
    return 'hello'
  },
};
// console.log(this)
// obj.foo(); // => hello world
console.log(obj.foo())