import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@renderer/store'
import { useAtom } from 'jotai'
import { FaCirclePlus } from 'react-icons/fa6'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const [_, createEmptyNote] = useAtom(createEmptyNoteAtom)

  const handleCreation = async () => {
    await createEmptyNote()
  }
  return (
    <ActionButton onClick={handleCreation} {...props}>
      <FaCirclePlus className="w-5 h-5 text-zinc-300" />
    </ActionButton>
  )
}
