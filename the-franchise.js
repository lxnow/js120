let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    // let self = this;
    return [1, 2, 3].map(number =>  { // using the arrow syntax binds `this` to the outer object
      return this.name + ' ' + number;
    });
  },
};

console.log(franchise.allMovies());