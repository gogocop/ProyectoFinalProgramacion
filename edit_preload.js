const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'edicion',
    {
        guardarDatos:(datos) =>ipcRenderer.send('guardar-datos',datos),

        recibirDatos: (canal, callback) =>ipcRenderer.on('recibir-datos',callback)
    }
)
