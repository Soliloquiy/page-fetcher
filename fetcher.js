const request = require('request');
const fs = require('fs');
const readline = require('readline');
const argv = process.argv.slice(2);
const url = argv[0];
const saveTo = argv[1]


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

request(url, (error, response, body) => {
  if (error) {
    console.log('Error, URL is invalid. Closing app...');
  }

  else if (!saveTo) {
    console.log('Error, file does not exist. Closing app...')
  } else {
  //Use fs.writeFile to check if file already exists
  fs.writeFile(saveTo, body, {flag: 'wx'}, (error) => {
    if (error) {
      //Use rl.question for prompt to user for input
      rl.question('Type Y to overwrite the file', (answer) => {
        //Close prompt when finished
        rl.close()
        if (answer === 'Y') {
          // callback write function without checking for if file exists
          fs.writeFile(saveTo, body, (error) => {
            if(error) {
              console.log(error)
            } else console.log(`File Overwritten: Downloaded and saved ${body.length} bytes to ${saveTo}`)
          })
        } else {
          console.log('Closing app...')
        } 
      })
    }
    else {
    console.log(`Downloaded and saved ${body.length} bytes to ${saveTo}`)
  }});
  }

});