const http = require("http");

const server = http.createServer((req, resp) => {
    // req: request process
    // resp: for writing response
    resp.writeHead(200, {'content-type': "text/html"});
    resp.write("<h1>Hello from your first Node JS application</h1>");
    resp.write('<h2>Great Job</h2>');
    resp.write("<button>click Me</button>");
    resp.end('<br />Sayonara');
});

server.listen(5000);

