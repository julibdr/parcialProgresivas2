const params = new URLSearchParams(window.location.search);
const peliculaId = params.toString().split('=')[1];
const div = document.getElementById('detalle');
const volver = document.getElementById('volver');
console.log(peliculaId);

const verDetalles = async () =>{
    try {
        const respuesta = await fetch(
            `https://api.themoviedb.org/3/movie/${peliculaId}?api_key=47e33bf29ef2fc5eaefdc1cd1ed4b0df&language=es-MX`,
    
        );
        console.log(respuesta);
    
        if (respuesta.status === 200) {
          const datos = await respuesta.json();
            const titulo = datos.title;
            const descripcion = datos.overview;
            const anoLanzamiento = datos.release_date;
            const poster = datos.poster_path;
            div.innerHTML="";
            div.innerHTML=`
            <div class="card" style="width: 15rem;">
                <img src="https://image.tmdb.org/t/p/w500/${poster}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <p class="descripcion">${descripcion}}</p>
                <p class="descripcion">${anoLanzamiento}</p>
                </div>
                </div>
                `;
        } else if (respuesta.status === 401) {
          console.log("Pusiste la llave mal");
        } else if (respuesta.status === 404) {
          console.log("La pelicula que buscas no existe");
        } else {
          console.log("Error no identificado");
        }
      } catch (error) {
        console.log(error);
      } 
}
volver.addEventListener('click', () => {
    window.location.href = 'index.html';
})
verDetalles();