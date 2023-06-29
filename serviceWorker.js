
self.addEventListener('install', function(){

    const miCache = caches.open('mi-cache-v1').then( cache => {
        return cache.addAll([
            '/',
            'index.html',
            'detalle.html',
            'favoritos.html',
            '/scripts/app.js',
            '/scripts/detalle.js',
            '/scripts/favoritos.js',
            'serviceWorker.js',
            '/css/estilos.css',
            'banner.jpg',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
            'https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap"',
            'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js'
        ]);
    })

});

self.addEventListener('active', function(){
    console.info('El Service worker está instalado')
})

self.addEventListener('fetch', function(evento){
    // Buscamos en la web
    const respuesta = fetch(evento.request).then( respuestaNetwork => {
        return caches.open( 'mi-cache-v1' ).then(  cache => {
            // Si la web responde lo guardo en cache
            cache.put(  evento.request, respuestaNetwork.clone() );
            return respuestaNetwork;
        } )
    }).catch( error => {
        // Si falla busco en el cache
        return caches.match( evento.request)
    })

    evento.respondWith( respuesta  )
})