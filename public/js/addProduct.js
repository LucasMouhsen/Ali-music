    let form1 = document.getElementById("form1")
    let span = document.querySelectorAll(".error")
    let name = document.querySelector("input#name")
    let price = document.querySelector("input#price")
    let discount = document.querySelector("input#discount")
    let category = document.querySelector("#category")
    let description = document.querySelector("#description")
    let image = document.querySelector("#image")

window.addEventListener("load",()=>{

    name.addEventListener("input",()=>{
        if (name.value.length <= 0) {
            span[0].innerHTML = "Debes indicar el nombre del producto"
            name.classList.add("is-invalid")
        }else{
            span[0].innerHTML = ""
            name.classList.remove("is-invalid")
            name.classList.add("is-valid")
        }
    })
    price.addEventListener("input",()=>{
        if (price.value <= 0) {
            span[1].innerHTML = " Debes indicar un precio mayor a 0"
            price.classList.add("is-invalid")
        }else{
            span[1].innerHTML = ""
            price.classList.remove("is-invalid")
            price.classList.add("is-valid")
        }
    })
    discount.addEventListener("input",()=>{
        if(discount.value > 90){
            span[2].innerHTML = " Solo se permiten números hasta 90"
            discount.classList.add("is-invalid")
        }else{
            span[2].innerHTML = ""
            discount.classList.remove("is-invalid")
            discount.classList.add("is-valid")
        }
        if (discount.value < 0) {
            span[2].innerHTML = " No se permiten números menores a 0"
            discount.classList.add("is-invalid")
        }else{
            discount.classList.add("is-valid")
        }
    })
    category.addEventListener("input",()=>{
        category.value.length <= 0 ? span[3].innerHTML = " Debes seleccionar una categoria" : span[3].innerHTML = ""
    })
    description.addEventListener("input",()=>{
        if (description.value.length <= 9) {
            span[4].innerHTML = " La descripción debe tener minimo 10 caracteres"
            description.classList.add("is-invalid")
        }else{
            span[4].innerHTML = ""
            description.classList.remove("is-invalid")
            description.classList.add("is-valid")
        }
    })

    image.addEventListener("change",()=>{
        image.files.length == 0 ? span[5].innerHTML = "Tenes que subir una imagen" : null

        for (let i = 0; i < image.files.length; i++) {
            if (image.files[i].name.toLowerCase().endsWith(".jpg") || image.files[i].name.toLowerCase().endsWith(".png") || image.files[i].name.toLowerCase().endsWith(".webp")) {
                span[5].innerHTML = null
            }else{
                span[5].innerHTML = "Las imagenes tienen que ser formato jpg, png o webp"
            } 
        }
        
    })

    form1.addEventListener("submit",e=>{
        e.preventDefault()
        // AL ENVIAR FORMULARIO ERRORES DE NOMBRE
        if (name.value.length <= 0) {
            span[0].innerHTML = "Debes indicar el nombre del producto"
            name.classList.add("is-invalid")
        }else{
            span[0].innerHTML = ""
        }
        // AL ENVIAR FORMULARIO ERRORES DE PRECIO
        if (price.value <= 0) {
            span[1].innerHTML = " Debes indicar un precio mayor a 0"
            price.classList.add("is-invalid")
        }else{
            span[1].innerHTML = ""
            price.classList.remove("is-invalid")
            price.classList.add("is-valid")
        }
        // AL ENVIAR FORMULARIO ERRORES DE DESCUENTO
        if(discount.value > 90){
            span[2].innerHTML = " Solo se permiten números hasta 90"
            discount.classList.add("is-invalid")
        }else{
            span[2].innerHTML = ""
            discount.classList.remove("is-invalid")
            discount.classList.add("is-valid")
        }
        if (discount.value < 0) {
            span[2].innerHTML = " No se permiten números menores a 0"
            discount.classList.add("is-invalid")
        }else{
            discount.classList.add("is-valid")
        }
        // AL ENVIAR FORMULARIO ERRORES DE CATEGORIA
        category.value.length <= 0 ? span[3].innerHTML = " Debes seleccionar una categoria" : span[3].innerHTML = ""
        // AL ENVIAR FORMULARIO ERRORES DE DESCRIPCION
        if (description.value.length <= 9) {
            span[4].innerHTML = " La descripción debe tener minimo 10 caracteres"
            description.classList.add("is-invalid")
        }else{
            span[4].innerHTML = ""
            description.classList.remove("is-invalid")
            description.classList.add("is-valid")
        }
        // AL ENVIAR FORMULARIO ERRORES DE IMAGENES
        image.files.length == 0 ? span[5].innerHTML = "Tenes que subir una imagen" : null
        for (let i = 0; i < image.files.length; i++) {
            if (image.files[i].name.toLowerCase().endsWith(".jpg") || image.files[i].name.toLowerCase().endsWith(".png") || image.files[i].name.toLowerCase().endsWith(".webp")) {
                span[5].innerHTML = null
            }else{
                span[5].innerHTML = "Las imagenes tienen que ser formato jpg, png o webp"
            } 
        }
        
        
        let erroresActivos = []
        span.forEach(error =>{ 
            if (error.textContent != "") {
                erroresActivos.push(error.textContent)
                e.preventDefault()
            }
        })
        console.log(erroresActivos)
        erroresActivos.length != 0 ? e.preventDefault() : form1.submit()
    })
})
