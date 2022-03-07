const $ = id => document.getElementById(id)

let regExLetter = /^[A-Z]+$/i;

let regExEmail = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;

let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

const emailVerify = async (email) => {
    try {
        let response = await fetch(window.origin + '/apis/emails');
        let result = await response.json()

        return result.data.includes(email)
               

    } catch (error) {
        console.log(error)
    }
}

window.addEventListener("load", () => {
    console.log("Ali music");
    $('firstName').addEventListener('focus', () => {
        if ($('firstName').value.trim() === "") {
            $('firstName-error').innerHTML = "Solo caracter alfabetico"
        }
    })
    $("firstName").addEventListener("blur", () => {
        switch (true) {
            case !$("firstName").value.trim():
                $("firstName-errors").innerText = "El nombre es obligatorio"
                $("firstName").classList.add("is-invalid")
                break;
            case $('firstName').value.trim().length < 3 || $('firstName').value.trim().length > 50:
                $('firstName-errors').innerText = "Entre 3 y 50 caracteres"
                $('firstName').classList.add('is-invalid')
                break;
            case !regExLetter.test($('firstName').value.trim()):
                $('firstName-errors').innerText = "Solo caracter alfabetico"
                $('firstName').classList.add('is-invalid')
                break;


            default: $("firstName").classList.remove("is-invalid")
                $("firstName").classList.add("is-valid")
                $("firstName-errors").innerText = null
                break;
        }
    })
    $("firstName").addEventListener("change", () => {
        $("firstName").classList.remove("is-invalid")
        $("firstName-errors").innerText = null
        $("firstName-msg").innerText = null
    })


    $('lastName').addEventListener('focus', () => {
        if ($('lastName').value.trim() === "") {
            $('lastName-errors').innerHTML = "Solo caracter alfabetico"
        }
    })
    $("lastName").addEventListener("blur", () => {
        switch (true) {
            case !$("lastName").value.trim():
                $("lastName-errors").innerText = "El apellido es obligatorio"
                $("lastName").classList.add("is-invalid")
                break;
            case $('lastName').value.trim().length < 3 || $('lastName').value.trim().length > 50:
                $('lastName-errors').innerText = "Entre 3 y 50 caracteres"
                $('lastName').classList.add('is-invalid')
                break;
            case !regExLetter.test($('lastName').value.trim()):
                $('lastName-errors').innerText = "Solo caracter alfabetico"
                $('lastName').classList.add('is-invalid')
                break;


            default: $("lastName").classList.remove("is-invalid")
                $("lastName").classList.add("is-valid")
                $("lastName-errors").innerText = null
                break;
        }
    })
    $("lastName").addEventListener("change", () => {
        $("lastName").classList.remove("is-invalid")
        $("lastName-errors").innerText = null
        $("lastName-msg").innerText = null
    })

    $('userName').addEventListener('focus', () => {
        if ($('userName').value.trim() === "") {
            $('userName-error').innerHTML = "Solo caracter alfabetico"
        }
    })
    $("userName").addEventListener("blur", () => {
        switch (true) {
            case !$("userName").value.trim():
                $("userName-errors").innerText = "El nombre de usuario es obligatorio"
                $("userName").classList.add("is-invalid")
                break;
            case $('userName').value.trim().length < 3 || $('userName').value.trim().length > 50:
                $('userName-errors').innerText = "Entre 3 y 50 caracteres"
                $('userName').classList.add('is-invalid')
                break;
            case !regExLetter.test($('userName').value.trim()):
                $('userName-errors').innerText = "Solo caracter alfabetico"
                $('userName').classList.add('is-invalid')
                break;


            default: $("userName").classList.remove("is-invalid")
                $("userName").classList.add("is-valid")
                $("userName-errors").innerText = null
                break;
        }
    })
    $("userName").addEventListener("change", () => {
        $("userName").classList.remove("is-invalid")
        $("userName-errors").innerText = null
        $("userName-msg").innerText = null
    })

    $('email').addEventListener('blur', async () => {

        switch (true) {
            case !regExEmail.test($('email').value):
                $('email-errors').innerText = "Tiene que ser un email válido"
                $('email').classList.add('is-invalid')
                break;
            case await emailVerify($('email').value):
                $('email-errors').innerText = "El email está registrado"
                $('email').classList.add('is-invalid')
                break;
            default:
                $('email-errors').innerText = null
                $('email').classList.remove('is-invalid')
                $('email').classList.add('is-valid')
                break;
        }
    })
    
    $('password').addEventListener('blur',() => {
        if(!regExPass.test($('password').value)){
            $('password-errors').innerText = "La contraseña debe tener una mayúscula, un número y entre 6 y 12 caracteres"
            $('password').classList.add('is-invalid')
        }else{
            $('password-errors').innerText = null
            $('password').classList.remove('is-invalid')
            $('password').classList.add('is-valid')
        }
    })
    $('password').addEventListener('focus',()=> {
        $('password').classList.remove('is-invalid')

    })
    
    $('password2').addEventListener('blur',() => {
        if($('password').value !== $('password2').value){
            $('password2-errors').innerText = "Las contraseñas no coinciden"
            $('password2').classList.add('is-invalid')
        }else if($('password').value == ""){
            $('password2-errors').innerText = "Debes ingresar una contraseña"
            $('password2').classList.add('is-invalid')
        }else{
            $('password2-errors').innerText = null
            $('password2').classList.remove('is-invalid')
            $('password2').classList.add('is-valid')
        }
    })
    $('password2').addEventListener('focus',()=> {
        $('password2').classList.remove('is-invalid')

    })

    $("form-register").addEventListener('submit', event => {
        event.preventDefault();
        let elementsForm = $('form-register').elements;
        let error = false;

        for (let i = 0; i < elementsForm.length - 3; i++) {
            
            if(!elementsForm[i].value){
                elementsForm[i].classList.add('is-invalid')
                $('error-empty').innerHTML = "Los campos señalados son obligatorios";
                $('password-errors').innerText = "La contraseña debe tener una mayúscula, un número y entre 6 y 12 caracteres"
                $('password').classList.add('is-invalid')
                $('password2-errors').innerText = "Debes ingresar una contraseña"
                $('password2').classList.add('is-invalid')
                $('email-errors').innerText = "Tiene que ser un email válido"
                $('email').classList.add('is-invalid')
                $("userName-errors").innerText = "El nombre es obligatorio"
                $("userName").classList.add("is-invalid")
                $("lastName-errors").innerText = "El apellido es obligatorio"
                $("lastName").classList.add("is-invalid")
                $("firstName-errors").innerText = "El nombre es obligatorio"
                $("firstName").classList.add("is-invalid")
                error = true
                console.log(elementsForm[i].value);
            }
        }
        for (let i = 0; i < elementsForm.length - 3; i++) {
            
            if(elementsForm[i].classList.contains('is-invalid')){
                error = true
                console.log('2'+elementsForm);
            }
        }

        if(!error){
            $('form-register').submit()
        }
})})