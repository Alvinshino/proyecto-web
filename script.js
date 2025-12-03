// Variables globales
let clickCount = 0;
let lastClickElement = "Ninguno aún";
const counters = [0, 0, 0, 0];
let isDarkTheme = false;

// Función para inicializar todos los eventos
function initEvents() {
    // Evento para el botón principal
    document.getElementById('mainButton').addEventListener('click', function() {
        clickCount++;
        updateClickCounter();
        lastClickElement = "Botón Principal (Ver Demo)";
        updateLastClickInfo();
        showAlert('¡Demo activado!', 'Has iniciado la demostración de la landing page. Explora todas las funcionalidades.', 'success');
    });
    
    // Evento para el botón "Más Información"
    document.getElementById('learnMore').addEventListener('click', function() {
        clickCount++;
        updateClickCounter();
        lastClickElement = "Botón 'Más Información'";
        updateLastClickInfo();
        
        // Mostrar información adicional
        const moreInfo = document.createElement('div');
        moreInfo.className = 'alert alert-info mt-3';
        moreInfo.innerHTML = `
            <h5>Información sobre esta práctica</h5>
            <p>Esta landing page incluye:</p>
            <ul>
                <li>Eventos click en múltiples elementos</li>
                <li>Contadores interactivos</li>
                <li>Formulario con validación</li>
                <li>Galería con modal</li>
                <li>Cambio de tema claro/oscuro</li>
            </ul>
            <p>Para la Práctica 5.1 de Despliegues de Páginas.</p>
        `;
        
        // Insertar después del botón
        this.parentNode.appendChild(moreInfo);
    });
    
    // Eventos para las tarjetas clickables
    document.querySelectorAll('.clickable-card').forEach(card => {
        card.addEventListener('click', function() {
            clickCount++;
            updateClickCounter();
            const cardTitle = this.querySelector('.card-title').textContent;
            lastClickElement = `Tarjeta: ${cardTitle}`;
            updateLastClickInfo();
            
            // Efecto visual de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Mostrar mensaje específico para cada tarjeta
            const messages = {
                'card1': 'HTML5 y CSS3 son las bases del desarrollo web moderno.',
                'card2': 'JavaScript añade interactividad y dinamismo a las páginas web.',
                'card3': 'Bootstrap facilita el desarrollo responsive y profesional.'
            };
            
            const cardId = this.id;
            if (messages[cardId]) {
                showAlert('¡Tarjeta seleccionada!', messages[cardId], 'info');
            }
        });
    });
    
    // Eventos para los contadores
    document.getElementById('incrementCounter1').addEventListener('click', function() {
        counters[0]++;
        document.getElementById('counter1').textContent = counters[0];
        updateCounter4();
        updateClickInfo('Contador 1 (Proyectos)');
    });
    
    document.getElementById('incrementCounter2').addEventListener('click', function() {
        counters[1] += 10; // Incrementa de 10 en 10 para horas
        document.getElementById('counter2').textContent = counters[1];
        updateCounter4();
        updateClickInfo('Contador 2 (Horas)');
    });
    
    document.getElementById('incrementCounter3').addEventListener('click', function() {
        counters[2]++;
        document.getElementById('counter3').textContent = counters[2];
        updateCounter4();
        updateClickInfo('Contador 3 (Clientes)');
    });
    
    // Botón para reiniciar todos los contadores
    document.getElementById('resetAll').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres reiniciar todos los contadores?')) {
            for (let i = 0; i < 3; i++) {
                counters[i] = 0;
                document.getElementById(`counter${i+1}`).textContent = '0';
            }
            updateCounter4();
            updateClickInfo('Botón Reiniciar');
            showAlert('Contadores reiniciados', 'Todos los contadores han sido restablecidos a cero.', 'warning');
        }
    });
    
    // Eventos para las imágenes de la galería
    document.querySelectorAll('.clickable-image').forEach(img => {
        img.addEventListener('click', function() {
            clickCount++;
            updateClickCounter();
            const index = this.getAttribute('data-index');
            lastClickElement = `Imagen ${index} de la galería`;
            updateLastClickInfo();
            
            // Configurar modal
            const modalTitle = document.getElementById('modalTitle');
            const modalImage = document.getElementById('modalImage');
            const modalDescription = document.getElementById('modalDescription');
            
            const descriptions = {
                '1': 'Ejemplo de código HTML y CSS bien estructurado y comentado.',
                '2': 'Git es un sistema de control de versiones distribuido, esencial para el desarrollo colaborativo.',
                '3': 'GitHub Pages permite alojar páginas web estáticas directamente desde un repositorio de GitHub.'
            };
            
            modalImage.src = this.src;
            modalTitle.textContent = this.alt;
            modalDescription.textContent = descriptions[index] || 'Imagen de la galería.';
            
            // Mostrar modal
            const modal = new bootstrap.Modal(document.getElementById('imageModal'));
            modal.show();
        });
    });
    
    // Evento para el formulario de contacto
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación simple
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Remover clases de invalid previas
        document.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-invalid');
        });
        
        let isValid = true;
        
        if (!name.trim()) {
            document.getElementById('name').classList.add('is-invalid');
            isValid = false;
        }
        
        if (!email.trim() || !email.includes('@')) {
            document.getElementById('email').classList.add('is-invalid');
            isValid = false;
        }
        
        if (!message.trim()) {
            document.getElementById('message').classList.add('is-invalid');
            isValid = false;
        }
        
        if (isValid) {
            clickCount++;
            updateClickCounter();
            lastClickElement = 'Formulario de Contacto';
            updateLastClickInfo();
            
            // Simular envío exitoso
            document.getElementById('formMessage').innerHTML = `
                <div class="alert alert-success">
                    <i class="fas fa-check-circle me-2"></i>
                    ¡Mensaje enviado con éxito! Te contactaremos pronto.
                </div>
            `;
            
            // Resetear formulario
            this.reset();
            
            // Mostrar notificación
            showAlert('Formulario enviado', 'Tu mensaje ha sido enviado correctamente. Gracias por contactarnos.', 'success');
        } else {
            document.getElementById('formMessage').innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Por favor, completa todos los campos correctamente.
                </div>
            `;
        }
    });
    
    // Evento para cambiar tema
    document.getElementById('themeToggle').addEventListener('click', function() {
        clickCount++;
        updateClickCounter();
        lastClickElement = 'Botón de Tema';
        updateLastClickInfo();
        
        isDarkTheme = !isDarkTheme;
        
        if (isDarkTheme) {
            document.body.style.backgroundColor = '#121212';
            document.body.style.color = '#f8f9fa';
            document.querySelectorAll('.bg-light').forEach(el => {
                el.style.backgroundColor = '#2d2d2d !important';
                el.style.color = '#f8f9fa';
            });
            document.querySelector('footer').style.backgroundColor = '#1a1a1a';
            this.innerHTML = '<i class="fas fa-sun"></i> Tema Claro';
            showAlert('Tema oscuro activado', 'Has cambiado a modo oscuro.', 'dark');
        } else {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
            document.querySelectorAll('.bg-light').forEach(el => {
                el.style.backgroundColor = '';
                el.style.color = '';
            });
            document.querySelector('footer').style.backgroundColor = '#2e3a59';
            this.innerHTML = '<i class="fas fa-moon"></i> Tema Oscuro';
            showAlert('Tema claro activado', 'Has cambiado a modo claro.', 'info');
        }
    });
    
    // Evento para el botón de información del proyecto
    document.getElementById('showAlert').addEventListener('click', function() {
        clickCount++;
        updateClickCounter();
        lastClickElement = 'Info del Proyecto (Footer)';
        updateLastClickInfo();
        
        showAlert('Información del Proyecto', 
            'Práctica 5.1: Despliegues de Páginas<br><br>' +
            '• Landing Page con Bootstrap<br>' +
            '• Eventos click en JavaScript<br>' +
            '• Desplegado en GitHub Pages<br>' +
            '• Control de versiones con Git<br><br>' +
            'Para la materia de Desarrollo Web.', 
            'info');
    });
    
    // Evento para el badge de dev
    document.getElementById('devBadge').addEventListener('click', function() {
        clickCount++;
        updateClickCounter();
        lastClickElement = 'Badge DEV';
        updateLastClickInfo();
        
        // Alternar visibilidad del badge
        this.style.opacity = this.style.opacity === '0.3' ? '1' : '0.3';
        showAlert('Rama DEV', 'Este indicador muestra que estás en la rama de desarrollo. En producción, este badge no estaría visible.', 'warning');
    });
}

// Función para actualizar el contador de clicks
function updateClickCounter() {
    const clickCounterElement = document.querySelector('#clickCounter span');
    if (clickCounterElement) {
        clickCounterElement.textContent = clickCount;
    }
    updateCounter4();
}

// Función para actualizar el contador 4 (eventos click)
function updateCounter4() {
    counters[3] = clickCount;
    const counter4Element = document.getElementById('counter4');
    if (counter4Element) {
        counter4Element.textContent = clickCount;
    }
}

// Función para actualizar la información del último click
function updateLastClickInfo() {
    const lastClickElementInfo = document.getElementById('lastClickInfo');
    if (lastClickElementInfo) {
        lastClickElementInfo.textContent = `Último evento click: ${lastClickElement}`;
    }
}

// Función auxiliar para actualizar información de click
function updateClickInfo(element) {
    clickCount++;
    updateClickCounter();
    lastClickElement = element;
    updateLastClickInfo();
}

// Función para mostrar alertas
function showAlert(title, message, type) {
    // Crear elemento de alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.maxWidth = '350px';
    alertDiv.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    
    alertDiv.innerHTML = `
        <strong>${title}</strong>
        <div class="small">${message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Agregar al documento
    document.body.appendChild(alertDiv);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Inicialización cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    initEvents();
    
    // Inicializar contador 4 (eventos click)
    updateCounter4();
    
    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        showAlert('¡Bienvenido!', 'Esta landing page tiene eventos click en múltiples elementos. ¡Pruébalos todos!', 'success');
    }, 1000);
});