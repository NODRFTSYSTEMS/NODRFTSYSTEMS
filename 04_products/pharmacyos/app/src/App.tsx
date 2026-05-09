import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { CommandPalette } from '@/components/CommandPalette'
import { OnboardingOverlay } from '@/components/OnboardingOverlay'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <CommandPalette />
      <OnboardingOverlay />
    </>
  )
}

export default App
