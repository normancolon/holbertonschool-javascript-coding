// 7-http_express.js
const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 1245;

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

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const database = process.argv[2];
  try {
    const studentsList = await countStudents(database);
    res.send(`This is the list of our students\n${studentsList}`);
  } catch (error) {
    res.send('This is the list of our students\nCannot load the database');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;

