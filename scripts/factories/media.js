
//Affichage des médias avec différenciation images/vidéos

export const mediaFactory = (p) => {
  if (!p.hasOwnProperty("title")) console.error("MEDIA PAS BON", p)
  const SRC_URL = `./assets/images/`;
  const SRC_URL_THUMBNAIL = `./assets/images/miniatures/`

  const div = document.createElement('div');
  div.classList.add("list-photograph")
  let src = ""
  if (p["video"]) src = `<video src=${SRC_URL + p.video} class="thumbnail-image" alt="${p.title}" tabindex ="1"></video>`
  else src = `<img src=${SRC_URL_THUMBNAIL + p.image} class="thumbnail-image" alt="${p.title}" tabindex ="1">`

  div.innerHTML = `
 ${src} 
  <div class="photo-text">
    <p class="title">${p.title}</p>
    <button class="like-button" tabindex ="1">
      <p class="like-count" id="like-count-${p.id}"> ${p.likes}</p>
      <img src="assets/icons/heart.svg" alt="Bouton Like"/>
    </button>
  </div>`
  return (div);
}









