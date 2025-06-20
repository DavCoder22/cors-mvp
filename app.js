// View (Vista)
class View {
    constructor() {
        this.botonSaludar = document.getElementById('saludar');
        this.botonProbarRemoto = document.getElementById('probarRemoto');
        this.resultado = document.getElementById('resultado');
        this.corsStatus = document.getElementById('corsStatus');
        this.error = document.getElementById('error');
    }

    // Vincular manejadores de eventos
    bindEventHandlers(onLocalTest, onRemoteTest) {
        this.botonSaludar.addEventListener('click', () => {
            this.limpiarError();
            this.mostrarCargando('local');
            onLocalTest();
        });

        this.botonProbarRemoto.addEventListener('click', () => {
            this.limpiarError();
            this.mostrarCargando('remote');
            onRemoteTest();
        });
    }

    // Mostrar el mensaje en la interfaz
    mostrarMensaje(mensaje, type = 'local') {
        if (type === 'local') {
            this.resultado.textContent = JSON.stringify(mensaje, null, 2);
        }
    }

    // Actualizar el estado de CORS
    actualizarEstadoCORS(exitoso, mensaje) {
        this.corsStatus.textContent = mensaje;
        this.corsStatus.className = 'cors-status ' + (exitoso ? 'verificado' : 'error');
    }

    // Mostrar estado de carga
    mostrarCargando(type) {
        if (type === 'local') {
            this.resultado.textContent = 'Probando API local...';
        } else {
            this.corsStatus.textContent = 'Probando CORS...';
            this.corsStatus.className = 'cors-status';
        }
    }

    // Mostrar un error
    mostrarError(mensajeError) {
        this.error.textContent = mensajeError;
        this.error.style.display = 'block';
    }

    // Limpiar mensajes de error
    limpiarError() {
        this.error.textContent = '';
        this.error.style.display = 'none';
    }
}

// Presenter (Presentador)
class Presenter {
    constructor(vista) {
        this.vista = vista;
        this.API_URL = 'http://3.91.1.153:3000';
        this.inicializar();
    }

    inicializar() {
        this.vista.bindEventHandlers(
            this.probarLocal.bind(this),
            this.probarRemoto.bind(this)
        );
    }

    async probarLocal() {
        try {
            const respuesta = await fetch(`${this.API_URL}/api/saludo`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!respuesta.ok) {
                throw new Error('Error en la petición');
            }

            const datos = await respuesta.json();
            this.vista.mostrarMensaje(datos.mensaje);
            
        } catch (error) {
            // Si hay un error de CORS, mostramos un mensaje específico
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                this.vista.mostrarMensaje('Hola Mundo (sin CORS)');
                this.vista.mostrarError('No se pudo conectar con el servidor. Verifica que el servidor esté en ejecución y tenga CORS habilitado.');
            } else {
                this.vista.mostrarError('Error: ' + error.message);
            }
        }
    }
}

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    try {
        const vista = new View();
        const presenter = new Presenter(vista);
        
        // Probar automáticamente la conexión local al cargar
        vista.mostrarCargando('local');
        presenter.probarLocal();
        
        // Configurar tooltips para los botones
        const tooltips = {
            saludar: 'Prueba la API local directamente',
            probarRemoto: 'Verifica la configuración CORS de la API'
        };
        
        // Añadir tooltips a los botones
        Object.entries(tooltips).forEach(([id, text]) => {
            const element = document.getElementById(id);
            if (element) {
                element.title = text;
                element.setAttribute('aria-label', text);
                element.classList.add('tooltip');
            }
        });
        
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        document.body.innerHTML = `
            <div style="color: #721c24; background-color: #f8d7da; 
                        border: 1px solid #f5c6cb; padding: 20px; margin: 20px; 
                        border-radius: 5px; max-width: 600px; margin: 20px auto;">
                <h2 style="margin-top: 0;">Error al cargar la aplicación</h2>
                <p><strong>Error:</strong> ${error.message}</p>
                <p>Por favor, revisa la consola del navegador (F12 > Consola) para más detalles.</p>
                <button onclick="window.location.reload()" 
                        style="padding: 8px 16px; background: #dc3545; color: white; 
                               border: none; border-radius: 4px; cursor: pointer;">
                    Recargar página
                </button>
            </div>`;
    }
});

// Agregar información de depuración
console.log('Aplicación CORS MVP inicializada');
console.log('Modo:', process.env.NODE_ENV || 'development');
console.log('Tiempo de compilación:', new Date().toLocaleString());

// Manejar errores no capturados
window.addEventListener('error', (event) => {
    console.error('Error no capturado:', event.error);
    
    const errorContainer = document.createElement('div');
    errorContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #f8d7da;
        color: #721c24;
        padding: 15px;
        border-radius: 5px;
        max-width: 300px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
    `;
    errorContainer.innerHTML = `
        <strong>Error en la aplicación</strong>
        <p>${event.message}</p>
        <small>Revisa la consola para más detalles</small>
    `;
    document.body.appendChild(errorContainer);
    
    // Eliminar el mensaje después de 10 segundos
    setTimeout(() => {
        errorContainer.style.opacity = '0';
        setTimeout(() => errorContainer.remove(), 300);
    }, 10000);
});
