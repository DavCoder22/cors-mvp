// View (Vista)
class View {
    constructor() {
        this.botonSaludar = document.getElementById('saludar');
        this.resultado = document.getElementById('resultado');
        this.error = document.getElementById('error');
    }

    // Vincular el manejador de eventos al botón
    bindSaludar(handler) {
        this.botonSaludar.addEventListener('click', () => {
            this.limpiarError();
            handler();
        });
    }

    // Mostrar el mensaje en la interfaz
    mostrarMensaje(mensaje) {
        this.resultado.textContent = mensaje;
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
        this.inicializar();
    }

    inicializar() {
        this.vista.bindSaludar(this.saludar.bind(this));
    }

    async saludar() {
        try {
            // Hacemos una petición a nuestro propio servidor para probar CORS
            const respuesta = await fetch('http://localhost:3000/api/saludo', {
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
    const vista = new View();
    new Presenter(vista);
});
