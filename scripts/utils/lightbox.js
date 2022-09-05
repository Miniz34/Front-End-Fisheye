// import { getPhotographers } from "../utils/database"

// getPhotographers()


// function displayImgLightbox(data) {
//   console.log(data)
// }


const lightbox = document.getElementById("lightbox")
const lightboxImage = document.querySelector(".lightbox-img")

function displayLightbox(event) {
  // const links = event.target || event.srcElement;
  // console.log(links);
  lightbox.style.display = "block"
  console.log(lightboxImage.src)
  lightboxImage.src = "https://picsum.photos/900/900"
}

function closeLightbox() {
  lightbox.style.display = "none"
}




const trigger = document.querySelector(".header-2")
console.log(trigger)
const test = document.querySelectorAll(".allo")
console.log(test)
test.forEach(item => {
  item.addEventListener("click", event => {
    console.log("bonjour")
    displayLightbox()
  })
})



const close = document.querySelector(".lightbox-close")
close.addEventListener("click", (event) => {
  event.preventDefault()
  closeLightbox()
})

// function displayImageLightbox(data) {
//   displayImgLightbox(data);
// }

// displayImageLightbox()





/* <div id="lightbox">
    <button class="lightbox-close"><img src="assets/icons/close.svg" /></button>
    <button class="lightbox-next"> <img src="assets/icons/next.svg" /></button>
    <button class="lightbox-prev"> <img src="assets/icons/next.svg" /></button>
    <div class="lightbox-container">
      <img src="https://picsum.photos/900/900" alt="Photographie">
    </div>

  </div> */

