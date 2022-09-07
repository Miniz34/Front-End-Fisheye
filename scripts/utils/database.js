export const getPhotographers = (callback) => {
  // Penser à remplacer par les données récupérées dans le json
  fetch("/data/photographers.json")
    .then(response => response.json())
    .then(data => callback(data))
  // et bien retourner le tableau photographers seulement une fois
  // console.log(photographer)
}


