import { MDXEditorMethods } from '@mdxeditor/editor'
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store'
import { autoSavingTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkDownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const savedNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (selectedNote == null) return

      console.info('Auto saving note', selectedNote.title)

      await savedNote(content)
    },
    autoSavingTime,
    {
      leading: false,
      trailing: true
    }
  )

  return {
    editorRef,
    selectedNote,
    handleAutoSaving
  }
}
