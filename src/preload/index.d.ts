import { CreateNote, GetNotes, ReadNote, WriteNote } from "@shared/types"

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string,
      getNotes: GetNotes,
      readNotes: ReadNote,
      writeNote: WriteNote,
      createNote: CreateNote
    }
  }
}
