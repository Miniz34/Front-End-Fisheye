let src = []

const LightBox = {
  create: () => {
    const element = document.createElement("div");
    element.setAttribute('id', "lightbox");
    element.setAttribute('aria-hidden', true);
    element.innerHTML = `
      <button class="lightbox-close"><img src="assets/icons/close-red.svg" /></button>
      <button class="lightbox-next"> <img src="assets/icons/arrow.svg" /></button>
      <button class="lightbox-prev"> <img src="assets/icons/arrow.svg" /></button>
      <div class="lightbox-container">
        <img src="" alt="Photographie" class="lightbox-img">
        <h2 class="title-lightbox">Titre filler</h2>
        <!-- <img src="https://picsum.photos/900/900" alt="Photographie"> -->
      </div>`
    element.querySelector(".lightbox-close").onclick = (event) => { LightBox.close(); }
    return element;
  },

  getLightbox: () => { return document.getElementById("lightbox") },

  getLightboxImage: () => { return document.querySelector(".lightbox-img") },

  display: (src) => {
    document.getElementById("lightbox").style.display = "block"
    document.querySelector(".lightbox-img").src = src

  },

  close: () => { document.getElementById("lightbox").style.display = "none" },

  addListeners: (selectors, callback = (event, item) => { console.log(item.src); }) => {
    console.log(selectors.src);
    selectors.forEach(item => {
      item.onclick = event => {
        callback(event, item)
        console.log(item.src)
        const newSrc = item.src
        const split = newSrc.split("/")[6]
        const bigSrc = "http://172.24.48.1:5555/assets/images/" + split
        LightBox.display(bigSrc)
        LightBox.arrayImg()
      }
    })
  },

  ////mon nouveau "code"

  arrayImg: () => {
    const image = document.querySelectorAll(".thumbnail-image")
    console.log(image)

    image.forEach(item => {
      const link = item.getAttribute("src")
      src.push(link)
    })
    console.log(src)
    return src

  },

  next: (nextButton) => {
    // const hello = LightBox.arrayImg()
    // console.log(hello)
    nextButton.onclick = event => {
      console.log("bonjours")
      LightBox.display("http://172.24.48.1:5555/assets/images/Animals_Rainbow.jpg")
    }
  },

  previous: (previousButton) => {
    // const hello = LightBox.arrayImg()
    // console.log(hello)
    previousButton.onclick = event => {
      console.log("bonjours")
      LightBox.display("http://172.24.48.1:5555/assets/images/Travel_HillsideColor.jpg")
      console.log(src)
    }
  }


}





// nextButton.onclick = event => {
//   console.log("bonjours")
//   console.log(src)
//   LightBox.display("http://172.24.48.1:5555/assets/images/Animals_Rainbow.jpg")
// }


export default LightBox;