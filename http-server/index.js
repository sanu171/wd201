const http = require("http");
const fs = require("fs");

let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});
fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});
const port = process.argv.find(arg => arg.includes('--port='));
const portNumber = port ? parseInt(port.split('=')[1]) : 3000;
http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/registration":
        response.write(registrationContent);
        response.end();
        break;
      case  "/":
        response.write(homeContent);
        response.end();
        break;
      case  "/project":
        response.write(projectContent);
        response.end();
        break;
     
      default:
        response.statusCode = 404;
      response.end('Not Found');
        break;
        
    }
    
  })
  .listen(portNumber);

 
