let nombre_producto = document.getElementById('nombre-producto')
let id_producto = document.getElementById('id-producto')
let descripcion_producto = document.getElementById('descripcion-producto')
let categoria_producto = document.getElementById('categoria-producto')
let existencia_producto = document.getElementById('existencia-producto')
let lista_prov = document.getElementById('proveedores')
let boton_editar = document.getElementById('boton-editar')
let boton_borrar = document.getElementById('boton-borrar')

let productos

window.edicion.recibirDatos('recibir-datos', function(event,args){
    productos = args[0]
    id_producto.value = productos['id_prod']
    nombre_producto.value = productos['nombre']
    descripcion_producto.value = productos['descripcion']  
    categoria_producto.value = productos['categoria']   
    existencia_producto.value = productos['existencia']    
})



boton_editar.addEventListener('click', function(event){
    event.preventDefault()

    window.edicion.guardarDatos([productos['id_prod'],nombre_producto.value,descripcion_producto.value,categoria_producto.value, existencia_producto.value])
})

boton_borrar.addEventListener('click', function(event){
    event.preventDefault()
    nombre_producto.value = productos['nombre']
    descripcion_producto.value = productos['descripcion']  
    categoria_producto.value = productos['categoria']   
    existencia_producto.value = productos['existencia']    

})