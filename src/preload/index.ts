import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'



// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('context', {
      locale: navigator.language,
      getNotes: (...args: Parameters<GetNotes>) => (ipcRenderer.invoke('getNotes', ...args)),
      readNotes: (...args: Parameters<ReadNote>) => (ipcRenderer.invoke('readNote', ...args)),
      writeNote: (...args: Parameters<WriteNote>) => (ipcRenderer.invoke('writeNote', ...args)),
      createNote: (...args: Parameters<CreateNote>) => (ipcRenderer.invoke('createNote', ...args)),
      deleteNote: (...args: Parameters<DeleteNote>) => (ipcRenderer.invoke('deleteNote', ...args)),
    })
  } catch (error) {
    console.error(error)
  }
} else {
  throw new Error('contextIsolation must be enabled in BrowserWindow')
}
