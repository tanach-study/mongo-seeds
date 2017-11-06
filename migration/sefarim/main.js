const allBooks = require('../books.json');
const fetch = require('node-fetch');
const fs = require('fs');

const fetches = [];

for (let book in allBooks) {
  const name     = allBooks[book].book_name;
  fetches.push(fetch(`http://localhost:3000/api/sefarim/${name}`));
}

Promise.all(fetches)
.then(responses => Promise.all(responses.map(r => r.json())))
.then(data => fs.writeFileSync('sefarim.json', JSON.stringify(data)))
.catch(err => console.log(err));
