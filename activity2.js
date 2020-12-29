const { response } = require('express');
const fs = require('fs');
const http = require('http');
const url = require('url');
const lookup = require('mime-types').lookup;
const { parse } = require('querystring');
const ids = {
    1: 'Apple',
    2: 'Ball',
    3: 'Cat',
    4: 'Dog',
    5: 'Egg'
};
const server = http.createServer((req,res) => {
    if(req.method==='POST'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            //console.log(parse(body).id);
            res.end(JSON.stringify({id: parse(body).id, name: ids[parse(body).id]}));
        });
    }
    else{
        let parsedUrl = url.parse(req.url, true);
        console.log(parsedUrl);
        let path = parsedUrl.pathname;
        path = path.replace(/^\/+|\/+$/g, "");
        if(path==""){
            path = 'index.html';
        }

        fs.readFile('./index.html', (err, content) => {
            if(err){
                console.log(err);
                res.writeHead(404);
                res.end("Page not found");
            }
            else{
                let mime = lookup(path);
                res.writeHead(200, {"Content-type": mime});
                // switch(path){
                //     case "style.css":
                //         res.writeHead(200, {"Content-type": "text/css"});
                //         break;
                //     case "index.html":
                //         res.writeHead(200, {"Content-type": "text/html"});
                // }
                res.end(content);
            }
        
        });
    }


    
})
server.listen(3000, () => {
    console.log("Listening...");
});
