const modal = document.getElementById("contact_modal");
const main = document.querySelector("#main");
const header = document.querySelector("header");

const closeButton = document.querySelector(".close-button");

function displayModal() {


  modal.style.display = "block";
  main.style.opacity = 0.3
  main.setAttribute("inert", "true")
  header.setAttribute("inert", "true")
  main.setAttribute("aria-hidden", "true")
  modal.setAttribute("tabindex", 1)
  modal.setAttribute("aria-modal", "true")
  header.style.opacity = 0.3
  modal.setAttribute('aria-hidden', 'false')
  main.setAttribute('aria-hidden', 'true')
  closeButton.focus()

}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  const main = document.querySelector("#main");

  modal.style.display = "none";
  main.style.opacity = 1
  header.style.opacity = 1
  main.removeAttribute("inert")
  header.removeAttribute("inert")

  header.setAttribute("inert", "false")
  modal.setAttribute('aria-hidden', 'true')
  main.setAttribute('aria-hidden', 'false')
  modal.setAttribute("aria-modal", "false")
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


document.addEventListener("keydown", e => {
  if (modal.style.display === "block" && e.key === "Escape") {
    console.log("modal ouverte")
    closeModal()
  }
})


closeButton.addEventListener("keydown", e => {
  if (modal.style.display === "block" && e.key === "Enter") {
    console.log("fermeture du modal")
    closeModal()
  }
})



//Validation Prénom
const nameRegex = /^[a-zA-Zàâäéèêëïîôöùûüç-]{2,128}$/

const errorFirstName = firstName.nextElementSibling
const errorLastName = lastName.nextElementSibling
const errorEmail = email.nextElementSibling


function firstNameValidation() {
  errorFirstName.textContent = "";

  if (!nameRegex.test(firstName.value)) {
    errorFirstName.textContent = "Veuillez renseigner un prénom de plus de 2 lettres valide";
    return false;
  }
  return true;
}




//Validation nom de famille
function lastNameValidation() {
  errorLastName.textContent = "";

  if (!nameRegex.test(lastName.value)) {
    errorLastName.textContent = "Veuillez renseigner un nom de famille de plus de 2 lettres valide";
    return false;
  }
  return true;
}

//Validation Email
function emailValidation() {
  errorEmail.textContent = ""
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[A-Za-z]{2,3})+$/;

  if (!regexEmail.test(email.value)) {
    errorEmail.textContent = "Veuillez insérer un email valide"
    return false;
  }
  return true;
}


firstName.onchange = () => { firstNameValidation() }
lastName.onchange = () => { lastNameValidation() }
email.onchange = () => { emailValidation() }
