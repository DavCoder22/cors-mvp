// Opciones de configuración de Swagger/OpenAPI
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CORS MVP API',
      version: '1.0.0',
      description: 'API para demostración de configuración CORS',
      contact: {
        name: 'Soporte',
        email: 'tu@email.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      },
      {
        url: 'http://3.91.1.153:3000',
        description: 'Servidor de producción'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Acceso no autorizado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'No autorizado',
                  },
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './routes/*.js', 
    './app.js',
    './server.js',
    './swagger.js'
  ], // Ruta a los archivos con anotaciones de Swagger
};

module.exports = options;

// Documentación de la API
/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para autenticación de usuarios
 * 
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios
 * 
 * @swagger
 * tags:
 *   name: CORS
 *   description: Endpoints para pruebas de CORS
 */

/**
 * @swagger
 * /api/saludo:
 *   get:
 *     summary: Obtiene un saludo
 *     description: Retorna un mensaje de saludo para probar la API
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
 *                   example: Hola Mundo
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/verificar-cors:
 *   options:
 *     summary: Verifica configuración CORS
 *     description: |
 *       ### Descripción Detallada
 *       Este endpoint permite verificar la configuración CORS del servidor.
 *       
 *       ### Cómo Funciona
 *       1. El navegador envía una petición OPTIONS (preflight)
 *       2. El servidor responde con los encabezados CORS configurados
 *       3. Si los encabezados son correctos, el navegador permite la petición real
 *       
 *       ### Uso Típico
 *       ```javascript
 *       // Ejemplo de verificación CORS con fetch
 *       fetch('http://api.ejemplo.com/api/verificar-cors', {
 *         method: 'OPTIONS',
 *         headers: {
 *           'Origin': 'http://tusitio.com',
 *           'Access-Control-Request-Method': 'GET',
 *           'Access-Control-Request-Headers': 'authorization'
 *         }
 *       });
 *       ```
 *     tags: [CORS]
 *     parameters:
 *       - in: header
 *         name: Origin
 *         schema:
 *           type: string
 *         description: Origen de la petición (ej. http://tusitio.com)
 *         required: true
 *     responses:
 *       200:
 *         description: CORS configurado correctamente
 *         headers:
 *           Access-Control-Allow-Origin:
 *             schema:
 *               type: string
 *               example: "*"
 *             description: Orígenes permitidos (usar dominio específico en producción)
 *           Access-Control-Allow-Methods:
 *             schema:
 *               type: string
 *               example: "GET, POST, OPTIONS"
 *             description: Métodos HTTP permitidos
 *           Access-Control-Allow-Headers:
 *             schema:
 *               type: string
 *               example: "Content-Type, Authorization"
 *             description: Cabeceras permitidas en la petición
 *           Access-Control-Max-Age:
 *             schema:
 *               type: integer
 *               example: 86400
 *             description: Tiempo en segundos que los resultados de la preflight pueden ser cacheados
 *       403:
 *         description: Acceso denegado por política CORS
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Origen no permitido"
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene lista de usuarios
 *     description: Retorna una lista de usuarios (ejemplo)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de usuarios a devolver
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
