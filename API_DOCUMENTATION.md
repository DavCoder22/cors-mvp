# Documentación de la API CORS MVP

## Descripción General
Este proyecto es una aplicación de demostración que muestra la implementación de CORS (Cross-Origin Resource Sharing) en una API RESTful construida con Node.js y Express. La aplicación incluye una interfaz web para probar la configuración de CORS y documentación interactiva de la API.

## Características Principales
- Configuración de CORS en el servidor
- Documentación interactiva con Swagger UI
- Interfaz web para probar CORS
- Despliegue automatizado con Terraform en AWS EC2

## Requisitos del Sistema
- Node.js 14.x o superior
- npm 6.x o superior
- Navegador web moderno

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/DavCoder22/cors-mvp.git
   cd cors-mvp
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador:
   - Aplicación: http://localhost:3000
   - Documentación de la API: http://localhost:3000/api-docs

## Documentación de la API

### Endpoints

#### Obtener Saludo
```
GET /api/saludo
```

**Descripción:** Retorna un mensaje de saludo para probar la API.

**Respuesta Exitosa (200 OK):**
```json
{
  "mensaje": "¡Hola CORS! La petición se realizó correctamente con CORS habilitado."
}
```

#### Verificar Configuración CORS
```
OPTIONS /api/verificar-cors
```

**Descripción:** Verifica la configuración CORS del servidor.

**Encabezados de Respuesta (200 OK):**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Configuración de CORS

El servidor está configurado con los siguientes parámetros CORS:

```javascript
app.use(cors({
    origin: '*', // Permite solicitudes desde cualquier origen
    methods: ['GET', 'OPTIONS'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Accept'] // Cabeceras permitidas
}));
```

## Documentación Interactiva

La documentación interactiva de la API está disponible en:

```
http://<host>:<puerto>/api-docs
```

La documentación incluye:
- Descripción detallada de cada endpoint
- Parámetros de solicitud
- Ejemplos de respuestas
- Posibles códigos de estado HTTP

## Despliegue en Producción

### Requisitos
- Cuenta de AWS
- Terraform instalado
- Claves de acceso AWS configuradas

### Pasos para el Despliegue

1. Configurar las credenciales de AWS:
   ```bash
   export AWS_ACCESS_KEY_ID="tu_access_key"
   export AWS_SECRET_ACCESS_KEY="tu_secret_key"
   ```

2. Inicializar Terraform:
   ```bash
   cd terraform
   terraform init
   ```

3. Revisar el plan de despliegue:
   ```bash
   terraform plan
   ```

4. Aplicar los cambios:
   ```bash
   terraform apply
   ```

5. Acceder a la aplicación desplegada:
   ```
   http://<ip-pública-ec2>
   ```

## Solución de Problemas

### La aplicación no inicia
- Verificar que el puerto 3000 esté disponible
- Revisar los logs con `pm2 logs cors-mvp`
- Asegurarse de que todas las dependencias estén instaladas

### Errores de CORS
- Verificar que el cliente esté haciendo la petición al dominio correcto
- Asegurarse de que los encabezados CORS estén configurados correctamente
- Revisar la consola del navegador para mensajes de error detallados

## Contribución

1. Hacer fork del repositorio
2. Crear una rama para la nueva característica (`git checkout -b feature/nueva-caracteristica`)
3. Hacer commit de los cambios (`git commit -am 'Añadir nueva característica'`)
4. Hacer push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crear un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

Documentación generada automáticamente con ❤️
