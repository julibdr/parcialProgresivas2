const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=47e33bf29ef2fc5eaefdc1cd1ed4b0df&language=es-MX"
    );
    console.log(respuesta);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      let peliculas = "";
      datos.results.forEach((pelicula) => {
        peliculas += `
                <div class="card" style="width: 15rem;">
                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${pelicula.title}</h5>
                <a href="#" class="btn btn-primary">Ver detalles</a>
                </div>
                </div>
           
                
                `;
      });

      document.getElementById("contenedor").innerHTML = peliculas;
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
};
cargarPeliculas();
