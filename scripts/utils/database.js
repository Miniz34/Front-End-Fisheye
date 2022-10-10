

export const getPhotographers = (callback) => {
  fetch("/data/photographers.json")
    .then(response => response.json())
    .then(data => callback(data))
}


