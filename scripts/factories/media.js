
export const mediaFactory = (p) => {
  const SRC_URL = `./assets/images/`;
  const SRC_URL_THUMBNAIL = `./assets/images/miniatures/`

  const div = document.createElement('div');
  div.classList.add("list-photograph")
  let src = ""
  if (p["video"]) src = `<video src=${SRC_URL + p.video} class="thumbnail-image" alt="Photo de  test"></video>`
  else src = `<img src=${SRC_URL_THUMBNAIL + p.image} class="thumbnail-image" alt="Photo de  test">`

  div.innerHTML = `<a class="img-link">${src} 
  </a>
  <div class="photo-text">
  
  <p class="title">${p.title}</p>
  
  <button class="like-button">
            ${p.likes}<img src="assets/icons/heart.svg"/>
          </button>  
  </div>
  `

  return (div);

}



// function callBackMedia(callback) {
//   callback(mediaFactory)
// }
// callBackMedia()



/* <button class="close-button">
  <img src="assets/icons/close.svg" onclick="closeModal()" />
</button> */




