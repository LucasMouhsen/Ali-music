function slideshow() {
    
    $('.slider-1').slick({
        speed: 1000,
        fade: true
    });
}

$(function () {
    slideshow();
    /* setTimeout(function () {
        $('.slider-1 .slick-next').click();
    }, 1000); */
})