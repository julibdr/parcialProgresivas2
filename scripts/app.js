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
                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="card-img-top" alt="${pelicula.title}">
                <div class="card-body">
                <button class="like_btn" data-pelicula-id="${pelicula.id}">
                <span id="icon"><i class="bi bi-heart"></i></span>
                </button>
                <h5 class="card-title">${pelicula.title}</h5>
                <a href="detalle.html?id=${pelicula.id}" class="btn btn-peliculas">Ver detalles</a>
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
  favoritos();
};
cargarPeliculas();
  const btnBuscar = document.getElementById('buscar');
  const peliculasBuscadas = document.getElementById('peliculasBuscadas');
  btnBuscar.addEventListener('click', buscarPeliculas);
  async function buscarPeliculas(e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input').value;

    try {
      const respuesta = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=47e33bf29ef2fc5eaefdc1cd1ed4b0df&language=es-MX&query=${searchInput}`
      );
  
      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        document.getElementById("contenedor").style.display = "none";
        verPeliculas(datos.results);
      } else {
        console.log('Error al buscar películas');
      }
    } catch (error) {
      console.error('Error al buscar películas:', error);
    }
  }
  function verPeliculas(pelicula) {
    
   peliculasBuscadas.innerHTML = '';
  
    if (pelicula.length === 0) {
      peliculasBuscadas.textContent = 'No se encontraron películas.';
    } else {
      pelicula.forEach((pelicula) => {
        const pElement = document.createElement('div');
        pElement.innerHTML = `
        <div class="card" style="width: 15rem;">
        <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="card-img-top" alt="${pelicula.title}">
        <div class="card-body">
        <button class="like_btn">
                <span id="icon"><i class="bi bi-heart"></i></span>
        </button>
        <h5 class="card-title">${pelicula.title}</h5>
        <a href="detalle.html?id=${pelicula.id}" class="btn btn-peliculas">Ver detalles</a>
        </div>
        </div>
        `;
        peliculasBuscadas.appendChild(pElement);
      });
      const volverBtn = document.createElement('button');
      volverBtn.textContent = 'Volver';
      volverBtn.className = 'btn btn-volver';
      volverBtn.addEventListener('click', () => {
      peliculasBuscadas.style.display = "none";
      //  document.getElementById("detalle");
      });
      peliculasBuscadas.append(volverBtn);
      favoritos();
    }
  }   