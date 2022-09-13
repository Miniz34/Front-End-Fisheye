import { getPhotographers } from "../utils/database.js"
import { photographerFactory, getUserCardDOM, getUserCardPicture, getNameModal } from "../factories/photographer.js"
import { mediaFactory } from '../factories/media.js'
import lightbox from "../utils/lightbox.js";
import likes from "../utils/likes.js"

const params = (new URL(document.location)).searchParams;
const id = params.get("id")

function displayPhotographer(data) {
  const photographersHeader = document.querySelector(".photograph-header")
  // console.log(photographersHeader)

  const test = document.querySelector(".contact_button")

  // data.photographers.map((photographer)
  // console.log(data)

  let mainPhotographer = data.photographers
  let thisPhotographer = mainPhotographer.find(e => e.id == id)
  // console.log(thisPhotographer)

  const photographerModel = photographerFactory(thisPhotographer);
  // console.log(photographerModel)
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
  // console.log(thisPhotographer)
  const photographerModel = photographerFactory(thisPhotographer);
  const userModal = getNameModal(photographerModel)
  modalTitle.insertBefore(userModal, closeButton)
}



function displayMedia(data) {
  // data.date = new Date(data.date)
  const photographersSection = document.querySelector(".photo-wrapper");
  // data.photographers.map((photographer)
  // console.log(data)
  let allPortfolio = data.media
  // console.log(allPortfolio)
  let thisPortfolio = allPortfolio.filter(i => i.photographerId == id)
  // console.log(thisPortfolio)
  const div = document.createElement('div');
  div.classList.add("grid-photograph")
  photographersSection.appendChild(div);
  thisPortfolio.map((media) => {
    const userCardDOM = mediaFactory(media);
    userCardDOM.setAttribute("id", "" + media.id)
    userCardDOM.id = "" + media.id;
    MAP_MEDIA.set("" + media.id, media)
    div.appendChild(userCardDOM);
  })
}

let cardArr = []
let likesCount = []
let date = []
let title = []

const MAP_MEDIA = new Map();

// by date
const sortByDate = (list, order = 1) => {
  return list.sort((a, b) => {
    const ma = MAP_MEDIA.get("" + a.id).date
    const mb = MAP_MEDIA.get("" + b.id).date
    return (new Date(ma).getTime() - new Date(mb).getTime()) * order
  })
}

// by likes
const sortByLikes = (list, order = 1) => {
  return list.sort((a, b) => {
    const ma = MAP_MEDIA.get("" + a.id).likes
    const mb = MAP_MEDIA.get("" + b.id).likes
    return (ma - mb) * order;
  })
}

// by title
const sortByTitle = (list, order = 1) => {
  console.log(MAP_MEDIA.get("" + list[0].id))

  return list.sort((a, b) => {
    const ma = MAP_MEDIA.get("" + a.id).title;
    const mb = MAP_MEDIA.get("" + b.id).title;
    return (ma.localeCompare(mb)) * order;
  })
}

const Sens = {
  title: 1,
  date: 1,
  likes: 1
}

function displayData(data) {
  displayPhotographer(data);
  displayMedia(data);
  displayNameModal(data);
  sortData(data)
  // displayImgLightbox(data);

  // ici tout est chargé
  lightbox.addListeners(document.querySelectorAll(".thumbnail-image"))
  lightbox.next(document.querySelector(".lightbox-next"))
  lightbox.previous(document.querySelector(".lightbox-prev"))

  //test likes
  likes.test(document.querySelectorAll(".like-button"))
  likes.log()

  let dom = document.querySelector(".grid-photograph")
  let cards = dom.childNodes
  console.log(dom)
  console.log(cards)

  function sortData(data) {

    const div = document.querySelector('.grid-photograph');
    let media = data.media
    console.log(media)
    let thisMedia = media.filter(k => k.photographerId == id)
    console.log(thisMedia)
    thisMedia.forEach(element => {
      title.push(element.title)
    });
    console.log(title)


    const sortPopularity = document.querySelector(".popularity")
    const sortDate = document.querySelector(".date")
    const sortTitle = document.querySelector(".sort-title")

    sortPopularity.addEventListener("click", event => {
      event.preventDefault()
      if (sortDate.classList.contains("hide")) {
        sortDate.classList.remove("hide")
        sortTitle.classList.remove("hide")
      } else {
        thisMedia.sort((a, b) => b.likes - a.likes)
        console.log(cards)
        console.log(thisMedia)
        console.log("populaire")
        sortPopularity.classList.remove("hide-img")
        sortDate.classList.add("hide", "hide-img")
        sortTitle.classList.add("hide", "hide-img")
        thisMedia.map((media) => {
          const userCardDOM = mediaFactory(media);
          div.appendChild(userCardDOM);
        })
      }
    })

    ///Trié par ID en attendant 
    sortDate.addEventListener("click", event => {
      event.preventDefault()
      if (sortPopularity.classList.contains("hide")) {
        sortPopularity.classList.remove("hide")
        sortTitle.classList.remove("hide")
        sortDate.classList.add("border")


      } else {
        thisMedia.sort((a, b) => b.id - a.id)
        console.log(thisMedia)
        console.log("date mais en fait id")
        sortDate.classList.remove("hide-img", "border")
        sortPopularity.classList.add("hide", "hide-img")
        sortTitle.classList.add("hide", "hide-img")
      }

      thisMedia.map((media) => {
        const userCardDOM = mediaFactory(media);
        div.appendChild(userCardDOM);
      })

    })
    sortTitle.addEventListener("click", event => {
      event.preventDefault()
      if (sortPopularity.classList.contains("hide")) {
        sortPopularity.classList.remove("hide")
        sortDate.classList.remove("hide")
        sortTitle.classList.add("border")

      } else {
        thisMedia.sort((a, b) => b.title - a.title)
        console.log(thisMedia)
        console.log("titre")
        sortTitle.classList.remove("hide-img", "border")
        sortPopularity.classList.add("hide", "hide-img")
        sortDate.classList.add("hide", "hide-img")
        thisMedia.map((media) => {
          const userCardDOM = mediaFactory(media);
          div.appendChild(userCardDOM);
        })
      }
    })
  }

  const elem = document.querySelector(".newtri");
  elem.onclick = () => {
    console.log("%cTRIAGE EN COURS", "color:green; font-size:25px;")
    const div = document.querySelector('.grid-photograph');
    const list = [...div.querySelectorAll('.list-photograph')];
    list.map(elem => div.removeChild(elem));
    Sens.title = -Sens.title; sortByTitle(list, Sens.title);
    list.map(elem => div.appendChild(elem));
  }
}




function init() {
  document.querySelector("body").appendChild(lightbox.create());

  // Récupère les datas des photographes
  getPhotographers(displayData);

};

init();





// LIKES






function addLikes(data) {
  let allMedia = data.media
  // console.log(allMedia)
  let thisMedia = allMedia.filter(i => i.photographerId == id)
  // console.log(thisMedia)
  thisMedia.forEach(item => {

    const buttonLike = document.querySelectorAll(".like-button")
    buttonLike.forEach(button => {
      button.onclick = event => {
        // console.log("cliquer sur" + item.likes)
      }
    })
  })

}



// const card = document.querySelectorAll(".list-photograph");
// cardArr.push(card)

// console.log(card)
// console.log(cardArr)
// div.remove(card)


// likes.add()
  // const newLike = likes.add()
  // const addLike = document.querySelectorAll(".photo-text")
  // console.log(addLike)
  // addLike.forEach(item => {
  //   item.appendChild(newLike)
  // })