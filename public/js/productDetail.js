let images = document.querySelectorAll("#images")
let firstImage = document.getElementById("firstImage")
let star = document.getElementById("star")

window.addEventListener("load", ()=>{
    images.forEach(image => {
        image.addEventListener("click",()=>{
            firstImage.src = image.src
        })
    })
    star.addEventListener("click",(e)=>{
        star.classList.toggle("star")
    })
})