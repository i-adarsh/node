// Importing file module
const fs = require('fs');

// Reading file
// readFile - async
// readFileSync - sync

fs.readFile('abc.txt', (error, data) => {
    if (error) {
        console.log('error');
        console.log(error);
    } else{
        console.log(data.toString());
    }
});

console.log('terminated');

// Writing File

let content = "new content for new file";
fs.writeFile('bcd.txt', content, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('saved');
    }
});

// Append

fs.appendFile('abc.txt', '\nsome new content', (err) => {
    if (err){
        console.log('error' + err);
    } else{
        console.log('saved');
    }
});


// File Deletion
// Step 1 - Creating a new file
fs.writeFileSync('toBeDeleted.txt', 'to be delete', (err) => {
    if (err) {
        console.log('error ' + err);
    } else {
        console.log('file  created');
    }
});


// Step 2 - Deleting the newly created file
fs.unlink('toBeDeleted.txt', (err) => {
    if (err) {
        console.log('error: ' + err);
    } else {
        console.log('file deleted');
    }
});