let busqueda = document.getElementById("busqueda")// filtro de categoria
let categories = document.querySelectorAll("#category")// categoria de cada producto
let table = document.getElementById("table") // tabla con productos
let menor = document.querySelector("#menor")// boton para ordenar por precio de menor a mayor
let price = document.getElementById("price")// input para filtrar hasta una cantidad de precio
let restart = document.getElementById("restart")// borra todos los filtros

let search= new URLSearchParams(window.location.search)// agarro lo que fue buscado que llega por query

window.addEventListener("load", ()=>{

     mayor.addEventListener("click", async ()=>{
         console.log("clickeaste el mayor")
        let products
         if(search.has("search") == false){
            let response = await fetch(window.origin + `/apis/orderPriceDesc`)
             products = await response.json()
         }else{
            let response = await fetch(window.origin + `/apis/orderPriceDesc?search=${search.get("search")}&price=${search.get("price")}`)
            products = await response.json()
         }
        
        console.log(products)
        table.innerHTML = null

        products.data.forEach(product => {
            console.log(table)
            table.innerHTML += `
            <tr role="" >
            <td id="category" style="display:none">${product.category.category}</td>
            <td role="cell">${product.id}</td>
            <td role="cell" class="td_img" ><img src="/images/articulos/${product.images.length != 0 ? product.images[0].image : null}" alt="producto"></td>
            <td role="cell">${product.name}</td>
            <td role="cell" class="oculto">$ ${product.price}</td>
            <td role="cell" class="oculto">${product.productStates.state}</td>
            <td role="cell" class="td_botton">
                <button><a href="/admin/edit/${product.id}"><i class="fas fa-edit"></i></a></button>
                <form action="/admin/delete/${product.id}?_method=DELETE" method="POST">
                    <button type='submit'><i class="fas fa-trash"></i></button>
                </form>
            </td>
        </tr>
            ` 
        })
        busqueda.click()
    })

     menor.addEventListener("click", async ()=>{
        console.log("clickeaste")
        let products
        if(search.has("search") == false){
            let response = await fetch(window.origin + `/apis/orderPrice`)
            products = await response.json()
        }else{
        let response = await fetch(window.origin + `/apis/orderPrice?search=${search.get("search")}&price=${search.get("price")}`)
        products = await response.json()
        }
        console.log(products)
        table.innerHTML = null

        products.data.forEach(product => {
            table.innerHTML += `
            <tr role="" >
            <td id="category" style="display:none">${product.category.category}</td>
            <td role="cell">${product.id}</td>
            <td role="cell" class="td_img" ><img src="/images/articulos/${product.images.length != 0 ? product.images[0].image : null}" alt="producto"></td>
            <td role="cell">${product.name}</td>
            <td role="cell" class="oculto">$ ${product.price}</td>
            <td role="cell" class="oculto">${product.productStates.state}</td>
            <td role="cell" class="td_botton">
                <button><a href="/admin/edit/${product.id}"><i class="fas fa-edit"></i></a></button>
                <form action="/admin/delete/${product.id}?_method=DELETE" method="POST">
                    <button type='submit'><i class="fas fa-trash"></i></button>
                </form>
            </td>
        </tr>
            ` 
        })
        busqueda.click()
    })  
    
    busqueda.addEventListener("click",()=>{
            for (let i = 0; i < categories.length; i++) {
                if (table.children[i].cells[0].textContent == busqueda.value) {
                    table.children[i].classList.remove("displayNone")
                }else{
                    if (busqueda.value == "all") {
                        table.children[i].classList.remove("displayNone")
                    }else{
                        table.children[i].classList.add("displayNone")
                    }  
                }
            }
    })
    busqueda.click() 

    restart.addEventListener("click",async()=>{
        let response = await fetch(window.origin + `/apis/all`)
        let products = await response.json()

        table.innerHTML = null

        products.data.forEach(product => {
            table.innerHTML += `
            <tr role="" >
            <td id="category" style="display:none">${product.category.category}</td>
            <td role="cell">${product.id}</td>
            <td role="cell" class="td_img" ><img src="/images/articulos/${product.images.length != 0 ? product.images[0].image : null}" alt="producto"></td>
            <td role="cell">${product.name}</td>
            <td role="cell" class="oculto">$ ${product.price}</td>
            <td role="cell" class="oculto">${product.productStates.state}</td>
            <td role="cell" class="td_botton">
                <button><a href="/admin/edit/${product.id}"><i class="fas fa-edit"></i></a></button>
                <form action="/admin/delete/${product.id}?_method=DELETE" method="POST">
                    <button type='submit'><i class="fas fa-trash"></i></button>
                </form>
            </td>
        </tr>
            ` 
        })
    })

})