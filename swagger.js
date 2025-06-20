// Swagger/OpenAPI configuration options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CORS MVP API',
      version: '1.0.0',
      description: 'API for CORS configuration demonstration. This MVP includes:\n' +
        '\n- Interactive frontend to test CORS' +
        '\n- Backend with Node.js/Express' +
        '\n- Documentation with Swagger/OpenAPI' +
        '\n- AWS deployment with Terraform',
      contact: {
        name: 'Support',
        email: 'your@email.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'http://34.227.72.22:3000',
        description: 'Production server'
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
          description: 'Unauthorized access',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Unauthorized',
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

// Exportar la configuración de Swagger
module.exports = options;

/**
 * Ejemplo de documentación de un endpoint
 * 
 * @swagger
 * /api/ejemplo:
 *   get:
 *     summary: Obtiene un recurso de ejemplo
 *     description: |
 *       Este es un endpoint de ejemplo que muestra cómo documentar diferentes aspectos
 *       de un endpoint RESTful, incluyendo parámetros, respuestas y ejemplos.
 *     tags: [Ejemplos]
 *     parameters:
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/offsetParam'
 *       - in: header
 *         name: X-Request-ID
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID único de la solicitud
 *     responses:
 *       200:
 *         description: Lista de recursos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Saludo'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 100
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     offset:
 *                       type: integer
 *                       example: 0
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     security:
 *       - bearerAuth: []
 *     deprecated: false
 *     externalDocs:
 *       description: Más información
 *       url: https://ejemplo.com/docs/ejemplo
 */

/**
 * @swagger
 * /api/ejemplo/{id}:
 *   get:
 *     summary: Obtiene un recurso específico
 *     description: Obtiene los detalles de un recurso específico por su ID
 *     tags: [Ejemplos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del recurso
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Recurso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Saludo'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 format: password
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check service status
 *     description: Checks that the service is running
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Service running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: '2025-06-20T02:39:06.000Z'
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 */

// Documentación de la API
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user authentication
 * 
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 * 
 * @swagger
 * tags:
 *   name: CORS
 *   description: Endpoints for CORS testing
 */

/**
 * @swagger
 * /api/saludo:
 *   get:
 *     summary: Gets a greeting
 *     description: Returns a greeting message to test the API
 *     tags: [CORS]
 *     responses:
 *       200:
 *         description: Greeting obtained correctly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Hello World
 *       500:
 *         description: Server error
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
 *     summary: Verify CORS configuration
 *     description: Endpoint to verify server CORS configuration
 *     tags: [CORS]
 *     parameters:
 *       - in: header
 *         name: Origin
 *         schema:
 *           type: string
 *         description: Origin of the request (e.g. http://your-site.com)
 *         required: true
 *     responses:
 *       200:
 *         description: CORS configured successfully
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
 *                   example: "Origin not allowed"
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get list of users
 *     description: Returns all registered users in the system
 *     tags: [Users]
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
