const express =require('express');
const productRoutes = require('./routes/productos');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', productRoutes);
app.use(express.static('public'));

const server = app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${server.address().port}`);
});

server.on('error', err => console.log('Error en el servidor', err));