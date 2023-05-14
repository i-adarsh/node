const http = require('http');
const url = require('url');

http.createServer((request, response) => {
    console.log(request.url);
    const urls = url.parse(request.url, true);
    console.log(urls);
    console.log(urls.query.keywords);
})
.listen(5000);