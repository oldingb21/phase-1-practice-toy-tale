let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  //Need to make a card containing each toy
  //should have h2, img, p, and button tags
  //add classes to appropriate tags so the CSS links to 
  //the correct tag 
  fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then((toys) => {
      toys.forEach((toy) => {
        const card = document.createElement('div');
        card.classList = "card";
        const toyName = document.createElement('h2');
        toyName.textContent = toy.name;
        const toyImg = document.createElement('img');
        toyImg.classList = "toy-avatar"
        toyImg.src = toy.image;
        const toyLikes = document.createElement('p');
        toyLikes.textContent = `${toy.likes} Likes`;
        const likeBtn = document.createElement('button');
        likeBtn.classList = "like-btn";
        likeBtn.id = toy.id
        likeBtn.textContent = "Like ❤️"
        card.append(toyName, toyImg, toyLikes, likeBtn);
        document.getElementById("toy-collection").appendChild(card);
        /*Here I need to add an event listener to the like button
        that will update the amount of likes in the db and on the DOM */
        document.getElementById(`${likeBtn.id}`).addEventListener('click',(e) => {
          fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
          body: JSON.stringify({
            "likes" : toy.likes+=1
          })
        })
        })
      })
    })
    document.querySelector('.add-toy-form').addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(e.target.image.value)
      return fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name" : `${e.target.name.value}`,
          "image" : `${e.target.image.value}`,
          "likes" : 0
        })
      })
        .then((res) => res.json())
        .then((newToy) => {
          const card = document.createElement('div');
          card.classList = "card";
          const newToyName = document.createElement('h2');
          newToyName.textContent = newToy.name;
          const newToyImg = document.createElement('img');
          newToyImg.classList = "toy-avatar";
          newToyImg.src = newToy.image;
          const newToyLikes = document.createElement('p');
          newToyLikes.textContent = `${newToy.likes} Likes`;
          const likeBtn = document.createElement('button');
          likeBtn.classList = "like-btn";
          likeBtn.id = newToy.id
          likeBtn.textContent = "Like ❤️"
          card.append(newToyName, newToyImg, newToyLikes, likeBtn);
          document.getElementById(`${likeBtn.id}`).addEventListener('click',(e) => {
            fetch(`http://localhost:3000/toys/${newToy.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
            body: JSON.stringify({
              "likes" : newToy.likes+=1
            })
          })
        })
    })
  })
})
