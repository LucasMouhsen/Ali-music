console.log("estoy en search")
let filtrar = document.getElementById("filtrar")
let filtros = document.getElementById("filtros")

let divArt = document.getElementById("divArt")//div que contiene los productos

let busqueda = document.getElementById("busqueda")// filtro de categoria
let menor = document.querySelector("#menor")// boton para ordenar por precio de menor a mayor
let price = document.getElementById("price")// input para filtrar hasta una cantidad de precio
let restart = document.getElementById("restart")// borra todos los filtros


let formPrice = document.getElementById("formPrice")

let search= new URLSearchParams(window.location.search)// agarro lo que fue buscado que llega por query

window.addEventListener("load", ()=>{

    formPrice.addEventListener("submit", async (e)=>{
        e.preventDefault()
        let products
        if(search.has("search") != false && price.value != ""){
            let response = await fetch(window.origin + `/apis/allUser?search=${search.get("search")}&price=${price.value}`)
            products = await response.json()
        }else if(search.has("search") != false){
            let response = await fetch(window.origin + `/apis/allUser?search=${search.get("search")}&price=10000000`)
            products = await response.json()
        }
        console.log(products)
        divArt.innerHTML = null
        products.data.forEach(product => {
                divArt.innerHTML += `
                <article class="product" id="product">
                                <div class="div_img">
                                    <a href="/products/detail/${product.id}">
                                        <img src="/images/articulos/${product.images.length != 0 ? product.images[0].image : null}" alt="producto">
                                    </a>
                                    <p class="name" id="names">${product.name}</p>
                                    <div class="box_description">
                                        <p class="description">
                                            ${product.description} 
                                        </p>
                                        <span id="category">${product.category.category}</span>
                                    </div>
                                        <a class="a_buy" href="/products/detail/${product.id}">Comprar</a>
                                </div>
                                <div class="div_price">
                                    ${product.discount > 0 ?
                                        `<p class="off">
                                            ${product.discount + '% OFF'}
                                        </p>
                                        <p class="precio">$${product.price} menos $${product.discount>0 ? product.price*product.discount/100  : null}
                                        </p>`
                                        : 
                                        `<p class="precio">$${product.price}</p>`
                                    }
                                </div>
                        </article>`
            })
        busqueda.click()
    })

    filtrar.addEventListener("click", ()=>{
        filtros.classList.toggle("displayFlex")
        filtros.classList.toggle("displayNone")
    })

    mayor.addEventListener("click", async ()=>{
        let products
        if(search.has("search") != false && search.has("price") != false){
            let response = await fetch(window.origin + `/apis/orderPriceDesc?search=${search.get("search")}&price=${search.get("price")}`)
            products = await response.json()
            console.log("entra igual no le importa nnaaada")
        }else if(search.has("search") != false){
            let response = await fetch(window.origin + `/apis/orderPriceDesc?search=${search.get("search")}`)
            products = await response.json()
        }
        console.log(products)

        divArt.innerHTML = null
        products.data.forEach(product => {
                divArt.innerHTML += `
                <article class="product" id="product">
                                <div class="div_img">
                                    <a href="/products/detail/${product.id}">
                                        <img src="/images/articulos/${product.images.length != 0 ? product.images[0].image : null}" alt="producto">
                                    </a>
                                    <p class="name" id="names">${product.name}</p>
                                    <div class="box_description">
                                        <p class="description">
                                            ${product.description} 
                                        </p>
                                        <span id="category">${product.category.category}</span>
                                    </div>
                                        <a class="a_buy" href="/products/detail/${product.id}">Comprar</a>
                                </div>
                                <div class="div_price">
                                    ${product.discount > 0 ?
                                        `<p class="off">
                                            ${product.discount + '% OFF'}
                                        </p>
                                        <p class="precio">$${product.price} menos $${product.discount>0 ? product.price*product.discount/100  : null}
                                        </p>`
                                        : 
                                        `<p class="precio">$${product.price}</p>`
                                    }
                                </div>
                        </article>`
            })
        busqueda.click()
    })  

    menor.addEventListener("click", async ()=>{
        let products
        if(search.has("search") != false && search.has("price") != false){
            let response = await fetch(window.origin + `/apis/orderPrice?search=${search.get("search")}&price=${search.get("price")}`)
            products = await response.json()
        }else if(search.has("search") != false){
            let response = await fetch(window.origin + `/apis/orderPrice?search=${search.get("search")}`)
            products = await response.json()
        }

        
        divArt.innerHTML = null
        products.data.forEach(product => {
                divArt.innerHTML += `
                <article class="product" id="product">
                                <div class="div_img">
                                    <a href="/products/detail/${product.id}">
                                        <img src="/images/articulos/${product.images.length != 0 ? product.images[0].image : null}" alt="producto">
                                    </a>
                                    <p class="name" id="names">${product.name}</p>
                                    <div class="box_description">
                                        <p class="description">
                                            ${product.description} 
                                        </p>
                                        <span id="category">${product.category.category}</span>
                                    </div>
                                        <a class="a_buy" href="/products/detail/${product.id}">Comprar</a>
                                </div>
                                <div class="div_price">
                                    ${product.discount > 0 ?
                                        `<p class="off">
                                            ${product.discount + '% OFF'}
                                        </p>
                                        <p class="precio">$${product.price} menos $${product.discount>0 ? product.price*product.discount/100  : null}
                                        </p>`
                                        : 
                                        `<p class="precio">$${product.price}</p>`
                                    }
                                </div>
                        </article>`
            })
            busqueda.click()
    })

    busqueda.addEventListener("click",()=>{
        let categories = document.querySelectorAll("#category")// categoria de cada producto
        let productos = document.querySelectorAll("#product")// productos
        for (let i = 0; i < document.querySelectorAll("#category").length; i++) {
            if (categories[i].textContent == busqueda.value || busqueda.value == "all") {
                productos[i].classList.remove("displayNone")
                /* console.log("si le remueve") */
            }else{
                productos[i].classList.add("displayNone")
                /* console.log("si le addiere") */
            }
        }
        
    })

    restart.addEventListener("click",()=>{
        window.location.reload()
    })
})