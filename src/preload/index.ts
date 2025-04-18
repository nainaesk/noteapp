import { GetNotes } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'



// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('context', {
      locale: navigator.language,
      getNotes: (...args: Parameters<GetNotes>) => {
        return ipcRenderer.invoke('getNotes', ...args)
      }
    })
  } catch (error) {
    console.error(error)
  }
} else {
  throw new Error('contextIsolation must be enabled in BrowserWindow')
}
