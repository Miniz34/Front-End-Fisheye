//Header photographe page du photographe
export const getUserCardDOM = (p) => {
  const article = document.createElement('div');
  article.classList.add("header-1")
  article.innerHTML = `<h1 class="name">${p.name}</h1>
                        <p>${p.city}, ${p.country}</p>
                        <span>${p.tagline}</span>`
  return (article)
}


//Affichage miniature photographe page photographe
export const getUserCardPicture = (p) => {
  const picture = `assets/photographers/${p.portrait}`;
  const article = document.createElement('div');
  article.classList.add("header-2")
  article.innerHTML = `<img src=${picture} alt="miniature de ${p.name}">`

  return (article)
}


//Affichage nom modal
export const getNameModal = (p) => {
  const nameModal = document.createElement('h2')
  nameModal.innerHTML = `Contactez moi <br>${p.name}`
  return (nameModal)
}


//Affichage overlay
export const getOverlayPrice = (p) => {
  const overlayPrice = document.createElement('div')
  overlayPrice.innerHTML = `<div class= "overlay-like-price" inert>
  <span id="totalLikes"></span>
  <span><img class="black-heart" src="assets/icons/heart-black.svg" alt="coeur total like"/></span>
  <span>${p.price}€ / jour</span>
  </div>`
  return (overlayPrice)
}



//Affichage données photographes page d'accueil
export const getUserCardDOMIndex = (p) => {
  const picture = `assets/photographers/${p.portrait}`;
  const article = document.createElement('article');
  article.innerHTML = `<img src=${picture} alt="miniature de ${p.name}">
                        <h2><a href=./photographer.html?id=${p.id}>${p.name}</a></h2>
                        <p>${p.city}, ${p.country}</p>
                        <span>${p.tagline}</span>
                        <span class="price">${p.price}€/jour</span>`
  return (article);
}

export const photographerFactory = (photographerData) => {
  console.log(photographerData)
  return { ...photographerData, picture: `assets/photographers/${photographerData.portrait}` }
}
