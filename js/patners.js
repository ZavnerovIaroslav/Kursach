let htmlCard
const cardRest = document.querySelectorAll(".card-restaurant")
console.log(cardRest)
async function getComment(){
    const respons = await fetch("./db/partners.json");
    const data = await respons.json()
     data.forEach((item, index) => {
        // console.log(item)
        htmlCard = `<img src="${item.image}" alt="image" class="card-image" /><div class="card-text"><div class="card-heading"><h3 class="card-title">${item.name}</h3><span class="card-tag tag">${item.time_of_delivery} мин</span></div><!-- /.card-heading --><div class="card-info"><div class="rating">${item.stars}</div><div class="price">От ${item.price} ₽</div><div class="category">${item.kitchen}</div></div> <!-- /.card-info --></div>`
        cardRest[index].innerHTML = htmlCard
      


    });
    // console.log(htmlCard)
}

getComment()

