function getUserCardDOM(p) {
  const picture = `assets/photographers/${p.portrait}`;
  const article = document.createElement('article');
  article.innerHTML = `<img src=${picture}>
                        <h2>${p.name}</h2>
                        <p>${p.city}</p>
                        <span>${p.tagline}</span>`
  return (article);
}

function photographerFactory(photographerData) {
  // const { name, portrait, city, tagline } = data;
  return { ...photographerData, picture: `assets/photographers/${photographerData.portrait}` }
}