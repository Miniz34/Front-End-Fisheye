import { getPhotographers } from "../utils/database.js"
import { photographerFactory, getUserCardDOM, getUserCardPicture, getNameModal, getOverlayPrice } from "../factories/photographer.js"
import { mediaFactory } from '../factories/media.js'
import lightbox from "../utils/lightbox.js";
import likes from "../utils/likes.js"

const params = (new URL(document.location)).searchParams;
const id = params.get("id")


const likesMedia = (media) => {

  const likesLS = localStorage.getItem("likes")
  if (!likesLS) {
    media.likes++;
    LIKES++
    localStorage.setItem("likes", JSON.stringify([media.id]))
    return
  }

  const likesArray = JSON.parse(likesLS)
  const obj = likesArray.find(e => e === media.id)
  if (!obj) {
    media.likes++
    LIKES++
    likesArray.push(media.id)
  } else {
    media.likes--;
    LIKES--
    likesArray.splice(likesArray.indexOf(media.id), 1)
  }

  localStorage.setItem("likes", JSON.stringify(likesArray))
}

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

function displayOverlay(data) {
  const photographer = document.querySelector("body")
  console.log(photographer)
  let mainPhotographer = data.photographers
  let thisPhotographer = mainPhotographer.find(e => e.id == id)
  const photographerModel = photographerFactory(thisPhotographer);
  console.log(photographerModel)
  const photographerOverlay = getOverlayPrice(photographerModel)
  photographer.appendChild(photographerOverlay)

}

function displayTotalLikes(data) {
  let mainPhotos = data.media
  let allLikes = mainPhotos.filter(j => j.photographerId == id)
  let likesCount = 0
  let totalLikes = allLikes.map(function (likeList) {
    likesCount = likesCount + likeList.likes
    return likesCount
  })
  const overlayLikes = totalLikes[totalLikes.length - 1]
  // const LS = localStorage.getItem("likes")
  // let lsValue = LS.split(',');
  // console.log(lsValue.length)
  let domLikes = document.getElementById("totalLikes")
  domLikes.innerHTML = overlayLikes
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

let LIKES = 0;

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
  const likesLS = localStorage.getItem("likes");
  const likesArray = likesLS ? JSON.parse(likesLS) : [];
  console.log(likesArray)

  thisPortfolio.map((media) => {
    if (likesArray.find(e => e === media.id)) {
      console.log("found")
      media.likes++;
    }

    const userCardDOM = mediaFactory(media);
    userCardDOM.setAttribute("id", "" + media.id)
    userCardDOM.id = "" + media.id;
    MAP_MEDIA.set("" + media.id, media)
    const pHeart = userCardDOM.querySelector(".like-button");
    const pLike = userCardDOM.querySelector(".like-count");
    pHeart.onclick = () => {
      console.log(pLike.textContent, media.likes)
      likesMedia(media)
      pLike.textContent = "" + media.likes;
    }
    div.appendChild(userCardDOM);
    LIKES += media.likes

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
  displayOverlay(data);
  displayTotalLikes(data);
  sortData(data)
  // addLikes(data)

  const next = document.querySelector(".lightbox-next")
  const previous = document.querySelector(".lightbox-prev")
  const close = document.querySelector(".lightbox-close")
  const open2 = document.querySelectorAll("thumbnail-img")
  console.log(open, open2)




  // displayImgLightbox(data);

  // ici tout est chargé
  lightbox.addListeners(document.querySelectorAll(".thumbnail-image"))
  lightbox.next(document.querySelector(".lightbox-next"))
  lightbox.previous(document.querySelector(".lightbox-prev"))

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") {
      next.click()
      console.log("utilisation right")

    }
  })
  document.addEventListener("keydown", e => {
    if (e.key.toLocaleLowerCase() === "arrowleft") {
      previous.click()
      console.log("utilisation left")
    }
  })

  document.addEventListener("keydown", e => {
    if (e.key.toLocaleLowerCase() === "escape") {
      lightbox.close()
    }
  })

  // const open = document.querySelectorAll(".lightbox-img")

  // document.addEventListener("keydown", e => {
  //   if (e.key.toLocaleLowerCase() === "u") {
  //     open.click()
  //     console.log("press u")
  //   }
  // })





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
    let expended = false;
    const sortButtons = [
      {
        button: sortPopularity,
        sort: sortByLikes,
        sens: 1
      }, {
        button: sortDate,
        sort: sortByDate,
        sens: 1
      }, {
        button: sortTitle,
        sort: sortByTitle,
        sens: 1
      }]

    sortButtons.map(element => {
      const button = element.button;
      button.addEventListener("click", function (event) {
        event.preventDefault()

        // open drop down menu
        if (!expended) {
          sortButtons.map(b => {
            b.button.classList.remove("hide"), b.button.classList.add("hide-img")
          })
          sortButtons[0].button.classList.remove("hide-img")
          sortButtons.map((e, index) => {
            if (index > 0) e.button.classList.add("border");
          })
          expended = true;
        } else {
          element.sens *= -1;
          const div = document.querySelector('.grid-photograph');
          const list = [...div.querySelectorAll('.list-photograph')];
          list.map(elem => div.removeChild(elem));
          Sens.likes = -Sens.likes; element.sort(list, element.sens);
          list.map(elem => div.appendChild(elem));
          sortButtons.map(b => {
            b.button.classList.add("hide", "hide-img")
            b.button.classList.remove("border");
          })
          button.classList.remove("hide", "hide-img")
          expended = false;
        }
      }
      )
    })
  }

}


function init() {
  document.querySelector("body").appendChild(lightbox.create());
  // Récupère les datas des photographes
  getPhotographers(displayData);
};

init();

document.addEventListener("keydown", e => {
  console.log(e)
})