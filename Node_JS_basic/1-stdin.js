// 1-stdin.js

// Display welcome message
console.log('Welcome to Holberton School, what is your name?');

// Listen for user input from stdin
process.stdin.on('data', (data) => {
  const name = data.toString().trim();
  console.log(`Your name is: ${name}`);
  process.exit();
});

// Display closing message when the process is about to exit
process.on('exit', () => {
  console.log('This important software is now closing');
});

