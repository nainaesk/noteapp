import { ComponentProps } from 'react'
import { DeleteNoteButton } from './DeleteNoteButton'
import { NewNoteButton } from './NewNoteButton'

export const ActionButtonsRow = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
