const http = require('http')
const fs = require('fs')

const userDemo = "/Users/sumabala/Work/Visa/visa-demo/visa-demo-ui/src/profile.json";
const bankDemo = "/Users/sumabala/Work/Visa/visa-demo/visa-bank-ui/src/components/profile.json";

var myArgs = process.argv.slice(2);
console.log("myArgs ", myArgs)
if(! (myArgs[0] && myArgs[1])) {
    console.log("Please pass in bank code ('ABC' or 'NZ') and account number. \n To set the creds for the user app pass in U, \n for the bank app pass in 'B', if nothing is passed in, both will be set ");
    process.exit(1)
}
console.log("commandline args ", myArgs[0])

const data = JSON.stringify({
    "email" : "admin@visademo.com",
    "password": "testing4dm1n"
})

const options = {
  hostname: 'localhost',
  port: 4040,
  path: '/users/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', (d) => {
    process.stdout.write(d);
    const creds = JSON.parse(d);
    let çonfig = {};
    çonfig.routingNumber = myArgs[0] === "ABC"?"ABC-R01020":"NZ-R908070";
    çonfig.accountNumber = myArgs[1];
    çonfig.authToken = creds.token;
    console.log("config is ", çonfig);
    switch(myArgs[2]) {
      case "B":
          fs.writeFileSync(bankDemo, JSON.stringify(çonfig));
          console.log("Updating bank app with new profile")
          break;
      case "U":
          fs.writeFileSync(userDemo, JSON.stringify(çonfig));
          console.log("Updating user app with new profile")
          break;
      default:
          fs.writeFileSync(bankDemo, JSON.stringify(çonfig));
          console.log("Updating bank app with new profile")
          fs.writeFileSync(userDemo, JSON.stringify(çonfig));
          console.log("Updating user app with new profile")
    }
  })
})

req.on('error', (error) => {
  console.error(error)
})

req.write(data)
req.end()