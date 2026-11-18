// Servidor estático mínimo para servir la carpeta public/ durante la prueba funcional
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const RAIZ = path.join(__dirname, '..', 'public');
const PUERTO = 8080;
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.webmanifest': 'application/manifest+json',
  '.json': 'application/json',
};

http.createServer((req, res) => {
  const ruta = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const archivo = path.join(RAIZ, ruta === '/' ? 'index.html' : ruta);
  if (!archivo.startsWith(RAIZ)) { res.writeHead(403); return res.end(); }

  fs.readFile(archivo, (err, datos) => {
    if (err) { res.writeHead(404); return res.end('No encontrado'); }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(archivo)] || 'application/octet-stream' });
    res.end(datos);
  });
}).listen(PUERTO, () => console.log(`Sirviendo ${RAIZ} en http://localhost:${PUERTO}`));
