ScrollReveal().reveal('.art');
/* $(window).load(function () {
    $(".loader").fadeOut("slow");
  }); */

const showMenu = (headerToggle, navbarId) =>{
    const toggleBtn = document.getElementById(headerToggle),
    nav = document.getElementById(navbarId)
    
    if(headerToggle && navbarId){
        toggleBtn.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')
            toggleBtn.classList.toggle('bx-x')
        })
    }
}
/* ver header al scrolling */
const headerScroll = () =>{
    const header = document.getElementById('header'),
    headerHeight = header.offsetHeight
    window.addEventListener('scroll', ()=>{
        if(window.scrollY > headerHeight){
            header.classList.add('header-white')
        }else{
            header.classList.remove('header-white')
        }
    })
}
/* imagen de perfil en tiempo real */
/* const imgProfile = () =>{
    const imgProfile = document.getElementById('img-profile')
    imgProfile.setAttribute("src","/images/fotoUser/avatar_default.png"); 

}
imgProfile() */
headerScroll()
showMenu('header-toggle','navbar')

const linkColor = document.querySelectorAll('.nav__link')

function colorLink(){
    linkColor.forEach(l => l.classList.remove('activo'))
    this.classList.add('activo')
}

linkColor.forEach(l => l.addEventListener('click', colorLink))
