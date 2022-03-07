const $ = id => document.getElementById(id)


window.addEventListener("load", () => {
    console.log("Ali music")

    let regExLetter = /^[A-Z]+$/i;

    let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;



    $("email").addEventListener('blur', () => {
        switch (true) {
            case !$("email").value.trim():
                $("email-Errors").innerHTML = 'El campo email es obligatorio'
                $("email").classList.add('is-invalid')
                break;
            case !regExEmail.test($("email").value):
                $("email-Errors").innerHTML = 'Debe ingresar un email válido'
                $("email").classList.add('is-invalid')
                break
            default:
                $("email").classList.remove('is-invalid')
                $("email").classList.add('is-valid')
                $("email-Errors").innerHTML = ""
                break;
        }
    })

    $("password").addEventListener('blur', () => {
        switch (true) {
            case !$("password").value.trim():
                $("password-Errors").innerHTML = 'El campo contraseña es obligatorio'
                $("password").classList.add('is-invalid')
                break;
            case !regExPass.test($("password").value):
                $("password-Errors").innerHTML = 'Debe ingresar una contraseña válida'
                $("password").classList.add('is-invalid')
                break
            default:
                $("password").classList.remove('is-invalid')
                $("password").classList.add('is-valid')
                $("password-Errors").innerHTML = ""
                break;
        }
    }
    )
    $("form-login").addEventListener('submit', event => {
        event.preventDefault();
        let elementsForm = $('form-login').elements;
        let error = false;

        for (let i = 0; i < elementsForm.length - 2; i++) {
            
            if(!elementsForm[i].value){
                elementsForm[i].classList.add('is-invalid')
                $('error-empty').innerHTML = "Los campos señalados son obligatorios";
                error = true
                console.log(elementsForm[i].value);
            }
        }
        for (let i = 0; i < elementsForm.length - 2; i++) {
            
            if(elementsForm[i].classList.contains('is-invalid')){
                error = true
                console.log('2'+elementsForm);
            }
        }

        if(!error){
            $('form-login').submit()

        }
    })
    $("recordar").addEventListener('click', () => {
        if ($("recordar").checked) {
            $("password").type = "text"
        } else {
            $("password").type = "password"
        }
    }
    )
})