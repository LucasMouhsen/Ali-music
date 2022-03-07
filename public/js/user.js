/*previsualizar imagenes subidas con multer*/


window.addEventListener("load", () => {




  document.getElementById("validatedCustomFile").onchange = function (e) {
    // Creamos el objeto de la clase FileReader
    let reader = new FileReader();

    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(e.target.files[0]);

    // Le decimos que cuando este listo ejecute el código interno
    reader.onload = function () {
      let preview = document.getElementById('img-preview'),
        image = document.createElement('img');


      image.src = reader.result;

      preview.innerHTML = '';
      preview.append(image);
      /* borrar atributo */
      document.querySelector(".img-circle").classList.remove("block");
      document.querySelector(".img-circle").classList.add("none");
    };
  }
  const openDelete = document.querySelectorAll('#openDelete');
  const modal_delete = document.querySelectorAll('#modal_delete');
  const closeDelete = document.querySelectorAll('#closeDelete');

  openDelete.forEach((element,index) => {
    element.addEventListener('click', () => {
      console.log("llega");
      modal_delete[index].classList.add('show');
    });
    closeDelete.forEach((element) => {
      element.addEventListener('click', () => {
        modal_delete[index].classList.remove('show');
      });
    })

  })
})

