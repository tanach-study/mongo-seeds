const allBooks = require('../books.json');
const fetch = require('node-fetch');
const fs = require('fs');

const objects = [];

for (let book in allBooks) {
  const name     = allBooks[book].book_name;
  const chapters = allBooks[book].numchapters;
  const id       = allBooks[book].book_id;
  const part     = allBooks[book].part_id;

  for (let i = 1; i <= chapters; i++) {
    fetch(`http://localhost:3000/api/perakim/${name}/${i}`)
    .then(r => r.json())
    .then(perek => {
      objects.push(Object.assign({}, perek, {sefer: name, part_id: part}));
      fs.writeFileSync('output.json', JSON.stringify(objects))
    })
    .catch(err => console.error(err));
  }
}
