import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@renderer/store'
import { useAtom } from 'jotai'
import { LuSignature } from 'react-icons/lu'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const [_, createEmptyNote] = useAtom(createEmptyNoteAtom)

  const handleCreation = async () => {
    await createEmptyNote()
  }
  return (
    <ActionButton onClick={handleCreation} {...props}>
      <LuSignature className="w-4 h-4 text-zinc-300"></LuSignature>
    </ActionButton>
  )
}
