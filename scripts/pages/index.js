async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  let photographers = []
  await fetch("/data/photographers.json")
    .then(response => response.json())
    .then(data => {
      photographers = data
      console.log(photographers)


      // this.photographer = data

      // console.log(data)


    })

  // et bien retourner le tableau photographers seulement une fois
  // console.log(photographer)

  return ({

    photographers: [photographers]
  })
}


async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
    console.log(photographerModel)
    console.log(userCardDOM)
  });
};

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
};

init();







// const photographers = [
//   {
//     "name": "Ma data test",
//     "id": 1,
//     "city": "Paris",
//     "country": "France",
//     "tagline": "Ceci est ma data test",
//     "price": 400,
//     "portrait": "account.png"
//   },
//   {
//     "name": "Autre data test",
//     "id": 2,
//     "city": "Londres",
//     "country": "UK",
//     "tagline": "Ceci est ma data test 2",
//     "price": 500,
//     "portrait": "account.png"
//   },
// ]