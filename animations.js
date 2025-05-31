class Animations {
    constructor() {
        this.setupAnimations();
    }

    setupAnimations() {
        // Animación de entrada de títulos
        document.querySelectorAll('.map-section h2').forEach((title, index) => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, index * 300);
        });

        // Animación de tarjetas
        document.querySelectorAll('.lineup-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Animación de hover mejorada
        document.querySelectorAll('.lineup-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCard(card, true);
            });

            card.addEventListener('mouseleave', () => {
                this.animateCard(card, false);
            });
        });
    }

    animateCard(card, isHover) {
        const animation = card.animate([
            { transform: 'scale(1)', opacity: 1 },
            { transform: isHover ? 'scale(1.05)' : 'scale(1)', opacity: isHover ? 0.9 : 1 }
        ], {
            duration: 300,
            easing: 'ease-out'
        });

        animation.onfinish = () => {
            if (!isHover) {
                card.style.transform = 'scale(1)';
                card.style.opacity = '1';
            }
        };
    }
}

// Iniciar las animaciones cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    new Animations();
});
