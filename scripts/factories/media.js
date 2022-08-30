export const mediaFactory = (p) => {
  const SRC_URL = `./assets/images/`;

  const div = document.createElement('div');
  div.classList.add("list-photograph")
  let src = ""
  if (p["video"]) src = `<video src=${SRC_URL + p.video} alt="Photo de  test"></video>`
  else src = `<img src=${SRC_URL + p.image} alt="Photo de  test">`

  div.innerHTML = `${src}<h3>${p.title}</h3>
  <span>prix: ${p.price}</span>
  <span> likes : ${p.likes}</span>`

  return (div);
}
