const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Configurar CORS
app.use(cors({
    origin: '*', // En producción, reemplaza '*' con el dominio específico de tu frontend
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept']
}));

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos desde el directorio actual
app.use(express.static('.'));

// Ruta de ejemplo para probar CORS
app.get('/api/saludo', (req, res) => {
    res.json({
        mensaje: '¡Hola CORS! La petición se realizó correctamente con CORS habilitado.'
    });
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '¡Algo salió mal en el servidor!' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log('Presiona Ctrl+C para detener el servidor');
});
