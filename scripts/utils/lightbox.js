let src = []

const LightBox = {
  list: [],
  index: -1,

  create: () => {
    const element = document.createElement("div");
    element.setAttribute('id', "lightbox");
    element.setAttribute('aria-hidden', true);
    element.innerHTML = `
      <button class="lightbox-close"><img src="assets/icons/close-red.svg" /></button>
      <button class="lightbox-next"> <img src="assets/icons/arrow.svg" /></button>
      <button class="lightbox-prev"> <img src="assets/icons/arrow.svg" /></button>
      <div class="lightbox-container">
        <img src="" alt="Photographie" id="lightbox-img">
        <video src="" alt="Photographie" id="lightbox-video" controls autoplay>
        <h2 class="title-lightbox">Titre filler</h2>
      </div>`
    element.querySelector(".lightbox-close").onclick = (event) => { LightBox.close(); }
    return element;
  },

  getLightbox: () => { return document.getElementById("lightbox") },

  display: (item) => {
    LightBox.getLightbox().style.display = "block"

    switch (item.type) {
      case "IMG":
        document.getElementById("lightbox-video").style.display = "none"
        document.getElementById("lightbox-img").src = "./assets/images/" + item.src
        document.getElementById("lightbox-img").style.display = "block"
        break;

      case "VIDEO":
        document.getElementById("lightbox-img").style.display = "none"
        document.getElementById("lightbox-video").src = "./assets/images/" + item.src
        document.getElementById("lightbox-video").style.display = "block"
        break;
    }
  },

  close: () => { document.getElementById("lightbox").style.display = "none" },

  addListeners: (selectors, callback = (event, item) => { console.log(item.src); }) => {
    [...selectors].map(item => {
      item.onclick = event => {
        callback(event, item)
        const fileName = item.src.split("/").slice(-1)[0];
        LightBox.display({ src: fileName, type: item.tagName })
        LightBox.arrayImg(fileName)
      }
    })
  },

  ////mon nouveau "code"

  arrayImg: (pFileName) => {
    const array = [...document.querySelectorAll(".thumbnail-image")];
    LightBox.list = array.map((elem, index) => {
      const fileName = elem.src.split('/').slice(-1)[0];
      if (fileName === pFileName) LightBox.index = index
      return { src: fileName, type: elem.tagName }
    });
  },

  next: (nextButton) => {
    // const hello = LightBox.arrayImg()
    // console.log(hello)
    nextButton.onclick = event => {
      LightBox.index++;
      if (LightBox.index >= LightBox.list.length) LightBox.index = 0;
      LightBox.display(LightBox.list[LightBox.index]);
    }
  },

  previous: (previousButton) => {
    // const hello = LightBox.arrayImg()
    // console.log(hello)
    previousButton.onclick = event => {
      LightBox.index--;
      if (LightBox.index < 0) LightBox.index = LightBox.list.length - 1;
      LightBox.display(LightBox.list[LightBox.index]);
    }
  }

}

export default LightBox;