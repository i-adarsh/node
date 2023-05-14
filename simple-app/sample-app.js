const url = require('url');
const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    const pathName = request.url;
    if (pathName == '/about'){
        console.log('about');
    } else if (pathName == '/') {
        console.log('homePage');

        response.writeHead(200, {
            'content-type' : 'text/html',
        });
        const fileContent = fs.readFileSync('views/home.html');
        response.write(fileContent);
        response.end();

    } else if (pathName == '/services') {
        console.log('services');
    }
})
.listen(5000);
