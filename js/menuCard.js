const nameCard= localStorage.getItem("nameCard")
const cardInfo = document.querySelector(".section-heading")
const cardFood = document.querySelector(".cards-menu")
let htmlCardMenu
let htmlInfo 
let divCard
let selectJson
console.log(cardInfo)




function addCartItem(Cart){
    const arrCart = localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")) : []
    //Проверка на наличия блюда в корзине и добавление в localStorage
    if(arrCart.some(item => item.id === Cart.id)){
        arrCart.map(item =>{
            if(item.id === Cart.id){
                item.total += 1
            }
            return item
        } )
        
    }else{
        arrCart.push(Cart)
    }
    
    localStorage.setItem("cart", JSON.stringify(arrCart))
}



async function getComment(){
    let respons = await fetch("./db/partners.json");
    let data = await respons.json()

    //нахождение нужного json файла для выбраного раздела
     data.forEach((item) => {
        const {products, name} = item
        if(name == nameCard){
            selectJson = products
            // console.log(item)
            htmlInfo =`
            <h2 class="section-title restaurant-title">${item.name}</h2>
					<div class="card-info">
						<div class="rating">
							${item.stars}
						</div>
						<div class="price">От ${item.price} ₽</div>
						<div class="category">${item.kitchen}</div>
					</div>
					<!-- /.card-info -->
            `

            cardInfo.innerHTML = htmlInfo
        }

        
    });

    //добавление определённого количества div 
    respons = await fetch(`./db/${selectJson}`)
    data = await respons.json()
    // console.log(data, data.length, "2")
    for(let i = 0; i < data.length; i++){
        cardFood.innerHTML += '<div class="card">'
    }

    //отрисовка меню выбранного раздела
    divCard= cardFood.querySelectorAll(".card")
    data.forEach((item, index) => {
        htmlCardMenu = `<img src="${item.image}" alt="image" class="card-image" /><div class="card-text"><div class="card-heading">
        <h3 class="card-title card-title-reg">${item.name}</h3></div><!-- /.card-heading -->
        <div class="card-info"><div class="ingredients">${item.description}</div></div><!-- /.card-info -->
        <div class="card-buttons"><button class="button button-primary button-add-cart">
        <span class="button-card-text">В корзину</span><span class="button-cart-svg">
        </span></button><strong class="card-price-bold">${item.price} ₽</strong></div>`

        divCard[index].innerHTML = htmlCardMenu

       
    });



    function addCart(){
        const Cart =  document.querySelector(".cards-menu")
    
       let v = Cart.querySelectorAll(".card")
    //    console.log(v)
       Cart.addEventListener("click", (event)=>{
           selectItem = event.target.closest(".card")
           let nameFood = selectItem.querySelector(".card-title-reg").textContent
        //    console.log()
            let trueFood = data.find((item) =>{
                return item.name == nameFood
            })
            // console.log(trueFood.id, trueFood.name)
            const id = trueFood.id
           if(selectItem){
            const ObjCart = {
                name: nameFood,
                price: selectItem.querySelector(".card-price-bold").textContent, 
                id,
                total: 1
           }

           addCartItem(ObjCart)
        }
       })
  
    }
  
    addCart()

    
    
    

    // console.log( divCard[1].querySelector(".button-add-cart"))
}
// localStorage.removeItem("bascket")
getComment()


