fetch("./productos.json")
    .then(respuesta => respuesta.json())
    .then(vinos => {
        let contenedorProductos = document.getElementById("contenedorProductos");
        let buyBtn = document.getElementById("buyBtn")
        let cleanCart = document.getElementById("cleanCart")
        let cart = document.getElementById("cart")
        let cartArray = []

        if (localStorage.getItem("cart")) {
            cartArray = JSON.parse(localStorage.getItem("cart"))
        }

        cartRender()

        productRender(vinos);

        function productRender(productsArray) {
            contenedorProductos.innerHTML = " "
            for (const vino of productsArray) {
                let tarjetaProducto =  document.createElement("div")
                tarjetaProducto.className = "cardProduct"
                tarjetaProducto.innerHTML = `
                <img id="cardImg" src=${vino.imgUrl}>
                <h3 id="wineName">${vino.nombre}</h3>
                <p id="winePrice">$${vino.precio}</p>
                <button class= "buttonEvent" id=${vino.id}> AGREGAR AL CARRITO </button>
                `
                contenedorProductos.append(tarjetaProducto)
            }
            let buttons = document.getElementsByClassName("buttonEvent")
            for (const button of buttons) {
                button.addEventListener("click", addToCart)
            }
        }

        let input = document.getElementById("input")
        input.addEventListener("input", inputFilter)

        function inputFilter () {
            let wineFilter = vinos.filter(vino => vino.tipo.includes(input.value))
            productRender(wineFilter)

        }

        function addToCart (e) {
            let productAdded = vinos.find(vino => vino.id == e.target.id)
            let productPosition = cartArray.findIndex(vino => vino.id == e.target.id)
            Toastify({
                text: "AGREGADO AL CARRITO",
                duration: 2000,
                gravity: "bottom",
                position: "right",
                className: "styleToastify",
                style: {
                    background: "#71A621"
                }
                }).showToast();
            
            if(productPosition != -1) {
                cartArray[productPosition] = {
                    id: cartArray[productPosition].id, nombre: cartArray[productPosition].nombre, precio: cartArray[productPosition].precio, unidades: cartArray[productPosition].unidades + 1, subtotal: cartArray[productPosition].precio * (cartArray[productPosition].unidades + 1), imgUrl: cartArray[productPosition].imgUrl
                }
            } else {
                cartArray.push({
                    id:productAdded.id, nombre: productAdded.nombre, precio: productAdded.precio, unidades: 1, subtotal: productAdded.precio, imgUrl: productAdded.imgUrl
                })
            }

            let cartJSON = JSON.stringify(cartArray)
            localStorage.setItem("cart", cartJSON)

            cartRender()
            
        }

        cleanCart.onclick = () => {
            swal({
                title: "CANCELAR COMPRA",
                text: "¿DESEA CANCELAR LA COMPRA Y BORRAR TODOS LOS PRODUCTOS DEL CARRITO?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                buttons: ["CONTINUAR COMPRANDO" , "CANCELAR COMPRA"]
            })
            .then((willDelete) => {
                if (willDelete) {
                localStorage.clear()
                cart.innerHTML = " "
                location.reload()
                } 
            })
        }

        buyBtn.onclick = () => {
            localStorage.clear()
            cart.innerHTML = " "
            swal({
                title: "CONFIRMAR COMPRA",
                text: "CARRITO CONFIRMADO ¿DESEA PROCEDER CON EL PAGO?",
                icon: "success",
            })
            .then((value) => {
                if(value === true){
                    location.reload()
                };
            });
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
    })