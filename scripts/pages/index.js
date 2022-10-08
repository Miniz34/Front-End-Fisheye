import { getPhotographers } from "../utils/database.js"
import { photographerFactory, getUserCardDOMIndex } from "../factories/photographer.js"



//Affichage données page d'accueil
function displayData(data) {
  const photographersSection = document.querySelector(".photographer_section");
  // photographers.media.map()
  data.photographers.map((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = getUserCardDOMIndex(photographerModel);
    photographersSection.appendChild(userCardDOM);
  })
};


// Récupère les datas des photographes
function init() {
  getPhotographers(displayData);
};

init();




