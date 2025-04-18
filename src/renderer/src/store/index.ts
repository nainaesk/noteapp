import { NoteContent, NoteInfo } from "@shared/models";
import { atom } from "jotai";
import { unwrap } from "jotai/utils";

const loadNotes = async () => {
    const notes = await window.context.getNotes();

    return notes.sort((a, b) => b.lastEditTime - a.lastEditTime);
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes());

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null);

export const selectedNoteAtomAsync = atom(async (get) => {
    const notes = get(notesAtom)
    const selectedNoteIndex = get(selectedNoteIndexAtom)

    if (selectedNoteIndex == null || !notes) return null

    const selectedNote = notes[selectedNoteIndex]

    const noteContent = await window.context.readNotes(selectedNote.title);

    return {
        ...selectedNote,
        content: noteContent
    }
})

export const selectedNoteAtom = unwrap(
    selectedNoteAtomAsync,
    (prev) =>
        prev ?? {
            title: '',
            content: '',
            lastEditTime: Date.now()
        })

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
    const notes = get(notesAtom);
    const selectedNote = get(selectedNoteAtom)
    if (selectedNote == null || !notes) return

    // save on disk
    try {
        await window.context.writeNote(selectedNote.title, newContent);
    }
    catch (error) {
        console.error('Error saving note:', error)
    }


    // Update the saved notes last edit time
    set(
        notesAtom,
        notes.map((note) => {
            if (note.title === selectedNote.title) {
                return {
                    ...note,
                    lastEditTime: Date.now()
                }
            }
            return note
        })
    )
})

export const createEmptyNoteAtom = atom(null, async (get, set) => {
    const notes = get(notesAtom)

    if (!notes) return

    const title = await window.context.createNote();

    if (!title) return

    const newNote: NoteInfo = {
        title,
        lastEditTime: Date.now()
    }

    set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

    set(selectedNoteIndexAtom, 0)
})

export const deleteNoteAtom = atom(null, async (get, set) => {
    const notes = get(notesAtom)
    const selectedNote = get(selectedNoteAtom)

    if (!selectedNote || !notes) return

    // await deletion and get the updated notes?
    const isDeleted = await window.context.deleteNote(selectedNote.title);

    console.log('isDeleted', isDeleted)

    if (!isDeleted) return

    const updatedNotes = notes.filter((note) => note.title !== selectedNote.title);
    set(notesAtom, updatedNotes);

    set(selectedNoteIndexAtom, null);

})