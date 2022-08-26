const params = (new URL(document.location)).searchParams;
const id = params.get("id")

function getPhotographers(callback) {
  // Penser à remplacer par les données récupérées dans le json
  fetch("/data/photographers.json")
    .then(response => response.json())
    .then(data => callback(data))
  // et bien retourner le tableau photographers seulement une fois
  // console.log(photographer)
}

function displayPhotographer(data) {
  const photographersHeader = document.querySelector(".photograph-header")
  console.log(photographersHeader)
  // data.photographers.map((photographer)
  console.log(data)

  let mainPhotographer = data.photographers
  let thisPhotographer = mainPhotographer.find(e => e.id == id)
  console.log(thisPhotographer)


  const photographerModel = photographerFactory(thisPhotographer);
  console.log(photographerModel)
  const userPhotographer = getPhotographer(photographerModel);
  photographersHeader.appendChild(userPhotographer);

}


function displayData(data) {
  const photographersSection = document.querySelector("main");
  const photographersDiv = document.querySelector("photograph-header");
  // data.photographers.map((photographer)
  console.log(data)
  let allPortfolio = data.media
  console.log(allPortfolio)
  let thisPortfolio = allPortfolio.filter(i => i.photographerId == id)
  console.log(thisPortfolio)

  thisPortfolio.map((photographer) => {
    const photographerModel = photographerFactory(photographer);
    console.log(photographerModel)
    const userCardDOM = getUserCardDOM(photographerModel);
    photographersSection.appendChild(userCardDOM);
  })
}


function init() {
  // Récupère les datas des photographes
  getPhotographers(displayData);
  getPhotographers(displayPhotographer)
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
