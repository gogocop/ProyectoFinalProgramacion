const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'ordenar',
    {
        guardarDatos2:(datos) =>ipcRenderer.send('guardar-datos2',datos),

        recibirDatos2: (canal, callback) =>ipcRenderer.on('recibir-datos2',callback)
    }
)
