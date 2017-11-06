const fetch = require('node-fetch');
const fs = require('fs');

fetch('http://localhost:3000/api/videos')
.then(r => r.json())
.then(videos => fs.writeFileSync('videos.json', JSON.stringify(videos)))
.catch(err => console.error(err))
