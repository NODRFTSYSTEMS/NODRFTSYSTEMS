import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { CommandPalette } from '@/components/CommandPalette'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <CommandPalette />
    </>
  )
}

export default App
