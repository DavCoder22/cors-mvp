// Opciones de configuración de Swagger/OpenAPI
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CORS MVP API',
      version: '1.0.0',
      description: 'API para demostración de configuración CORS. Este MVP incluye:\n' +
        '\n- Frontend interactivo para probar CORS' +
        '\n- Backend con Node.js/Express' +
        '\n- Documentación con Swagger/OpenAPI' +
        '\n- Despliegue en AWS con Terraform',
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
 *     summary: Iniciar sesión
 *     description: Autentica un usuario y devuelve un token JWT
 *     tags: [Autenticación]
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
 *                 example: usuario@ejemplo.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: contraseña123
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Credenciales inválidas
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Verificar estado del servicio
 *     description: Verifica que el servicio esté en funcionamiento
 *     tags: [Sistema]
 *     responses:
 *       200:
 *         description: Servicio en funcionamiento
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
