const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'productos',
    {
        seleccionarElemento:(datos) =>ipcRenderer.send('seleccionar-elemento',datos),

        seleccionarElemento2:(datos) =>ipcRenderer.send('seleccionar-elemento2',datos),

        recibirDatos: (canal, callback) =>ipcRenderer.on('recibir-datos',callback)
    }
)
