/**
 * Script principal para la página web del Partido de la Libertad
 * Incluye:
 * - Inicialización de EmailJS para el manejo de formularios
 * - Eventos de escucha para el formulario de contacto
 * - Funciones de navegación en la página
 * - Toggle para el menú hamburguesa mejorado
 */

// Inicializar EmailJS con la clave pública
(function() {
    emailjs.init("11w83xZg0PuZCavgl");
})();

document.addEventListener('DOMContentLoaded', function() {
    /**
     * Manejador de eventos para el formulario de contacto
     */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            emailjs.sendForm('service_u215hne', 'template_guziqqn', this)
                .then(function() {
                    alert('¡Mensaje enviado con éxito!');
                    contactForm.reset();
                }, function(error) {
                    alert('Error al enviar el mensaje: ' + error);
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