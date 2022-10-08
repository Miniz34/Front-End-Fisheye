import { getPhotographers } from "../utils/database.js"
import { photographerFactory, getUserCardDOM, getUserCardPicture, getNameModal, getOverlayPrice } from "../factories/photographer.js"
import { mediaFactory } from '../factories/media.js'
import lightbox from "../utils/lightbox.js";


const params = (new URL(document.location)).searchParams;
const id = params.get("id")


//Gestion des likes
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



//Affichage photographe unique
function displayPhotographer(data) {
  const photographersHeader = document.querySelector(".photograph-header")
  const test = document.querySelector(".contact_button")
  let mainPhotographer = data.photographers
  let thisPhotographer = mainPhotographer.find(e => e.id == id)
  const photographerModel = photographerFactory(thisPhotographer);
  const userPhotographer = getUserCardDOM(photographerModel);
  const userPicture = getUserCardPicture(photographerModel)
  photographersHeader.insertBefore(userPhotographer, test);
  photographersHeader.appendChild(userPicture)
}


//Affichage Overlay
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


//Affichage total like Overlay
function displayTotalLikes(data) {
  let mainPhotos = data.media
  let allLikes = mainPhotos.filter(j => j.photographerId == id)
  let likesCount = 0
  let totalLikes = allLikes.map(function (likeList) {
    likesCount = likesCount + likeList.likes
    return likesCount
  })
  const overlayLikes = totalLikes[totalLikes.length - 1]
  let domLikes = document.getElementById("totalLikes")
  domLikes.innerHTML = overlayLikes
}

//Affichage nom modal
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

//Affichage medias (photos et vidéos)
function displayMedia(data) {
  const photographersSection = document.querySelector(".photo-wrapper");
  let allPortfolio = data.media
  let thisPortfolio = allPortfolio.filter(i => i.photographerId == id)
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
      displayTotalLikes(data)
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

// Fonction tri par date
const sortByDate = (list, order = 1) => {
  return list.sort((a, b) => {
    const ma = MAP_MEDIA.get("" + a.id).date
    const mb = MAP_MEDIA.get("" + b.id).date
    return (new Date(ma).getTime() - new Date(mb).getTime()) * order
  })
}

// Fonction tri par like
const sortByLikes = (list, order = 1) => {
  return list.sort((a, b) => {
    const ma = MAP_MEDIA.get("" + a.id).likes
    const mb = MAP_MEDIA.get("" + b.id).likes
    return (ma - mb) * order;
  })
}

// Fonction tri par title
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


//Fonction affichage page entière
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




  // Page entièrement load après ce point
  lightbox.addListeners(document.querySelectorAll(".thumbnail-image"))
  lightbox.next(document.querySelector(".lightbox-next"))
  lightbox.previous(document.querySelector(".lightbox-prev"))

  document.addEventListener("keydown", e => {
    if (lightbox.opened()) {
      console.log("light")
      switch (e.key.toLowerCase()) {
        case "arrowleft":
          e.preventDefault()
          previous.click()
          break;
        case "arrowright":
          e.preventDefault()
          next.click()
          break;
        case "escape":
          e.preventDefault()
          lightbox.close()
          break;
      }
    }
  })


  //Fonction de tri général
  function sortData(data) {

    let media = data.media
    console.log(media)
    let thisMedia = media.filter(k => k.photographerId == id)
    console.log(thisMedia)
    thisMedia.forEach(element => {
      title.push(element.title)
    });
    console.log(title)

    const sortPopularity = document.querySelector(".sort-popularity")
    const sortDate = document.querySelector(".sort-date")
    const sortTitle = document.querySelector(".sort-title")
    const sortOption = document.querySelector(".sort-option")

    let expended = false;
    let sortIndex = 0
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

    const sortFunction = (element, index) => {
      console.log(index, sortIndex)
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
      element.button.classList.remove("hide", "hide-img")
      expended = false;
      sortIndex = index;
    }

    sortOption.onkeydown = event => {

      switch (event.key) {
        case "Enter":
          event.preventDefault()
          sortFunction(sortButtons[sortIndex], sortIndex)
          break

        case "ArrowUp":
          event.preventDefault()
          sortIndex = (sortIndex + 1) % sortButtons.length
          sortFunction(sortButtons[sortIndex], sortIndex)
          break

        case "ArrowDown":
          event.preventDefault()
          sortIndex = (sortIndex - 1 + sortButtons.length) % sortButtons.length
          sortFunction(sortButtons[sortIndex], sortIndex)
          break
      }

    }

    sortButtons.map((element, index) => {
      const button = element.button;
      button.addEventListener("click", function (event) {
        event.preventDefault()

        // open drop down menu
        if (!expended) {
          sortOption.classList.add("zindex")
          sortButtons.map(b => {
            b.button.classList.remove("hide"), b.button.classList.add("hide-img")
          })
          sortButtons[0].button.classList.remove("hide-img")
          sortButtons.map((e, index) => {
            if (index > 0) e.button.classList.add("border");
          })
          expended = true;
        } else {
          sortFunction(element, index)
          sortOption.classList.remove("zindex")
        }
      }
      )
    })

    sortOption.addEventListener("blur", event => {
      if (expended) {
        sortButtons.map(b => {
          b.button.classList.add("hide", "hide-img")
          b.button.classList.remove("border");
        })
        sortButtons[sortIndex].button.classList.remove("hide", "hide-img")
        expended = false;
      }
    })

  }

}


function init() {
  document.querySelector("body").appendChild(lightbox.create());
  // Récupère les datas des photographes
  getPhotographers(displayData);
};

init();
