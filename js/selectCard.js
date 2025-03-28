const restuarants = document.querySelector(".cards-restaurants")

console.log(restuarants)
restuarants.addEventListener("click", (event)=>{
   let selectCard =event.target.closest('a')
   let nameCard = selectCard.querySelector(".card-title").textContent
   localStorage.setItem("nameCard", nameCard)
   // console.log(nameCard)
})


