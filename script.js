// Menu toggle functionality
const menuBtn = document.getElementById('menuBtn');
const header = document.getElementById('header');

menuBtn.addEventListener('click', () => {
    header.classList.toggle('menu-open');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        header.classList.remove('menu-open');
        menuBtn.querySelector('i').classList.add('fa-bars');
        menuBtn.querySelector('i').classList.remove('fa-times');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active navigation links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// Typing effect
const titles = [
    "Desarrollador Web"
    
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const erasingSpeed = 50;
const newTextDelay = 2000;

const typeElement = document.querySelector('.hero-title span');

function type() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typeElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(type, newTextDelay);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
    }
}

setTimeout(type, newTextDelay);

// Reveal animations on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.section-title, .about-text p, .skill-card, .project-card, .contact-form').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Add fade-in effect to sections
document.addEventListener('DOMContentLoaded', () => {
    // Añadir la clase 'loaded' al body inmediatamente
    document.body.classList.add('loaded');
});


// Añade este código al final de tu archivo script.js para mejorar la experiencia móvil

// Detectar si estamos en un dispositivo móvil
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Optimizaciones específicas para móviles
if (isMobile) {
    // Reducir el número de partículas para mejorar el rendimiento
    document.addEventListener('DOMContentLoaded', () => {
        // Esta función se ejecutará cuando se cargue la página
        adjustForMobile();
    });
}

function adjustForMobile() {
    // 1. Optimizar las animaciones de scroll para móviles
    const mobileObserverOptions = {
        threshold: 0.15, // Umbral ligeramente más alto para móviles
        rootMargin: '0px 0px -10% 0px' // Ajustar el margen para pantallas pequeñas
    };
    
    // Crear un nuevo observer optimizado para móviles
    const mobileObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                
                // Desconectar el observer después de revelar para ahorrar recursos
                mobileObserver.unobserve(entry.target);
            }
        });
    }, mobileObserverOptions);
    
    // Aplicar el nuevo observer a los elementos relevantes
    document.querySelectorAll('.reveal').forEach(el => {
        mobileObserver.observe(el);
    });
    
    // 2. Hacer que el menú móvil se cierre al hacer clic en cualquier parte
    document.addEventListener('click', (e) => {
        const header = document.getElementById('header');
        const menuBtn = document.getElementById('menuBtn');
        
        // Si el menú está abierto y se hace clic fuera del menú y del botón
        if (header.classList.contains('menu-open') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('#menuBtn')) {
            header.classList.remove('menu-open');
            if (menuBtn.querySelector('i').classList.contains('fa-times')) {
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            }
        }
    });
    
    // 3. Optimizar el efecto de escritura para dispositivos móviles
    const typeElement = document.querySelector('.hero-title span');
    if (typeElement) {
        // Hacerlo un poco más rápido en móviles
        window.typingSpeed = 80; // más rápido
        window.erasingSpeed = 40; // más rápido
        window.newTextDelay = 1500; // menos espera
    }
    
    // 4. Función para optimizar las partículas - reducir cantidad en móviles
    if (window.createParticles) {
        // Guardar la función original
        const originalCreateParticles = window.createParticles;
        
        // Reemplazar con versión optimizada
        window.createParticles = function() {
            const particlesContainer = document.getElementById('particles');
            // Si no hay contenedor, salir
            if (!particlesContainer) return;
            
            // Limpiar cualquier partícula existente
            particlesContainer.innerHTML = '';
            
            // Reducir el número para móviles
            const numberOfParticles = isMobile ? 20 : 50;
            
            // Crear partículas con la función original pero menos cantidad
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 4 + 1; // Ligeramente más pequeñas
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Posición aleatoria
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                
                // Estilo
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.opacity = Math.random() * 0.4 + 0.1; // Menos opaco
                
                // Añadir al DOM
                particlesContainer.appendChild(particle);
                
                // Animación optimizada para móviles
                animateParticleMobile(particle);
            }
        };
        
        // Crear función de animación optimizada
        function animateParticleMobile(particle) {
            // Movimiento más lento y menos intenso
            const speed = Math.random() * 15 + 5; // Más lento
            const direction = Math.random() * 360;
            const radians = direction * Math.PI / 180;
            
            const moveX = Math.cos(radians) * speed;
            const moveY = Math.sin(radians) * speed;
            
            // Posición inicial
            let posX = parseFloat(particle.style.left);
            let posY = parseFloat(particle.style.top);
            
            function move() {
                // Mover más lentamente en móviles
                posX += moveX * 0.007;
                posY += moveY * 0.007;
                
                // Rebotar en los bordes
                if (posX < 0 || posX > 100) {
                    posX = Math.max(0, Math.min(100, posX));
                }
                if (posY < 0 || posY > 100) {
                    posY = Math.max(0, Math.min(100, posY));
                }
                
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                
                // Usar requestAnimationFrame con menos frecuencia
                setTimeout(() => requestAnimationFrame(move), 30);
            }
            
            move();
        }
        
        // Llamar a la función redefinida
        window.createParticles();
    }
    
    // 5. Mejorar la experiencia táctil
    // Agregar efecto de toque a los botones y enlaces
    const touchElements = document.querySelectorAll('.btn, .nav-links a, .social-icon, .project-card');
    touchElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        el.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
}

