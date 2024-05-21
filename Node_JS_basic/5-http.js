// 5-http.js
const http = require('http');
const fs = require('fs').promises;
const url = require('url');

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== '');
    
    const students = lines.slice(1); // Skip the header line
    const fields = {};

    students.forEach((student) => {
      const [firstName, lastName, age, field] = student.split(',');
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(firstName);
    });

    let result = `Number of students: ${students.length}\n`;
    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const list = fields[field].join(', ');
        result += `Number of students in ${field}: ${fields[field].length}. List: ${list}\n`;
      }
    }
    return result.trim();
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

const app = http.createServer(async (req, res) => {
  const reqUrl = url.parse(req.url, true);
  
  if (reqUrl.pathname === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (reqUrl.pathname === '/students') {
    const database = process.argv[2];
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    try {
      const studentsList = await countStudents(database);
      res.end(`This is the list of our students\n${studentsList}`);
    } catch (error) {
      res.end('This is the list of our students\nCannot load the database');
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

const port = 1245;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;

