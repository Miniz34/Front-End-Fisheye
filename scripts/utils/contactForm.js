function displayModal() {
  const modal = document.getElementById("contact_modal");
  const main = document.querySelector("#main");
  const close = document.querySelector(".close-button");

  modal.style.display = "block";
  modal.setAttribute('aria-hidden', 'false')
  main.setAttribute('aria-hidden', 'true')
  close.focus()

}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const main = document.querySelector("#main");

  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true')
  main.setAttribute('aria-hidden', 'false')
}

const firstName = document.querySelector("#firstname")
const lastName = document.querySelector("#name")
const email = document.querySelector("#email")
const message = document.querySelector("#message")


let submit = document.querySelectorAll(".contact_button")[1];
console.log(submit)
submit.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(firstName.value)
  console.log(lastName.value)
  console.log(email.value)
  console.log(message.value)
})





// export const displayModal = () => {
//   const modal = document.getElementById("contact_modal");
//   modal.style.display = "block";
// }

// export const closeModal = () => {
//   const modal = document.getElementById("contact_modal");
//   modal.style.display = "none";
// }
