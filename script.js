let player;

function onYouTubeIframeAPIReady() {
    // Aquí se inicializa el reproductor cuando la API esté lista
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close');
    const videoPlayer = document.getElementById('videoPlayer');

    // Función para abrir el modal
    function openModal(videoUrl) {
        modal.style.display = 'block';
        
        // Extraer el ID del video de la URL
        let videoId = '';
        if (videoUrl.includes('shorts/')) {
            videoId = videoUrl.split('/').pop();
        } else if (videoUrl.includes('watch?v=')) {
            videoId = videoUrl.split('v=')[1];
            videoId = videoId.split('&')[0];
        }
        
        // Crear el iframe con el formato correcto y volumen al 50%
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&wmode=transparent&controls=0&start=0&iv_load_policy=3&mute=0&volume=50`;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowfullscreen = true;
        iframe.frameborder = '0';
        
        // Limpiar el contenido anterior y agregar el nuevo iframe
        videoPlayer.innerHTML = '';
        videoPlayer.appendChild(iframe);
    };

    // Función para cerrar el modal
    function closeModal() {
        modal.style.display = 'none';
        // Limpiar el iframe
        videoPlayer.innerHTML = '';
    }

    // Event listener para los rectángulos
    document.querySelectorAll('.lineup-card').forEach(card => {
        card.addEventListener('click', () => {
            const videoUrl = card.getAttribute('data-video-id');
            openModal(videoUrl);
        });
    });

    // Event listener para el botón de cerrar
    closeBtn.addEventListener('click', closeModal);

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
