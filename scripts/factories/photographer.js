function photographerFactory(data) {
  // const { name, portrait, city, tagline } = data;
  console.log(data)
  const photographerData = data.photographers
  console.log(photographerData)

  for (i in photographerData) {
    const name = photographerData[i].name
    const portrait = photographerData[i].portrait
    const id = photographerData[i].id
    const tagline = photographerData[i].tagline
    const city = photographerData[i].city
    console.log(name, portrait, id, tagline, city)



    const picture = `assets/photographers/${portrait}`;


    function getUserCardDOM() {
      const article = document.createElement('article');
      const img = document.createElement('img');
      img.setAttribute("src", picture)
      //ajouter alt etc
      const h2 = document.createElement('h2');
      h2.textContent = name;
      const p = document.createElement('p')
      p.textContent = city
      const span = document.createElement('span')
      span.textContent = tagline

      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(p);
      article.appendChild(span);


      return (article);
    }

    return { name, picture, id, tagline, city, getUserCardDOM }
  }

}

