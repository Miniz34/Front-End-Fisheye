import { getPhotographers } from "../utils/database.js"
import { photographerFactory, getUserCardDOM, getUserCardPicture, getNameModal } from "../factories/photographer.js"
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


function displayNameModal(data) {

  const modalTitle = document.querySelector(".modal-title")
  const closeButton = document.querySelector(".close-button")
  let mainPhotographer = data.photographers
  let thisPhotographer = mainPhotographer.find(e => e.id == id)
  console.log(thisPhotographer)
  const photographerModel = photographerFactory(thisPhotographer);
  const userModal = getNameModal(photographerModel)
  modalTitle.insertBefore(userModal, closeButton)
}



function displayMedia(data) {
  const photographersSection = document.querySelector(".photo-wrapper");
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
  displayMedia(data);
  displayNameModal(data);
  // displayImgLightbox(data);
  sortData(data)
}

function init() {
  // Récupère les datas des photographes
  getPhotographers(displayData);
};

init();


/////////////////////////////////////////////////////////
//////////////////////   TRI     ///////////////////////
////////////////////////////////////////////////////////


function sortData(data) {
  let allPortfolio = data.media
  console.log(allPortfolio)
  let thisPortfolio = allPortfolio.filter(i => i.photographerId == id)
  console.log(thisPortfolio)
  thisPortfolio.sort()
}


const popularity = document.querySelector(".popularity")
const sortDate = document.querySelector(".date")
const sortTitle = document.querySelector(".sort-title")
popularity.addEventListener("click", event => {
  event.preventDefault()
  if ((sortDate.style.display = "none") && (sortTitle.style.display = "none")) {
    sortDate.style.display = "block"
    sortTitle.style.display = "block"
  }
  else if ((sortDate.style.display = "block") && (sortTitle.style.display = "block")) {
    sortDate.style.display = "none"
    sortTitle.style.display = "none"
  } else {

  }
})
