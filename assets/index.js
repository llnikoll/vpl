/**
 * Script principal para la página web del Partido de la Libertad
 * Incluye:
 * - Inicialización de EmailJS para el manejo de formularios
 * - Eventos de escucha para el formulario de contacto
 * - Funciones de navegación en la página
 * - Toggle para el menú hamburguesa mejorado
 */

document.addEventListener('DOMContentLoaded', function() {
    /**
     * Inicializar EmailJS con la clave pública
     */
    emailjs.init("11w83xZg0PuZCavgl");
    
    /**
     * Manejador de eventos para el formulario de contacto
     */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Mostrar indicador de carga
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Crear objeto de parámetros para el template
            const templateParams = {
                from_name: this.querySelector('[name="from_name"]').value,
                reply_to: this.querySelector('[name="to_name"]').value,
                message: this.querySelector('[name="message"]').value
            };
            
            // Enviar el formulario
            emailjs.send('service_u215hne', 'template_guziqqn', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('¡Mensaje enviado con éxito!');
                    contactForm.reset();
                    
                    // Restaurar botón
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, function(error) {
                    console.error('Error al enviar el mensaje:', error);
                    alert('Error al enviar el mensaje: ' + JSON.stringify(error));
                    
                    // Restaurar botón
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    /**
     * Mejorar la navegación en móviles
     */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Crear overlay para cerrar el menú al hacer clic fuera
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            // Prevenir scroll cuando el menú está abierto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Cerrar menú al hacer clic en el overlay
    overlay.addEventListener('click', function() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Cerrar menú al hacer clic en un botón del menú
    const navButtons = navMenu ? navMenu.querySelectorAll('button') : [];
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Detectar anclaje en la URL al cargar la página
    const hash = window.location.hash; // Obtiene el anclaje (ej. #hero)
    if (hash) {
        const sectionId = hash.substring(1); // Elimina el # (ej. hero)
        scrollToSection(sectionId); // Desplaza a la sección
    }
});

/**
 * Función para desplazarse suavemente a una sección específica
 * @param {string} sectionId - El ID de la sección a la que se desplazará
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Ajustar el offset según el tamaño del header
        const headerHeight = document.querySelector('header').offsetHeight;
        window.scrollTo({
            top: section.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    }
}

/**
 * Función para abrir el documento de estatutos
 */
function openStatutes() {
    alert('El documento de estatutos se abrirá en una nueva ventana.');
    // window.open('ruta/a/estatutos.pdf', '_blank');
}