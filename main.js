
const { app, BrowserWindow, ipcRenderer } = require('electron')
const { ipcMain } = require('electron')
const path = require('path')
const mysql = require('mysql2');
const bcrypt = require('bcrypt')


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '123',
    database: 'supermercado'
  })

let loginVentana
function createLogin(){
    loginVentana = new BrowserWindow({
        width : 500,
        height : 390,
        webPreferences: ({
            preload:path.join(app.getAppPath(),'login_preload.js'),
        })

    })
    loginVentana.loadFile('login.html')
}
app.whenReady().then(createLogin)

ipcMain.on('iniciar-sesion',function(event,args){

    console.log(args)
    connection.promise()
            .execute(`SELECT * FROM usuarios WHERE identificacion = '${args[0]}'`)
    .then(([results, fields])=>{
        console.log(results)
        console.log(fields)
        if(results.length == 1){
          return bcrypt.compare(args[1], results[0]['pass'])
        }
    })
    .then((result)=>{
        console.log(result)
        if(result){
            createList()
            loginVentana.close()
        }else{
            loginVentana.webContents.send('inicio-error','Error en la Autenticacion. Intente nuevamente.'  )
        }
    })
   

})

let listaVentana
function createList(){
    listaVentana = new BrowserWindow({
        width : 1200,
        height : 600,
        webPreferences: ({
            preload:path.join(app.getAppPath(),'prod_preload.js'),
        })

    })
    listaVentana.loadFile('prod.html')

    connection.promise()
            .execute(`SELECT * FROM productos`)
    .then(([results, fields])=>{
        console.log(results)
        console.log(fields)
        listaVentana.webContents.on('did-finish-load',()=>{
            listaVentana.webContents.send('recibir-datos',
            results)
        })    
    })
    
}

ipcMain.on('seleccionar-elemento',function(event,args){
    console.log(args)
    connection.promise()
            .execute(`SELECT * FROM productos WHERE categoria = '${args['categoria']}'`)
    .then(([results, fields])=>{
        console.log(results)
        console.log(fields)
        createEdit([args,results])

    })
})


let editarVentana
function createEdit(datos){
    editarVentana = new BrowserWindow({
        width : 600,
        height : 900,
        webPreferences: ({
            preload:path.join(app.getAppPath(),'edit_preload.js'),
        }),
        parent: listaVentana
    })
    editarVentana.loadFile('edit.html')
    editarVentana.webContents.on('did-finish-load',()=>{
        editarVentana.webContents.send('recibir-datos',
        datos)
    })
}



ipcMain.on('guardar-datos',function(event,args){
    console.log(args)
    connection.promise()
            .execute(`UPDATE productos SET nombre = '${args[1]}',descripcion = '${args[2]}', 
            categoria = '${args[3]}', existencia = '${args[4]}' WHERE id_prod = ${args[0]}`)
    .then(([results, fields])=>{
        console.log(results)
        console.log(fields)
  
    })
})

ipcMain.on('seleccionar-elemento2',function(event,args){
    console.log(args)
    connection.promise()
            .execute(`SELECT * FROM proveedores WHERE categoria = '${args['categoria']}'`)
    .then(([results, fields])=>{
        console.log(results)
        console.log(fields)
        createOrder([args,results])
  
    })
})


let ordenarVentana
function createOrder(datos){
    ordenarVentana = new BrowserWindow({
        width : 600,
        height : 900,
        webPreferences: ({
            preload:path.join(app.getAppPath(),'orden_preload.js'),
        }),
        parent: listaVentana
    })
    ordenarVentana.loadFile('orden.html')
    ordenarVentana.webContents.on('did-finish-load',()=>{
        ordenarVentana.webContents.send('recibir-datos2',
        datos)
    })
}

ipcMain.on('guardar-datos2',function(event,args){
    console.log(args)
    connection.promise()
            .execute(`INSERT INTO pedidos SET id_prod = '${args[0]}', fecha = '${args[1]}', nombreprod = '${args[2]}', proveedor = '${args[3]}', 
           cantidad = ${args[4]}`)
    .then(([results2, fields2])=>{
        console.log(results2)
        console.log(fields2)
    })
})