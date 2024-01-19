console.log("llega el prevent")

let form = document.querySelector("form")
let inputSearch = document.getElementById("inputSearchValue")

form.addEventListener("submit",e=>{//pasarlo al sidebar header
    if(inputSearch.value == ""){
        e.preventDefault()
    }
})