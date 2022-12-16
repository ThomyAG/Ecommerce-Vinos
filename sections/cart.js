let cart = document.getElementById("cart")
let cartArray = []
if (localStorage.getItem("cart")) {
    cartArray = JSON.parse(localStorage.getItem("cart"))
}

cartRender()
buyBtn.onclick = () => {
    localStorage.clear()
    cart.innerHTML = " "
    location.reload()

}

function cartRender() {
    cart.innerHTML = ""
    for (const itemCart of cartArray) {
        cart.innerHTML += `
            <div class="cartItem">
                <img class="cartImg" src=${itemCart.imgUrl}>
                <h4 class="cartProduct">${itemCart.nombre}</h4>
                <h4 class="cartUnit">X ${itemCart.unidades}</h4>
                <p class="cartSubTotal">$${itemCart.subtotal}</p>
            </div>
    `
    }
}