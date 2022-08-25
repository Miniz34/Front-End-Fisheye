function getPhotographers(callback) {
  // Penser à remplacer par les données récupérées dans le json
  fetch("/data/photographers.json")
    .then(response => response.json())
    .then(data => callback(data))
  // et bien retourner le tableau photographers seulement une fois
  // console.log(photographer)
}


function displayData(data) {
  const photographersSection = document.querySelector(".photographer_section");
  // photographers.media.map()
  data.photographers.map((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = getUserCardDOM(photographerModel);
    photographersSection.appendChild(userCardDOM);
  })
};

function init() {
  // Récupère les datas des photographes
  getPhotographers(displayData);
};

init();







// const photographers = [
//   {
//     "name": "Ma data test",
//     "id": 1,
//     "city": "Paris",
//     "country": "France",
//     "tagline": "Ceci est ma data test",
//     "price": 400,
//     "portrait": "account.png"
//   },
//   {
//     "name": "Autre data test",
//     "id": 2,
//     "city": "Londres",
//     "country": "UK",
//     "tagline": "Ceci est ma data test 2",
//     "price": 500,
//     "portrait": "account.png"
//   },
// ]