let modalAuth = document.querySelector(".modal-auth")
let modalCart = document.querySelector(".modal-cart")
const btnAuth = document.querySelector(".button-auth")
const btnOut = document.querySelector(".button-out")
const btnBasket = document.getElementById("cart-button")
const header = document.querySelector(".header")
const spanLog = document.createElement("span")
const closeAuth = document.querySelector(".close-auth")

const key = "auth"
console.log(modalCart )

let loginVal
let passwordVal


if((localStorage.getItem(key))  != null){
    spanLog.innerText = localStorage.getItem(key)
    header.append(spanLog)
    btnOut.style.display = "flex"
    btnBasket.style.display = "flex"
    btnAuth.style.display = "none"

}

btnAuth.addEventListener("click", ()=>{
    modalAuth.style.display = "flex"
})



let form = document.getElementById("logInForm") 
form.addEventListener("submit", (event)=>{
    event.preventDefault()
    
    let login = document.getElementById("login")
    let password = document.getElementById("password")
    if(login.value == "" || password.value == ""){
        alert("Не введён логин либо пароль")
    }else{
        loginVal = login.value
        passwordVal = password.value 
        modalAuth.style.display = ""
        login.value = ""
        password.value = ""

        localStorage.setItem(key, loginVal)
        btnOut.style.display = "flex"
        btnBasket.style.display = "flex"
        btnAuth.style.display = "none"

        spanLog.innerText = loginVal
        header.append(spanLog)


    }
   
})

closeAuth.addEventListener("click", ()=>{
    modalAuth.style.display = "none"
})

btnOut.addEventListener("click", () => {
    btnOut.style.display = "none"
    btnBasket.style.display = "none"
    spanLog.remove()
    localStorage.removeItem(key);
    btnAuth.style.display = "flex"
})

btnBasket.addEventListener("click", ()=>{
    modalCart.style.display = "flex"

    if(localStorage.getItem("cart") == null){
        const resultPrice = document.querySelector(".modal-pricetag")
        resultPrice.textContent = `${0} ₽`
    }
        
    //добавление блюд в корзину
    const  arrCart = JSON.parse(localStorage.getItem("cart")) 
    const modalBodyCart = document.querySelector(".modal-body")
    modalBodyCart.innerHTML = ""
    if(arrCart != undefined){
        arrCart.forEach(item => {   
            const {name, price, total} = item
            // console.log(item.id, name, price, total)
            let htmlBodyModal = 
            `
            <div class="food-row">
                <span class="food-name">${name}</span>
                <strong class="food-price">${price}</strong>
                <div class="food-counter">
                    <button class="counter-button counter-minus">-</button>
                    <span class="counter">${total}</span>
                    <button class="counter-button counter-plus">+</button>
                </div>
            </div>
            `
               
            modalBodyCart.innerHTML +=htmlBodyModal
        sumCart()
    
        })
    }
    
})

modalCart.addEventListener("click", (event)=>{
    // console.log(event.target)
    
    if(event.target == document.querySelector(".close")){
        console.log("close")
        modalCart.style.display = "none"
    }
    // }else if(event.target == document.querySelector(".clear-cart")){
    //     modalCard.style.display = "none"
    //     // console.log("отмена")
    // }
})


function sumCart(){
    const arrCart = JSON.parse(localStorage.getItem("cart"))
    const resultPrice = document.querySelector(".modal-pricetag")
    let result = arrCart.reduce(function(sum, current) {
        current.price = Number(current.price.substr(0, 3))
       return sum + current.price * current.total
      }, 0);

    result = `${result} ₽`
    resultPrice.innerText = result
    console.log(result, resultPrice) 
}

// localStorage.clear()



