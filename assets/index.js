/**
 * Script principal para la página web del Partido de la Libertad
 * Incluye:
 * - Inicialización de EmailJS para el manejo de formularios
 * - Eventos de escucha para el formulario de contacto
 * - Funciones de navegación en la página
 * - Toggle para el menú hamburguesa
 */

// Inicializar EmailJS con la clave pública
(function() {
    emailjs.init("11w83xZg0PuZCavgl");
})();

/**
 * Manejador de eventos para el formulario de contacto
 */
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    emailjs.sendForm('service_u215hne', 'template_guziqqn', this)
        .then(function() {
            alert('¡Mensaje enviado con éxito!');
            document.getElementById('contact-form').reset();
        }, function(error) {
            alert('Error al enviar el mensaje: ' + error);
        });
});

/**
 * Función para desplazarse suavemente a una sección específica
 * @param {string} sectionId - El ID de la sección a la que se desplazará
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
    });
}

/**
 * Función para abrir el documento de estatutos
 */
function openStatutes() {
    alert('El documento de estatutos se abrirá en una nueva ventana.');
    // window.open('ruta/a/estatutos.pdf', '_blank');
}

/**
 * Toggle para el menú hamburguesa en móviles
 */
// Mobile menu toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.remove('active');
    });
});