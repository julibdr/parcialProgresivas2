
const pelisFav = JSON.parse(localStorage.getItem("favoritos"));
const divFavoritos = document.getElementById('peliculasFavoritas');

const eliminarFavoritos = (peliculaId) => {
  const index = pelisFav.indexOf(peliculaId);
  if (index > -1) {
    pelisFav.splice(index, 1);
    console.log(pelisFav);
    // Actualiza el almacenamiento local con la lista actualizada de favoritos
    localStorage.setItem("favoritos", JSON.stringify(pelisFav));

    // Elimina la tarjeta correspondiente
    const card = document.getElementById(`card-${peliculaId}`);
    if (card) {
      card.remove();
    }
  }
};

const verFavoritos = async () => {
  try {
    divFavoritos.innerHTML = ""; 

    for (const peliculaId of pelisFav ) {
      const respuesta = await fetch(
        `https://api.themoviedb.org/3/movie/${peliculaId}?api_key=47e33bf29ef2fc5eaefdc1cd1ed4b0df&language=es-MX`
      );

      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        const titulo = datos.title;
        const descripcion = datos.overview;
        const anoLanzamiento = datos.release_date;
        const poster = datos.poster_path;
        const card = document.createElement("div");
        card.id = `card-${peliculaId}`;
        card.classList.add("card", "mb-3", "detalleCard");
        card.style.maxWidth = "540px";
        card.innerHTML = `
          <div class="row g-0">
            <div class="col-md-4">
              <img src="https://image.tmdb.org/t/p/w500/${poster}" class="img-fluid rounded-start" alt="${titulo}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <p class="card-text">${descripcion}</p>
                <p class="descripcion">Año de lanzamiento: ${anoLanzamiento}</p>
                <button class="btn eliminarFavBtn" data-pelicula-id="${peliculaId}">Eliminar de favoritos</button>
              </div>
            </div>
          </div>
        `;

        divFavoritos.appendChild(card);
      } else if (respuesta.status === 401) {
        console.log("Pusiste la llave mal");
      } else if (respuesta.status === 404) {
        console.log("La película que buscas no existe");
      } else {
        console.log("Error no identificado");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

verFavoritos();

divFavoritos.addEventListener('click', (event) => {
  if (event.target.classList.contains('eliminarFavBtn')) {
    const peliculaId = event.target.dataset.peliculaId;
    eliminarFavoritos(peliculaId);
  }
});

volver.addEventListener('click', () => {
  window.location.href = 'index.html';
});
