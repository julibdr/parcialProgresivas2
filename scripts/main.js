navigator.serviceWorker.register('../serviceWorker.js');
const modo = document.getElementById('modo');

addEventListener('online', function(){
 modo.innerHTML = `<i class="bi bi-wifi"></i>`;
})

addEventListener('offline', function(){
  modo.innerHTML = `<i class="bi bi-wifi-off"></i>`;
})
function favoritos() {
    const likeBtns = document.querySelectorAll(".like_btn");
    const pelisFav = JSON.parse(localStorage.getItem("favoritos")) || [];
    likeBtns.forEach((likeBtn) => {
      const likeIcon = likeBtn.querySelector("span#icon");
      const peliculaId = likeBtn.dataset.peliculaId;
      let clicked = pelisFav.includes(peliculaId);

      if (clicked) {
        likeIcon.innerHTML = `<i class="bi bi-heart-fill text-danger"></i>`;
      }

      likeBtn.addEventListener("click", () => {
        clicked = !clicked;
        if (clicked) {
          likeIcon.innerHTML = `<i class="bi bi-heart-fill text-danger"></i>`;
          pelisFav.push(peliculaId);
          console.log(pelisFav);
        } else {
          likeIcon.innerHTML = `<i class="bi bi-heart"></i>`;
          const index = pelisFav.indexOf(peliculaId);
        if (index > -1) {
          pelisFav.splice(index, 1);
           console.log(pelisFav);
        }
        }
        localStorage.setItem("favoritos", JSON.stringify(pelisFav));
      });
    });
  }
  favoritos();   