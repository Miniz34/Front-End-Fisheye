//Mettre le code JavaScript lié à la page photographer.html
const params = (new URL(document.location)).searchParams;
const id = params.get("id")

function getPhotographer() {
  // Penser à remplacer par les données récupérées dans le json
  fetch("/data/photographers.json")
    .then(response => response.json())
    .then((data) => {
      let mainPhotographer = data.photographers
      let index = mainPhotographer.find(e => e.id == id)
      console.log(index)
    })
  // et bien retourner le tableau photographers seulement une fois
  // console.log(photographer)
}


function init() {
  // Récupère les datas des photographes
  getPhotographer();
};

init()