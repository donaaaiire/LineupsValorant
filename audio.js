class SoundEffects {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.filter = this.audioContext.createBiquadFilter();
        
        // Configurar el volumen inicial muy bajo
        this.gainNode.gain.value = 0.1;
        
        // Configurar el filtro para sonido más agudo
        this.filter.type = 'highpass';
        this.filter.frequency.value = 1000;
        
        // Conectar el filtro y el gain
        this.filter.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
        
        // Agregar eventos a las tarjetas
        this.setupCardEvents();
    }

    createOscillator(type, frequency) {
        const oscillator = this.audioContext.createOscillator();
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        oscillator.connect(this.filter);
        return oscillator;
    }

    playHoverSound() {
        // Sonido más agudo al hacer hover
        const oscillator = this.createOscillator('triangle', 660);
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }

    playClickSound() {
        // Crear un sonido más agradable con múltiples osciladores
        const baseOsc = this.createOscillator('sine', 440); // Nota A4
        const harmonyOsc = this.createOscillator('sine', 554.37); // Nota C5 (armonía)
        const shimmerOsc = this.createOscillator('sine', 660); // Nota E5 (brillo)

        // Añadir un filtro para suavizar el sonido
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1200;
        filter.Q.value = 5;
        
        // Conectar los osciladores al filtro
        baseOsc.connect(filter);
        harmonyOsc.connect(filter);
        shimmerOsc.connect(filter);
        
        // Conectar el filtro al gain
        filter.connect(this.gainNode);
        
        // Aumentar el volumen de manera suave y agradable
        this.gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.1, this.audioContext.currentTime + 0.1);
        this.gainNode.gain.exponentialRampToValueAtTime(0.05, this.audioContext.currentTime + 0.8);
        
        // Añadir un ligero vibrato
        const vibratoOsc = this.audioContext.createOscillator();
        vibratoOsc.type = 'sine';
        vibratoOsc.frequency.value = 5; // Vibrato lento
        vibratoOsc.connect(baseOsc.frequency);
        vibratoOsc.connect(harmonyOsc.frequency);
        vibratoOsc.connect(shimmerOsc.frequency);
        
        // Ajustar el vibrato
        vibratoOsc.start();
        vibratoOsc.stop(this.audioContext.currentTime + 3.0); // Vibrato durante 3 segundos
        
        // Iniciar los osciladores
        baseOsc.start();
        harmonyOsc.start();
        shimmerOsc.start();
        
        // Añadir efecto de fade-out gradual
        const fadeOutTime = this.audioContext.currentTime + 1;
        this.gainNode.gain.exponentialRampToValueAtTime(0.01, fadeOutTime);
        
        // Detener después del fade-out
        baseOsc.stop(fadeOutTime);
        harmonyOsc.stop(fadeOutTime);
        shimmerOsc.stop(fadeOutTime);
    }

    setupCardEvents() {
        document.querySelectorAll('.lineup-card').forEach(card => {
            card.addEventListener('click', () => {
                this.playClickSound();
            });
        });
    };
};

// Iniciar los efectos de sonido cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    new SoundEffects();
});
