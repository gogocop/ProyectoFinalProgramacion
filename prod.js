let tabla = document.getElementById('tabla-productos')
let prod;

window.productos.recibirDatos('recibir-datos',function(event,datos){
    console.log(datos)
    prod = datos;
    for(let i = 0; i<datos.length;i++){
        let id_prod = datos[i]['id_prod']
        let nombre = datos[i]['nombre']
        let descripcion = datos[i]['descripcion']
        let categoria = datos[i]['categoria']
        let existencia = datos[i]['existencia']
        
        let boton = document.createElement('button')
        boton.setAttribute('value',id_prod)
        boton.innerText = 'Editar'
        boton.addEventListener('click', editarElemento)

        let boton2 = document.createElement('button')
        boton2.setAttribute('value',id_prod)
        boton2.innerText = 'Crear Pedido'
        boton2.addEventListener('click', ordenarElemento)

        let celdaID = document.createElement('td')
        celdaID.innerText = id_prod

        let celdaNombre = document.createElement('td')
        celdaNombre.innerText = nombre

        let celdaDescripcion= document.createElement('td')
        celdaDescripcion.innerText = descripcion
        
        let celdaCategoria = document.createElement('td')
        celdaCategoria.innerText = categoria

        let celdaExistencia = document.createElement('td')
        celdaExistencia.innerText = existencia

        let celdaBoton = document.createElement('td')
        celdaBoton.appendChild(boton)

        let celdaBoton2 = document.createElement('td')
        celdaBoton2.appendChild(boton2)

        let fila = document.createElement('tr')
        
        fila.appendChild(celdaID)
        fila.appendChild(celdaNombre)
        fila.appendChild(celdaDescripcion)
        fila.appendChild(celdaCategoria)
        fila.appendChild(celdaExistencia)
        fila.appendChild(celdaBoton)
        fila.appendChild(celdaBoton2)


        tabla.appendChild(fila)

    }
})

function editarElemento(event){
    console.log(event.target.value)
    window.productos.seleccionarElemento(prod[event.target.value - 1])
}

function ordenarElemento(event){
    console.log(event.target.value)
    window.productos.seleccionarElemento2(prod[event.target.value - 1])
}
