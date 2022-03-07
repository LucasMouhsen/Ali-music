window.addEventListener("load", () => {
    const openDeleteAdmin = document.querySelectorAll('#openDeleteAdmin');
    const modal_delete_admin = document.querySelectorAll('#modal_delete_admin');
    const closeDeleteAdmin = document.querySelectorAll('#closeDeleteAdmin');

    openDeleteAdmin.forEach((element, index) => {
        element.addEventListener('click', () => {
            console.log("llega");
            modal_delete_admin[index].classList.add('show');
        });
        closeDeleteAdmin.forEach((element) => {
            element.addEventListener('click', () => {
                modal_delete_admin[index].classList.remove('show');
            });
        })

    })
})