import { getPhotographers } from "../utils/database.js"
import { photographerFactory, getUserCardDOM, getUserCardPicture, getNameModal } from "../factories/photographer.js"
import { mediaFactory } from '../factories/media.js'
import lightbox from "../utils/lightbox.js";
import likes from "../utils/likes.js"

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
  data.date = new Date(data.date)
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
  sort(data)



  // ici tout est chargé
  lightbox.addListeners(document.querySelectorAll(".thumbnail-image"))
  lightbox.next(document.querySelector(".lightbox-next"))
  lightbox.previous(document.querySelector(".lightbox-prev"))

  //test likes
  likes.test(document.querySelectorAll(".like-button"))
  likes.log()

  addLikes(data)

  // const media = data.media
  // media.forEach(element => {
  //   console.log(element.likes)
  // });


  // likes.add()
  // const newLike = likes.add()
  // const addLike = document.querySelectorAll(".photo-text")
  // console.log(addLike)
  // addLike.forEach(item => {
  //   item.appendChild(newLike)
  // })

}


function init() {
  const elem = lightbox.create()
  document.querySelector("body").appendChild(elem);


  // Récupère les datas des photographes
  getPhotographers(displayData);
};

init();


/////////////////////////////////////////////////////////
//////////////////////   TRI     ///////////////////////
////////////////////////////////////////////////////////



function sortData(data) {
  let allMedia = data.media
  let thisPortfolio = allMedia.filter(i => i.photographerId == id)
  thisPortfolio.sort((a, b) => b.likes - a.likes)
  console.log(thisPortfolio)
}

function sort(data) {
  const popularity = document.querySelector(".popularity")
  const sortDate = document.querySelector(".date")
  const sortTitle = document.querySelector(".sort-title")
  popularity.addEventListener("click", event => {
    event.preventDefault()
    sortData(data)
    sortDate.style.display = "block"
    sortTitle.style.display = "block"
  })
}


function addLikes(data) {
  let allMedia = data.media
  console.log(allMedia)
  let thisMedia = allMedia.filter(i => i.photographerId == id)
  console.log(thisMedia)
  thisMedia.forEach(item => {

    const buttonLike = document.querySelectorAll(".like-button")
    buttonLike.forEach(button => {
      button.onclick = event => {
        console.log("cliquer sur" + item.likes)
      }
    })
  })

}
