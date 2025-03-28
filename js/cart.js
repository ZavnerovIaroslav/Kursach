function sumCart(){
    const arrCart = JSON.parse(localStorage.getItem("cart"))
    const resultPrice = document.querySelector(".modal-pricetag")
    let result = arrCart.reduce(function(sum, current) {
        current.price = Number(current.price.substr(0, 3))
       return sum + current.price * current.total
      }, 0);

    result = `${result} ₽`
    resultPrice.innerText = result
    // console.log(result, resultPrice) 
}

//кнопка -
function removeProduct(){
    const modalBody = document.querySelector(".modal-body")
    modalBody.addEventListener("click", (event)=>{
        let btn = event.target.closest('.counter-minus')
        if(btn){
           const selectFood =  btn.closest(".food-row") 
           nameFood =selectFood.querySelector(".food-name").textContent
            const arrCart = JSON.parse(localStorage.getItem("cart"))
            arrCart.map(item =>{
                if(item.name === nameFood){
                    if(item.total != 0){
                        item.total -= 1
                    }
                    
                }
                return item
            })
            localStorage.setItem("cart", JSON.stringify(arrCart))
            let food = arrCart.find(item => item.name == nameFood)
            let total = selectFood.querySelector(".counter")
            total.innerText = food.total
            // console.log(food, food.total, total)
        }
        sumCart()
    })
    
}

removeProduct()


//кнопка +
function addProduct (){
    const modalBody = document.querySelector(".modal-body")
    modalBody.addEventListener("click", (event)=>{
        if(event.target.closest(".counter-plus")){            
            let selectFood = event.target.closest(".food-row")
            let nameFood = selectFood.querySelector(".food-name").textContent
            let arrCart = JSON.parse(localStorage.getItem("cart"))
            arrCart.map(item =>{
                if(item.name === nameFood){
                    item.total += 1
                    
                }
                return item
            })
            localStorage.setItem("cart", JSON.stringify(arrCart))
            let food = arrCart.find(item => item.name === nameFood)
            let total = selectFood.querySelector(".counter")
            total.innerText = food.total

        }
        sumCart()
    })
    
}

addProduct()


function cancel(){
  
    let clearCart = document.querySelector(".clear-cart")
    clearCart.addEventListener("click", ()=>{
        let foodRow = document.querySelectorAll(".food-row")
        if(foodRow != undefined){
            foodRow.forEach(item => item.remove())
        localStorage.removeItem("cart")
        const modalCart = document.querySelector(".modal-cart")
        modalCart.style.display = "none" 
        }
    })
}
cancel()

function placeOrder(){
    const arrCart  = localStorage.getItem("cart")
    const modalCart = document.querySelector(".modal-cart")
    const btnOrder = modalCart.querySelector(".button-primary")
    let foodRow = document.querySelectorAll(".food-row")
    btnOrder.addEventListener("click", ()=>{
        fetch("https://jsonplaceholder.typicode.com/posts",{
            method: "POST", 
            body: arrCart,
            headers:{
                'Content-Type':'applicatio/json'
            }
        })
        .then((respons) => {
            if(respons.ok){
                console.log(respons.status, "ok")
            }
        })

        localStorage.removeItem("cart")

        if(foodRow != undefined){
            foodRow.forEach(item => item.remove())
        }
        modalCart.style.display = "none" 

        
        // fetch("https://jsonplaceholder.typicode.com/posts/1")
        // .then((data) => console.log(data))

        // async function get(){
        //     let respons = await fetch("https://jsonplaceholder.typicode.com/posts/1")
        //     let data = await respons.json()
        //     console.log(data, respons)
        // }
        // get()
    })

    console.log(btnOrder)
}
placeOrder()