const Likes = {
  //   add: () => {
  //     const element = document.createElement("div");
  //     element.innerHTML = `
  //       <button class="like-button">
  //   ${p.likes}<img src="assets/icons/heart.svg"/>
  //  </button>  
  //     `

  //   },

  get: () => {


  },

  add: (likes) => {
    const likeButton = document.querySelectorAll(".like-button");

    likeButton.forEach(item => {
      item.onclick = event => (console.log(likes))
    })

  },

  remove: () => {

  },
  test: () => {
    console.log("cliqué")



  },
  log: () => {
    console.log("la fonction est importée")
  }
}

export default Likes;





//   <button class="like-button">
//   ${p.likes}<img src="assets/icons/heart.svg"/>
// </button>  