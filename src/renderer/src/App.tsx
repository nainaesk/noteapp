import './app.css'
import { Content, RootLayout, SideBar } from './components'
function App() {
  return (
    <>
      <RootLayout>
        <SideBar className="p-2">Sidebar</SideBar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">Content</Content>
      </RootLayout>
    </>
  )
}

export default App
