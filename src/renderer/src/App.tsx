import {
  ActionButtonsRow,
  Content,
  DraggableTopBar,
  NotePreviewList,
  RootLayout,
  SideBar
} from '@/components'
import './app.css'
import { MarkdowEditor } from './components/MarkdowEditor'

const App = () => {
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <SideBar className="p-2">
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" />
        </SideBar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">
          <MarkdowEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