// Optimizar los eventos de scroll para mejor rendimiento en móviles
function throttle(fn, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return fn(...args);
    };
}

// Aplicar throttling a los eventos de scroll
const originalScrollHandler = window.onscroll;
window.onscroll = throttle(function() {
    // Header scroll effect
    if (window.scrollY > 100) {
        document.getElementById('header').classList.add('scrolled');
    } else {
        document.getElementById('header').classList.remove('scrolled');
    }
    
    // Active navigation links
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 100); // Throttle a 100ms


document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".contact-form");
    const successMessage = document.querySelector(".form-success-message");
    
    if (form) {
        form.addEventListener("submit", function(e) {
            const submitBtn = form.querySelector(".submit-btn");
            
            // Cambiar el texto del botón durante el envío
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
            }
            
            // Si el formulario se envía sin el manejo de Netlify (en desarrollo local)
            if (!window.location.href.includes("netlify") && !e.defaultPrevented) {
                e.preventDefault();
                
                // Simular un envío exitoso después de 1.5 segundos
                setTimeout(function() {
                    // Ocultar los campos del formulario
                    Array.from(form.querySelectorAll(".form-group, .submit-btn")).forEach(
                        el => el.style.display = "none"
                    );
                    
                    // Mostrar el mensaje de éxito
                    if (successMessage) {
                        successMessage.style.display = "block";
                    } else {
                        // Si no existe el elemento de éxito, crearlo
                        const newSuccessMessage = document.createElement('div');
                        newSuccessMessage.className = 'form-success-message';
                        newSuccessMessage.innerHTML = `
                            <div class="success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3>¡Mensaje Enviado!</h3>
                            <p>Gracias por contactarme. Te responderé lo antes posible.</p>
                        `;
                        form.appendChild(newSuccessMessage);
                    }
                    
                    // Limpiar el formulario
                    form.reset();
                }, 1500);
            } else if (window.location.href.includes("netlify")) {
                // En Netlify, la página se recargará automáticamente después del envío
                // En este caso podemos dejar que Netlify maneje el formulario
                // Pero podemos agregar un parámetro para detectar el envío exitoso
                localStorage.setItem('formSubmitted', 'true');
            }
        });
        
        // Verificar si venimos de un envío exitoso (para Netlify)
        window.addEventListener('load', function() {
            if (localStorage.getItem('formSubmitted') === 'true' && 
                window.location.href.includes("?submit=success")) {
                // Limpiar el estado
                localStorage.removeItem('formSubmitted');
                
                // Mostrar un mensaje de éxito
                const formContainer = document.querySelector('.contact-content');
                if (formContainer) {
                    formContainer.innerHTML = `
                        <div class="form-success-message" style="display:block; width:100%;">
                            <div class="success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3>¡Mensaje Enviado!</h3>
                            <p>Gracias por contactarme. Te responderé lo antes posible.</p>
                            <button onclick="window.location.href='${window.location.pathname}'" 
                                    class="btn" style="margin-top:20px;">
                                Volver
                            </button>
                        </div>
                    `;
                }
            }
        });
    }
});