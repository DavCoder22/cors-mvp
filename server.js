const express = require('express');
const path = require('path');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 3000;

// Importar opciones de Swagger
const swaggerOptions = require('./swagger');

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

// Configurar Swagger
const specs = swaggerJsdoc(swaggerOptions);

// Configurar Swagger UI
const swaggerUiOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Documentación API CORS MVP'
};

// Ruta para la interfaz de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// Ruta para obtener la especificación OpenAPI en formato JSON
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

// Middleware de registro para depuración
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

/**
 * @swagger
 * /api/saludo:
 *   get:
 *     summary: Obtiene un mensaje de saludo
 *     description: Retorna un mensaje de saludo para probar la API y CORS
 *     tags: [CORS]
 *     responses:
 *       200:
 *         description: Saludo obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: ¡Hola CORS! La petición se realizó correctamente con CORS habilitado.
 */
app.get('/api/saludo', (req, res) => {
    res.json({
        mensaje: '¡Hola CORS! La petición se realizó correctamente con CORS habilitado.'
    });
});

/**
 * @swagger
 * /api/verificar-cors:
 *   options:
 *     summary: Verifica configuración CORS
 *     description: Endpoint para verificar la configuración CORS del servidor
 *     tags: [CORS]
 *     responses:
 *       200:
 *         description: CORS configurado correctamente
 *         headers:
 *           Access-Control-Allow-Origin:
 *             schema:
 *               type: string
 *               example: "*"
 *           Access-Control-Allow-Methods:
 *             schema:
 *               type: string
 *               example: "GET, POST, OPTIONS"
 *           Access-Control-Allow-Headers:
 *             schema:
 *               type: string
 *               example: "Content-Type, Authorization"
 */
app.options('/api/verificar-cors', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
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
