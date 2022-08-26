// function photographerFactory(photographerData) {
//   // const { name, portrait, city, tagline } = data;
//   console.log(photographerData)
//   return { ...photographerData, picture: `assets/photographers/${photographerData.portrait}` }
// }

function getUserCardDOM(p) {
  const picture = `assets/images/${p.image}`;
  const div = document.createElement('div');
  const article = document.createElement('article');
  article.classList.add("photo-list")
  article.innerHTML = `<img src=${picture} alt="Photo nommé ${p.title}">
                        <h3>${p.title}</h3>
                        <span>prix: ${p.price}</span>
                        <span> likes : ${p.likes}</span>`
  return (article);
}


function getPhotographer(p) {
  const picture = `assets/photographers/${p.portrait}`;
  const div = document.createElement('div');

  div.classList.add("main-photograph")

  div.innerHTML = `<img src=${picture} alt="Photo de  test">
                        <h3>${p.name}</h3>
                        `

  return (div);
}

function photographerFactory(photographerData) {
  // const { name, portrait, city, tagline } = data;
  // console.log(photographerData)
  return { ...photographerData, picture: `assets/photographers/${photographerData.portrait}` }
}
