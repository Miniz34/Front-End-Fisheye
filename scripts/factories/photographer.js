function getUserCardDOM(p) {
  const picture = `assets/photographers/${p.portrait}`;
  const article = document.createElement('article');
  article.innerHTML = `<img src=${picture} alt="miniature du photographe">
                        <h2><a href=./photographer.html?id=${p.id}>${p.name}</a></h2>
                        <p>${p.city}</p>
                        <span>${p.tagline}</span>
                        <p>${p.id}</p>`
  return (article);
}

function photographerFactory(photographerData) {
  // const { name, portrait, city, tagline } = data;
  console.log(photographerData)
  return { ...photographerData, picture: `assets/photographers/${photographerData.portrait}` }
}


