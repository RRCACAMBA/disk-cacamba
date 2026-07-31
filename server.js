const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json'};
http.createServer((req,res)=>{
  let pathname = decodeURIComponent(req.url.split('?')[0]);
  if(pathname === '/') pathname = '/index.html';
  const file = path.join(__dirname, pathname);
  if(!file.startsWith(__dirname)){res.writeHead(403);return res.end('Forbidden');}
  fs.readFile(file,(err,data)=>{
    if(err){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Página não encontrada');}
    res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'public, max-age=3600'});res.end(data);
  });
}).listen(port,()=>console.log(`Disk Caçamba no ar na porta ${port}`));
