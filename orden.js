let id_pedido = document.getElementById('id-pedido')
let nombre_prod = document.getElementById('nombre-prod')
let cantidad = document.getElementById('cantidad-producto')
let boton_ordenar = document.getElementById('boton-orden')
let lista_prov = document.getElementById('proveedores')

const select = document.getElementById('proveedores');

let fecha = new Date().toJSON().slice(0, 10);


let productos

window.ordenar.recibirDatos2('recibir-datos2', function(event,args){
    productos = args[0]

    let proveedores = args[1]
    proveedores.forEach(element => {
        console.log(element)
        let opcion = document.createElement('option')
        opcion.setAttribute('value',element['categoria'])
        opcion.text = element['nombreprov']
        lista_prov.add(opcion)
        if(productos['categoria'] == element['categoria']){
            lista_prov.value = element['categoria']
        }
    });


    id_pedido.value = productos['id_prod']
    nombre_prod.value = productos['nombre']

})



boton_ordenar.addEventListener('click', function(event){
    event.preventDefault()

    window.ordenar.guardarDatos2([productos['id_prod'],fecha,nombre_prod.value, select.options[select.selectedIndex].text ,cantidad.value])
    
})
