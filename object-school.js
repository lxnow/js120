function createStudent(nameArg, yearArg) {
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

school = {
  students: [],

  addStudent(name, year) {
    if (['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
      studentObj = createStudent(name, year);
      // let student = {[name]: studentObj}
      this.students.push(studentObj);
      return studentObj; // this line is key to ensure that this method actually returns an object, which should then be assigned to another variable that can then be used to pass around. Since this is an object that refers to the same _thing_, then this all works out well
    } else console.log('Invalid year. Only enter 1st, 2nd, 3rd, 4th or 5th.');
  },

  enrollStudent(studentName, course) {
    this.students.forEach(student => {
      if (student['name'] === studentName) {
        student.addCourse(course);    
      }
    })
  },

  getReportCard(student) {
    school.students.forEach(enrolledStudent => {
      if (enrolledStudent === student) {
        enrolledStudent['courses'].forEach(course => {
          course['grade'] ? console.log(`${course['name']}: ${course['grade']}`) : console.log(`${course['name']}: In progress`)
        })
      }
    })
  },

  courseReport(course) {
    let count = 0;
    let sum = 0;
    console.log(`=${course} Grades=`);

    this.students.forEach(student => {
      student['courses'].forEach(elementCourse => {
        if (course === elementCourse['name']) {
          elementCourse['grade'] ? console.log(`${student['name']}: ${elementCourse['grade']}`) : '';
          sum += Number(elementCourse['grade']);
          count += 1;
        }
      })
    })

    console.log(`---`);
    console.log(`Course Average: ${sum / count ? sum / count : 'n/a'}`)
  },

}

school.addStudent('foo', '6');
let foo = school.addStudent('foo', '3rd');
school.enrollStudent('foo', { name: 'Math', code: 101, grade: 95, });
school.enrollStudent('foo', { name: 'Advanced Math', code: 102, grade: 90, });
school.enrollStudent('foo', { name: 'Physics', code: 202, });

let bar = school.addStudent('bar', '1st');
school.enrollStudent('bar', { name: 'Math', code: 101, grade: 91, });

let qux = school.addStudent('qux', '2nd');
school.enrollStudent('qux', { name: 'Math', code: 101, grade: 93, });
school.enrollStudent('qux', { name: 'Advanced Math', code: 102, grade: 90, });

// console.log(school.students)

school.getReportCard(foo); // changed this pass a string but should be object
// = Math: 95
// = Advanced Math: 90
// = Physics: In progress

school.courseReport('Math');
// = =Math Grades=
// = foo: 95
// = bar: 91
// = qux: 93
// = ---
// = Course Average: 93

school.courseReport('Advanced Math');
// = =Advanced Math Grades=
// = foo: 90
// = qux: 90
// = ---
// = Course Average: 90

school.courseReport('Physics');
// = undefined