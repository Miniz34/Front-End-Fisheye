import { getPhotographers } from "../utils/database.js"
import { photographerFactory, getUserCardDOM, getUserCardPicture } from "../factories/photographer.js"
import { mediaFactory } from '../factories/media.js'

const params = (new URL(document.location)).searchParams;
const id = params.get("id")

function displayPhotographer(data) {
  const photographersHeader = document.querySelector(".photograph-header")
  console.log(photographersHeader)
  const test = document.querySelector(".contact_button")

  // data.photographers.map((photographer)
  console.log(data)

  let mainPhotographer = data.photographers
  let thisPhotographer = mainPhotographer.find(e => e.id == id)
  console.log(thisPhotographer)

  const photographerModel = photographerFactory(thisPhotographer);
  console.log(photographerModel)
  const userPhotographer = getUserCardDOM(photographerModel);
  const userPicture = getUserCardPicture(photographerModel)
  photographersHeader.insertBefore(userPhotographer, test);
  photographersHeader.appendChild(userPicture)
}



function displayMedia(data) {
  const photographersSection = document.querySelector("main");
  // data.photographers.map((photographer)
  console.log(data)
  let allPortfolio = data.media
  console.log(allPortfolio)
  let thisPortfolio = allPortfolio.filter(i => i.photographerId == id)
  console.log(thisPortfolio)
  const div = document.createElement('div');
  div.classList.add("grid-photograph")
  photographersSection.appendChild(div);

  thisPortfolio.map((media) => {
    const userCardDOM = mediaFactory(media);
    div.appendChild(userCardDOM);
  })
}


function displayData(data) {
  displayPhotographer(data);
  displayMedia(data)
}

function init() {
  // Récupère les datas des photographes
  getPhotographers(displayData);
};

init();


// const photographerModel = photographerFactory(photographer);
// const photographerCardDOM = getPhotographer(photographer)
// photographersDiv.appendChild(photographerCardDOM)






// function displayPhotographer(data) {
//   const photographersSection = document.querySelector(".photograph-header");
//   console.log(data)
//   let mainPhotographer = data.photographers
//   let thisPhotographer = mainPhotographer.find(e => e.id == id)
//   console.log(thisPhotographer)

//   const photographerTemplate = photographerFactory();
//   console.log(photographerTemplate)
//   const photographerCardDOM = getPhotographer(photographerTemplate);
//   photographersHeader.appendChild(photographerCardDOM);
// }

// displayPhotographer()








//Mettre le code JavaScript lié à la page photographer.html


// function getPhotographer() {
//   // Penser à remplacer par les données récupérées dans le json
//   fetch("/data/photographers.json")
//     .then(response => response.json())
//     .then((data) => {
//       let mainPhotographer = data.photographers
//       let index = mainPhotographer.find(e => e.id == id)
//       console.log(index)
//     })
//   // et bien retourner le tableau photographers seulement une fois
//   // console.log(photographer)
// }



// function init() {
//   // Récupère les datas des photographes
//   getPhotographer();
// };

// init()
