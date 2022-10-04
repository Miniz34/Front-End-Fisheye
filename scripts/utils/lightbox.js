let src = []

const main = document.querySelector("#main");
const header = document.querySelector("header");

const LightBox = {
  list: [],
  index: -1,

  create: () => {
    const element = document.createElement("div");
    element.setAttribute('id', "lightbox");
    element.setAttribute('aria-hidden', true);
    element.tabIndex = 1
    element.innerHTML = `
      <button class="lightbox-close" aria-label = "Fermer lightbox"><img src="assets/icons/close-red.svg" alt = "Fermer lightbox" /></button>
      <button class="lightbox-next" aria-label = "photo suivante"> <img src="assets/icons/arrow.svg" alt = "photo suivante" /></button>
      <button class="lightbox-prev" aria-label = "photo précédante"> <img src="assets/icons/arrow.svg" alt = "photo précédante" /></button>
      <div class="lightbox-container">
      <div class="lightbox-content">
        <img src=""  id="lightbox-img" alt="Média">
        
        <video src=""  id="lightbox-video" controls autoplay></video>
        <h2 class="lightbox-title">média : </h2>
        </div>
      </div>
      
      
      `
    element.style.display = "none";
    element.querySelector(".lightbox-close").onclick = (event) => { LightBox.close(); }
    return element;
  },

  getLightbox: () => { return document.getElementById("lightbox") },

  display: (item) => {

    LightBox.getLightbox().style.display = "block"

    const LB = document.querySelector("#lightbox")
    const title = document.querySelector(".lightbox-title")
    main.setAttribute('aria-hidden', 'true')
    header.setAttribute('aria-hidden', 'true')
    main.setAttribute('inert', 'true')
    header.setAttribute('inert', 'true')


    switch (item.type) {
      case "IMG":
        document.getElementById("lightbox-video").style.display = "none"
        document.getElementById("lightbox-img").src = "./assets/images/" + item.src
        document.getElementById("lightbox-img").style.display = "block"
        document.getElementById("lightbox-img").setAttribute("alt", item.title)
        document.querySelector(".lightbox-title").style.display = "block"
        title.innerHTML = item.title
        LB.setAttribute('aria-hidden', 'false')
        LB.setAttribute('aria-modal', 'true')

        main.setAttribute('aria-hidden', 'true')
        break;

      case "VIDEO":
        document.getElementById("lightbox-img").style.display = "none"
        document.getElementById("lightbox-video").src = "./assets/images/" + item.src
        document.getElementById("lightbox-video").style.display = "block"
        document.getElementById("lightbox-video").setAttribute("alt", item.title)

        document.querySelector(".lightbox-title").style.display = "block"

        document.querySelector(".lightbox-title").innerHTML = item.title

        main.setAttribute('aria-hidden', 'true')
        break;
    }
  },

  close: () => {
    document.getElementById("lightbox").style.display = "none";
    main.removeAttribute("inert")
    header.removeAttribute("inert")
  },

  addListeners: (selectors, callback = (event, item) => { console.log(item.src); }) => {
    [...selectors].map(item => {
      item.onclick = item.onkeydown = event => {

        if (event instanceof KeyboardEvent && event.key === "Enter" || event instanceof MouseEvent) {
          console.log(event.type)
          callback(event, item)
          const fileTitle = (item.getAttribute("alt"));
          const fileName = item.src.split("/").slice(-1)[0];
          LightBox.display({ src: fileName, type: item.tagName, title: fileTitle })
          LightBox.arrayImg(fileName)
          console.log(item)
        }
      }
    })
  },



  ////mon nouveau "code"

  arrayImg: (pFileName) => {
    const array = [...document.querySelectorAll(".thumbnail-image")];
    LightBox.list = array.map((elem, index) => {
      const fileName = elem.src.split('/').slice(-1)[0];
      const fileTitle = elem.getAttribute("alt");

      if (fileName === pFileName) LightBox.index = index
      return { src: fileName, type: elem.tagName, title: fileTitle }
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
      console.log("press boutton")
      LightBox.index--;
      if (LightBox.index < 0) LightBox.index = LightBox.list.length - 1;
      LightBox.display(LightBox.list[LightBox.index]);
    }

  },
  opened: () => document.getElementById("lightbox").style.display !== "none"
}



export default LightBox;