# Documentación Técnica - Aplicación MVP CORS

## Índice
1. [Introducción](#introducción)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Configuración del Servidor](#configuración-del-servidor)
5. [Cliente MVP](#cliente-mvp)
6. [Endpoints de la API](#endpoints-de-la-api)
7. [Configuración CORS](#configuración-cors)
8. [Documentación con Swagger](#documentación-con-swagger)
9. [Despliegue con Terraform](#despliegue-con-terraform)
10. [Flujo de la Aplicación](#flujo-de-la-aplicación)
11. [Manejo de Errores](#manejo-de-errores)
12. [Mejoras Futuras](#mejoras-futuras)

## Introducción

Esta aplicación es una demostración práctica de una aplicación web que implementa el patrón Modelo-Vista-Presentador (MVP) y muestra el funcionamiento de CORS (Cross-Origin Resource Sharing). El objetivo principal es proporcionar una interfaz intuitiva para probar y entender cómo funcionan las políticas de seguridad de origen cruzado en aplicaciones web modernas.

## Arquitectura del Sistema

La aplicación sigue una arquitectura cliente-servidor con las siguientes características:

- **Frontend**: Aplicación web estática (HTML, CSS, JavaScript) que implementa el patrón MVP.
- **Backend**: Servidor Node.js con Express que proporciona una API RESTful.
- **Comunicación**: Las peticiones HTTP/HTTPS entre el cliente y el servidor utilizan CORS para permitir el acceso entre dominios.
- **Documentación**: Integración con Swagger/OpenAPI para documentación interactiva de la API.
- **Infraestructura**: Configuración de despliegue con Terraform para entornos en la nube.

## Estructura del Proyecto

```
cors-mvp/
├── app.js           # Lógica del cliente (MVP)
├── server.js        # Configuración del servidor
├── swagger.js       # Configuración de Swagger para documentación
├── index.html       # Interfaz de usuario principal
├── style.css        # Estilos CSS
├── terraform/       # Configuración de infraestructura
│   ├── main.tf      # Configuración principal de Terraform
│   ├── outputs.tf   # Salidas de la infraestructura
│   └── variables.tf # Variables de Terraform
└── package.json     # Dependencias y scripts
```

## Configuración del Servidor

El servidor está construido con Node.js y Express, con las siguientes características principales:

- **Middleware CORS**: Configuración personalizada para permitir solicitudes de diferentes orígenes.
- **Rutas API**: Endpoints para probar la funcionalidad CORS.
- **Documentación**: Integración con Swagger para documentación interactiva.
- **Archivos Estáticos**: Servicio de archivos estáticos para la interfaz de usuario.

### Dependencias principales:
- `express`: Framework web para Node.js
- `cors`: Middleware para habilitar CORS
- `swagger-jsdoc` y `swagger-ui-express`: Para documentación de la API

## Cliente MVP

La aplicación cliente implementa el patrón Modelo-Vista-Presentador (MVP):

### 1. Vista (`View`)
- Gestiona la interfaz de usuario
- Maneja eventos del usuario
- Muestra retroalimentación visual

### 2. Presentador (`Presenter`)
- Coordina entre la vista y el modelo
- Maneja la lógica de negocio
- Gestiona las llamadas a la API

### Características del Cliente:
- Interfaz intuitiva con botones para probar diferentes escenarios
- Retroalimentación visual del estado de CORS
- Manejo de errores amigable
- Tooltips informativos

## Endpoints de la API

### 1. GET /api/saludo
- **Descripción**: Retorna un mensaje de saludo para probar la API.
- **Método**: GET
- **Respuesta exitosa (200)**:
  ```json
  {
    "mensaje": "¡Hola CORS! La petición se realizó correctamente con CORS habilitado."
  }
  ```

### 2. OPTIONS /api/verificar-cors
- **Descripción**: Verifica la configuración CORS del servidor.
- **Método**: OPTIONS
- **Headers de respuesta**:
  - `Access-Control-Allow-Origin: *`
  - `Access-Control-Allow-Methods: GET, POST, OPTIONS`
  - `Access-Control-Allow-Headers: Content-Type, Authorization`

## Configuración CORS

El servidor está configurado con las siguientes políticas CORS:

```javascript
app.use(cors({
    origin: '*', // En producción, reemplazar con dominio específico
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept']
}));
```

### Comportamiento CORS:
- Permite solicitudes desde cualquier origen (`*`)
- Métodos HTTP permitidos: GET y OPTIONS
- Headers permitidos: Content-Type y Accept
- Credenciales: No incluidas por defecto (seguridad)

## Documentación con Swagger

La API incluye documentación interactiva generada con Swagger/OpenAPI:

- **URL de Documentación**: `/api-docs`
- **Especificación OpenAPI**: `/api-docs.json`

### Características:
- Documentación interactiva de todos los endpoints
- Pruebas en tiempo real
- Esquemas de solicitud/respuesta
- Códigos de estado HTTP

## Despliegue con Terraform

La infraestructura como código está definida en el directorio `terraform/`:

### Archivos principales:
- `main.tf`: Configuración principal de recursos
- `variables.tf`: Variables de configuración
- `outputs.tf`: Salidas de la infraestructura

### Requisitos:
- Terraform instalado
- Credenciales de proveedor de nube configuradas

### Comandos básicos:
```bash
# Inicializar Terraform
terraform init

# Ver cambios planeados
terraform plan

# Aplicar cambios
terraform apply

# Destruir recursos
terraform destroy
```

## Flujo de la Aplicación

1. **Inicio**:
   - El navegador carga `index.html`
   - Se inicializa la aplicación cliente
   - Se realiza una prueba automática de la API local

2. **Prueba Local**:
   - El usuario hace clic en "Probar API Local"
   - La aplicación realiza una petición GET a `/api/saludo`
   - Muestra la respuesta en la interfaz

3. **Prueba Remota**:
   - El usuario hace clic en "Probar API Remota"
   - La aplicación verifica la configuración CORS con una petición OPTIONS
   - Muestra el estado de CORS en la interfaz

## Manejo de Errores

La aplicación incluye manejo de errores tanto en el cliente como en el servidor:

### Cliente:
- Errores de red
- Errores de CORS
- Errores de validación
- Errores inesperados

### Servidor:
- Middleware de registro para depuración
- Manejo de rutas no encontradas
- Manejo de errores global

## Mejoras Futuras

1. **Seguridad**:
   - Implementar autenticación/autorización
   - Limitar orígenes permitidos en CORS
   - Rate limiting

2. **Características**:
   - Panel de administración
   - Más ejemplos de uso de CORS
   - Pruebas automatizadas

3. **Infraestructura**:
   - CI/CD pipeline
   - Monitoreo y alertas
   - Escalado automático

4. **Documentación**:
   - Guías detalladas
   - Ejemplos de integración
   - Vídeos tutoriales
