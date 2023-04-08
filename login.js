let nombre = document.getElementById('nombre')
let pass = document.getElementById('pass')
let inicio_boton = document.getElementById('inicio_boton')
let error_div = document.getElementById('error')

var expMay = RegExp("[A-Z]")
var expMin = RegExp("[a-z]")
var expNum = RegExp("[0-9]")
var expEma = RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")

inicio_boton.addEventListener('click',function(event){
    event.preventDefault();

    var error = ""

    if(!pass.value.match(expMay)){
        error += "Password: Debe contener una mayuscula. "
    }if(!pass.value.match(expMin)){
        error += "Password: Debe contener una minuscula. "
    }if(!pass.value.match(expNum)){
        error += "Password: Debe contener un numero. "
    }if(!nombre.value.match(expNum)){
        error += "Usuario debe contener solo numeros. "

}
if(error == ""){
    window.login.iniciarSesion([
        nombre.value,
        pass.value])
    }else{
        document.getElementById('nombre').disabled = false;
        document.getElementById('pass').disabled = false;
        alert(error)

    }   
})

