const express =require('express');
const Contenedor = require('./Contenedor');

const app = express();
const PORT = 3000;
const productos = new Contenedor('productos');

const server = app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${server.address().port}`);
});

server.on('error', err => console.log('Error en el servidor', err));

app.get('/productos', (req, res) => {
    productos.getAll().then(productos => res.send(productos));
});

app.get('/productosRandom', (req, res) => {
    productos.getAll().then(productos => {
        const quantity = productos.length;
        const randIndex = Math.floor(Math.random() * quantity);

        res.send(productos[randIndex]);
    });
});