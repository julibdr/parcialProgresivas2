
// const favoritosContainer = document.getElementById('favoritos-contenedor');
 // Obtén la lista de favoritos (puedes implementar la función obtenerListaFavoritos())

// Recorre la lista de favoritos y muestra los detalles de cada película
listaFavoritos.forEach((peliculaId) => {
  obtenerDetallesPelicula(peliculaId)
    .then((pelicula) => {
      mostrarPelicula(pelicula);
    })
    .catch((error) => {
      console.error('Error al obtener los detalles de la película:', error);
    });
});

// Función para obtener los detalles de una película según su ID
async function obtenerDetallesPelicula(peliculaId) {
  const url = `https://api.themoviedb.org/3/movie/${peliculaId}?api_key=47e33bf29ef2fc5eaefdc1cd1ed4b0df&language=es-MX`;
  const respuesta = await fetch(url);
  const datos = await respuesta.json();
  return datos;
}

// Función para mostrar los detalles de una película en el contenedor
// function mostrarPelicula(pelicula) {
//   const peliculaElement = document.createElement('div');
//   peliculaElement.innerHTML = `
//     <div class="card">
//       <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="${pelicula.title}">
//       <div class="card-body">
//         <h5 class="card-title">${pelicula.title}</h5>
//         <p class="card-text">${pelicula.overview}</p>
//       </div>
//     </div>
//   `;
//   favoritosContainer.appendChild(peliculaElement);
// }
// mostrarPelicula()
const div = document.getElementById('favoritos-contenedor')
const mostrarPelicula= async () =>{
    try {
        const respuesta = await fetch(
            `https://api.themoviedb.org/3/movie/${peliculaId}?api_key=47e33bf29ef2fc5eaefdc1cd1ed4b0df&language=es-MX`
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
                <div class="card mb-3 detalleCard" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                  <img src="https://image.tmdb.org/t/p/w500/${poster}"class="img-fluid rounded-start" alt="${titulo}">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${titulo}</h5>
                      <p class="card-text">${descripcion}</p>
                     <p class="descripcion">Año de lanzamiento: ${anoLanzamiento}</p>
                    </div>
                  </div>
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