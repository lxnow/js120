createStudent = function(nameArg, yearArg) {
  return {
    name: nameArg,
    year: yearArg, 
    courses: [],

    info: function() {
      console.log(`${this.name} is a ${this.year} year student.`)
    },

    addCourse: function(courseObj) {
      this.courses.push(courseObj);
    },

    listCourses: function() {
      return this.courses;
    },

    addNote: function(courseCode, noteArg) {
      for (const element of this.courses) {
        if (element['code'] === courseCode) {
          if (element['note']) {
            element['note'] = `${element['note']}; ${noteArg}`;
          } else element['note'] = noteArg;
        }
      }
    },

    updateNote: function(courseCode, noteArg) {
      for (const element of this.courses) {
        if (element['code'] === courseCode) {
          element['note'] = noteArg;
        }
      }
    },

    viewNotes: function() {
      for (const element of this.courses) {
        if (element['note']) {
          console.log(`${element['name']}: ${element['note']}`);
        }
      }
    },

  }
}



let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
console.log(foo.listCourses());
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
console.log(foo.listCourses());
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"