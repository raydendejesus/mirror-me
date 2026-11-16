const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8787;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const ROOT_WITH_SEP = ROOT + path.sep;

const server = http.createServer((req, res) => {
  let reqPath;
  try{
    reqPath = decodeURIComponent(req.url.split('?')[0]);
  }catch(e){
    res.writeHead(400); res.end('Bad request'); return;
  }
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.normalize(path.join(ROOT, reqPath));
  if (filePath !== ROOT && !filePath.startsWith(ROOT_WITH_SEP)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('Mirror Me running at http://localhost:' + PORT + '/');
  console.log('Keep this window open while you use the app. Close it to stop the server.');
});
