# CORS MVP Demo

Este proyecto es una aplicación de demostración que muestra el funcionamiento de CORS (Cross-Origin Resource Sharing) en aplicaciones web. La aplicación incluye tanto un cliente como un servidor para probar diferentes escenarios de solicitudes entre orígenes.

## 🚀 Características

- Interfaz de usuario intuitiva para probar solicitudes CORS
- Servidor configurado con políticas CORS personalizables
- Documentación detallada de la API
- Despliegue en la nube con Terraform (opcional)
- Documentación Swagger para la API

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- Navegador web moderno
- (Opcional) Terraform para despliegue en la nube

## 🛠️ Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd cors-mvp
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor:
   ```bash
   npm start
   ```
   O para desarrollo con recarga automática:
   ```bash
   npm run dev
   ```

4. Abre tu navegador y navega a:
   ```
   http://localhost:3000
   ```

## 🏗️ Estructura del Proyecto

```
cors-mvp/
├── app.js           # Lógica del cliente (MVP)
├── server.js        # Configuración del servidor
├── swagger.js       # Documentación de la API con Swagger
├── index.html       # Interfaz de usuario
├── style.css        # Estilos CSS
├── terraform/       # Configuración de infraestructura
│   ├── main.tf
│   ├── outputs.tf
│   └── variables.tf
└── package.json     # Dependencias y scripts
```

## 🌐 Uso

1. **Prueba Local**:
   - Haz clic en "Probar Llamada Local" para probar una llamada al mismo origen.

2. **Prueba Remota**:
   - Haz clic en "Probar Llamada Remota" para probar una llamada entre orígenes.
   - Observa cómo responde el servidor con los encabezados CORS apropiados.

3. **Documentación de la API**:
   - Accede a la documentación interactiva de la API en:
     ```
     http://localhost:3000/api-docs
     ```

## 🔧 Configuración CORS

El servidor está configurado con las siguientes opciones CORS:

```javascript
app.use(cors({
  origin: '*', // Permite todos los orígenes (ajustar en producción)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## 🚀 Despliegue con Terraform

Para desplegar la aplicación en la nube:

1. Navega al directorio de Terraform:
   ```bash
   cd terraform
   ```

2. Inicializa Terraform:
   ```bash
   terraform init
   ```

3. Revisa los cambios planeados:
   ```bash
   terraform plan
   ```

4. Aplica los cambios:
   ```bash
   terraform apply
   ```

## 📚 Documentación Adicional

- [Documentación de Express](https://expressjs.com/)
- [Documentación de CORS](https://github.com/expressjs/cors)
- [Especificación CORS](https://developer.mozilla.org/es/docs/Web/HTTP/CORS)
- [Documentación de Swagger](https://swagger.io/docs/)

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, lee nuestras pautas de contribución antes de enviar cambios.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

## ✉️ Contacto

Si tienes preguntas o comentarios, no dudes en abrir un issue en el repositorio.

---

Desarrollado con ❤️ por [Tu Nombre] | [2025]
