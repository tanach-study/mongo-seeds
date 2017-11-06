const allTeachers = require('./allTeachers.json')
const fetch = require('node-fetch');
const fs = require('fs');

// // to get all the teachers
// fetch('http://localhost:3000/api/teachers')
// .then(r => r.json())
// .then(teachers => fs.writeFileSync('allTeachers.json', JSON.stringify(teachers)))
// .catch(err => console.error(err))

const fetches = [];

for (let teacher in allTeachers) {
  const id = allTeachers[teacher].teacher_id;
  fetches.push(fetch(`http://localhost:3000/api/teachers/${id}`));
}

Promise.all(fetches)
.then(responses => Promise.all(responses.map(r => r.json())))
.then(data => fs.writeFileSync('teachers.json', JSON.stringify(data)))
.catch(err => console.log(err));
