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

// Lista fija de archivos permitidos, leída una sola vez al iniciar.
// La ruta que llega en la petición solo se usa para buscar en esta lista;
// nunca se usa para construir una ruta de disco.
const ARCHIVOS = new Map(
  fs.readdirSync(RAIZ).map(nombre => ['/' + nombre, path.join(RAIZ, nombre)])
);
ARCHIVOS.set('/', path.join(RAIZ, 'index.html'));

http.createServer((req, res) => {
  const ruta = new URL(req.url, 'http://localhost').pathname;
  const archivo = ARCHIVOS.get(ruta);
  if (!archivo) { res.writeHead(404); return res.end('No encontrado'); }

  fs.readFile(archivo, (err, datos) => {
    if (err) { res.writeHead(500); return res.end('Error al leer el archivo'); }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(archivo)] || 'application/octet-stream' });
    res.end(datos);
  });
}).listen(PUERTO, () => console.log(`Sirviendo ${RAIZ} en http://localhost:${PUERTO}`));
