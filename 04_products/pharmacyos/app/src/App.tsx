import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { OnboardingOverlay } from '@/components/OnboardingOverlay'
import { useThemeStore, initTheme } from '@/stores/theme'

// Apply persisted theme before first React paint to prevent flash
initTheme()

function App() {
  const theme = useThemeStore((s) => s.theme)

  // Keep html class in sync with store in case it changes at runtime
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <>
      <RouterProvider router={router} />
      <OnboardingOverlay />
    </>
  )
}

export default App
