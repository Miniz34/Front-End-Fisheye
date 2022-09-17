export const getUserCardDOM = (p) => {
  const article = document.createElement('div');
  article.classList.add("header-1")
  article.innerHTML = `<h2>${p.name}</h2>
                        <p>${p.city}, ${p.country}</p>
                        <span>${p.tagline}</span>`



  return (article)
}

export const getUserCardPicture = (p) => {
  const picture = `assets/photographers/${p.portrait}`;
  const article = document.createElement('div');
  article.classList.add("header-2")
  article.innerHTML = `<img src=${picture} alt="miniature du photographe">`

  return (article)
}

export const getNameModal = (p) => {
  const nameModal = document.createElement('h2')
  nameModal.innerHTML = `Contactez moi <br>${p.name}`

  return (nameModal)

}

export const getOverlayPrice = (p) => {
  const overlayPrice = document.createElement('div')
  overlayPrice.innerHTML = `<div class= "overlay-like-price">
  <span>${p.likes} </span>
  <span><img class="black-heart" src="assets/icons/heart-black.svg"/></span>
  <span>${p.price}€ / jour</span>
  </div>`
  return (overlayPrice)

}

// const newArticle = document.createElement("div")
// newArticle.classList.add(".header-2")
// newArticle.innerHTML = `<p>hello</p>`

export const getUserCardDOMIndex = (p) => {
  const picture = `assets/photographers/${p.portrait}`;
  const article = document.createElement('article');
  article.innerHTML = `<img src=${picture} alt="miniature du photographe">
                        <h2><a href=./photographer.html?id=${p.id}>${p.name}</a></h2>
                        <p>${p.city}, ${p.country}</p>
                        <span>${p.tagline}</span>`
  return (article);
}

export const photographerFactory = (photographerData) => {
  // const { name, portrait, city, tagline } = data;
  console.log(photographerData)
  return { ...photographerData, picture: `assets/photographers/${photographerData.portrait}` }
}
