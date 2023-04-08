const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'login',
    {
        iniciarSesion:(datos) =>ipcRenderer.send('iniciar-sesion',datos),

        inicioError: (canal, callback) =>ipcRenderer.on('inicio-error',callback)
    }
)
