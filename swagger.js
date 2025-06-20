const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
  apis: ['./routes/*.js', './app.js'], // Ruta a los archivos con anotaciones de Swagger
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };

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
